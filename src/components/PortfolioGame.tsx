"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Volume2, VolumeX, X } from "lucide-react";
import { products, getProductContent } from "@/data/products";
import { useLanguage } from "@/i18n/context";
import { discoveries as locations } from "@/game/district.mjs";
import { createDistrict, type Action, type Controls } from "@/game/DistrictEngine";

const keyActions: Record<string, Action> = { ArrowUp: "up", KeyW: "up", ArrowDown: "down", KeyS: "down", ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right", Space: "brake" };
const emptyControls = (): Controls => ({ up: false, down: false, left: false, right: false, brake: false });
const labels = {
  en: { title: "The Ayewar district", subtitle: "A little world of ideas.", start: "Start driving", guide: "Drive to the glowing beacons to discover our apps.", controls: "WASD / Arrow keys · Space to brake", discovered: "Discovered", resume: "Keep driving", explore: "Explore this app", all: "You found them all.", restart: "Start over", up: "Move up", down: "Move down", left: "Move left", right: "Move right", brake: "Brake", sound: "Sound", close: "Close" },
  ar: { title: "حيّ Ayewar", subtitle: "عالم صغير من الأفكار.", start: "ابدأ القيادة", guide: "قد نحو العلامات المضيئة لاكتشاف تطبيقاتنا.", controls: "WASD / الأسهم · مسافة للفرملة", discovered: "اكتشفت", resume: "تابع القيادة", explore: "استكشف التطبيق", all: "اكتشفتها كلها.", restart: "ابدأ من جديد", up: "إلى الأعلى", down: "إلى الأسفل", left: "إلى اليسار", right: "إلى اليمين", brake: "فرامل", sound: "الصوت", close: "إغلاق" },
  ckb: { title: "گەڕەکی Ayewar", subtitle: "جیهانێکی بچووک پڕ لە بیرۆکە.", start: "دەست بە شۆفێری بکە", guide: "بەرەو نیشانە ڕووناکەکان بڕۆ بۆ دۆزینەوەی ئەپەکانمان.", controls: "WASD / تیرەکان · Space بۆ وەستان", discovered: "دۆزراوە", resume: "بەردەوام بە", explore: "ئەپەکە ببینە", all: "هەمووت دۆزییەوە!", restart: "لە نوێوە دەست پێ بکە", up: "بڕۆ بۆ سەرەوە", down: "بڕۆ بۆ خوارەوە", left: "بڕۆ بۆ چەپ", right: "بڕۆ بۆ ڕاست", brake: "وەستان", sound: "دەنگ", close: "داخستن" },
} as const;

function Town({ controls, paused, onFound }: { controls: React.RefObject<Controls>; paused: React.RefObject<boolean>; onFound: (slug: string) => void }) {
  const mount = useRef<HTMLDivElement>(null);
  const foundCallback = useRef(onFound);
  useEffect(() => { foundCallback.current = onFound; }, [onFound]);
  useEffect(() => {
    if (!mount.current) return;
    return createDistrict({ node: mount.current, controls, paused, onFound: (slug) => foundCallback.current(slug), icons: Object.fromEntries(products.map((product) => [product.slug, product.icon.src])) });
  }, [controls, paused]);
  return <div ref={mount} className="district-canvas" aria-hidden="true" />;
}

export default function PortfolioGame() {
  const { locale } = useLanguage(); const t = labels[locale];
  const controls = useRef<Controls>(emptyControls());
  const paused = useRef(true);
  const audio = useRef<AudioContext | null>(null); const [sound, setSound] = useState(false);
  useEffect(() => () => { audio.current?.close(); }, []);
  const [started, setStarted] = useState(false); const [active, setActive] = useState<string | null>(null); const [visited, setVisited] = useState<string[]>([]); const [run, setRun] = useState(0);
  const product = products.find((p) => p.slug === active);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (active) cardRef.current?.querySelector<HTMLButtonElement>("button")?.focus(); }, [active]);
  useEffect(() => {
    const down = (e: KeyboardEvent) => { const action = keyActions[e.code]; if (!action || !started || paused.current || (e.target instanceof HTMLElement && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName))) return; e.preventDefault(); controls.current[action] = true; };
    const up = (e: KeyboardEvent) => { const action = keyActions[e.code]; if (action) controls.current[action] = false; };
    const clear = () => { controls.current = emptyControls(); };
    window.addEventListener("keydown", down); window.addEventListener("keyup", up); window.addEventListener("blur", clear);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); window.removeEventListener("blur", clear); };
  }, [started]);
  function found(slug: string) { if (sound && audio.current) { const context = audio.current; const tone = context.createOscillator(); const gain = context.createGain(); tone.type = "sine"; tone.frequency.setValueAtTime(520, context.currentTime); tone.frequency.exponentialRampToValueAtTime(780, context.currentTime + 0.16); gain.gain.setValueAtTime(0.05, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.3); tone.connect(gain).connect(context.destination); tone.start(); tone.stop(context.currentTime + 0.3); } controls.current = emptyControls(); setVisited((v) => v.includes(slug) ? v : [...v, slug]); setActive(slug); }
  function resume() { setActive(null); paused.current = false; }
  function restart() { setVisited([]); setActive(null); setRun((n) => n + 1); paused.current = false; setStarted(true); }
  const touch = (action: Action, value: boolean) => { controls.current[action] = value; };
  return <section className="site-container district-page"><div className="district-shell">
    <Town key={run} controls={controls} paused={paused} onFound={found} />
    <div className="district-top"><Link href="/" className="district-exit" aria-label={t.close}><X size={18} strokeWidth={1.75} /></Link><div><span className="district-eyebrow">AYEWAR / PLAY</span><strong>{t.title}</strong></div><button className="district-sound" aria-pressed={sound} aria-label={t.sound} onClick={() => { if (!audio.current) audio.current = new AudioContext(); audio.current.resume(); setSound(!sound); }}>{sound ? <Volume2 size={18} strokeWidth={1.75} /> : <VolumeX size={18} strokeWidth={1.75} />}</button><span className="district-count" dir="ltr">{visited.length} / {locations.length}</span></div>
    {started && !active && <><div className="district-hint">{t.controls}</div><div className="district-controls" dir="ltr" role="group" aria-label={t.controls}>{(["left", "up", "brake", "down", "right"] as Action[]).map((action) => <button className={`district-control-${action}`} key={action} aria-label={t[action]} onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); touch(action, true); }} onPointerUp={() => touch(action, false)} onPointerCancel={() => touch(action, false)} onLostPointerCapture={() => touch(action, false)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); touch(action, true); } }} onKeyUp={(e) => { if (e.key === "Enter") touch(action, false); }} onBlur={() => touch(action, false)}>{({ left: "←", up: "↑", brake: "■", down: "↓", right: "→" } as const)[action]}</button>)}</div></>}
    {!started && <div className="district-overlay"><div className="district-card district-intro"><h1>{t.title}</h1><p>{t.guide}</p><button onClick={() => { setStarted(true); paused.current = false; }}>{t.start} ↗</button><small>{t.controls}</small></div></div>}
    {active && product && <div className="district-overlay"><div ref={cardRef} className="district-card" role="dialog" aria-modal="true" aria-labelledby="discovered-title" onKeyDown={(e) => { if (e.key === "Escape") { e.preventDefault(); resume(); } if (e.key === "Tab") { const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("a[href], button")); const index = items.indexOf(document.activeElement as HTMLElement); if (e.shiftKey && index === 0) { e.preventDefault(); items[items.length - 1]?.focus(); } else if (!e.shiftKey && index === items.length - 1) { e.preventDefault(); items[0]?.focus(); } } }}><span className="district-eyebrow">{t.discovered} · {visited.length} / {locations.length}</span><Image src={product.icon} alt="" width={56} height={56} className={`district-product-icon ${product.slug === "raiders" || product.slug === "passengers" ? "transit-icon" : ""}`} /><h2 id="discovered-title">{getProductContent(product, locale).name}</h2><p>{getProductContent(product, locale).description}</p><div className="district-actions"><Link href={`/products/${product.slug}`}>{t.explore} ↗</Link><button onClick={resume}>{visited.length === locations.length ? t.all : t.resume}</button></div>{visited.length === locations.length && <button className="district-restart" onClick={restart}>{t.restart}</button>}</div></div>}
  </div></section>;
}
