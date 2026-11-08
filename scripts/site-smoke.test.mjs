import assert from "node:assert/strict";
import { test } from "node:test";

const base = process.env.SITE_URL || "http://localhost:3000";

function metaContent(html, key) {
  for (const tag of html.matchAll(/<meta\b[^>]*>/g)) {
    const attrs = Object.fromEntries([...tag[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
    if (attrs.name === key || attrs.property === key) return attrs.content?.replaceAll("&amp;", "&");
  }
}

function assertLandmarks(html, route) {
  const header = html.indexOf("<header");
  const main = html.indexOf("<main");
  const mainEnd = html.indexOf("</main>");
  const footer = html.indexOf("<footer");
  assert.ok(header >= 0 && header < main && mainEnd > main && footer > mainEnd, `${route}: navigation and footer must sit outside the main content landmark`);
  assert.match(html.match(/<main\b[^>]*>/)?.[0] ?? "", /id="main-content"[^>]*tabindex="-1"/i, `${route}: skip-link destination must accept focus`);
}

test("the portfolio exposes eight distinct, reachable product pages before hydration", async () => {
  const response = await fetch(base);
  assert.equal(response.status, 200);
  const html = await response.text();
  const productPaths = [...new Set([...html.matchAll(/href="(\/products\/[^"?#]+)"/g)].map((match) => match[1]))];
  assert.equal(productPaths.length, 8);
  for (const path of productPaths) {
    const page = await fetch(new URL(path, base));
    assert.equal(page.status, 200, path);
    const content = await page.text();
    assertLandmarks(content, path);
    assert.match(content, /<h1[\s>]/, path);
    assert.match(content, /id="main-content"/, path);
  }
});

test("every local navigation destination resolves and unknown products return 404", async () => {
  for (const path of ["/", "/products", "/about", "/contact", "/play"]) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assertLandmarks(html, path);
    assert.doesNotMatch(html, /href="#"/);
    assert.match(html, /id="main-content"/);
  }
  const previousName = await fetch(new URL("/products/students", base), { redirect: "manual" });
  assert.equal(previousName.status, 308);
  assert.equal(previousName.headers.get("location"), "/products/passengers");
  assert.equal((await fetch(new URL("/products/not-a-real-product", base))).status, 404);
});

test("contact fields have associated labels and required email and message inputs", async () => {
  const html = await (await fetch(new URL("/contact", base))).text();
  for (const field of ["reason", "name", "email", "phone", "message"]) {
    assert.match(html, new RegExp(`for="contact-${field}"`));
    assert.match(html, new RegExp(`id="contact-${field}"`));
  }
  assert.match(html, /<input[^>]*id="contact-email"[^>]*required/);
  assert.match(html, /<textarea[^>]*id="contact-message"[^>]*required/);
  assert.match(html, /href="mailto:info@ayewar.com"/);
});

test("contact has a native email fallback and never defaults to submitting personal fields in the page URL", async () => {
  const html = await (await fetch(new URL("/contact", base))).text();
  const form = html.match(/<form\b[^>]*>/)?.[0];
  assert.ok(form, "contact form is present before hydration");
  assert.match(form, /method="post"/);
  assert.match(form, /action="mailto:info@ayewar.com"/);
  assert.match(form, /encType="text\/plain"/i);
});

test("home and product links expose branded, fetchable previews before hydration", async () => {
  for (const [route, title] of [["/", "Ayewar — Apps & Games"], ["/products/chessmancer", "Chessmancer — Ayewar"]]) {
    const html = await (await fetch(new URL(route, base))).text();
    assert.ok(html.includes(`<title>${title.replaceAll("&", "&amp;")}</title>`), route);
    assert.equal(metaContent(html, "og:title"), title, route);
    assert.equal(metaContent(html, "twitter:title"), title, route);
    assert.equal(metaContent(html, "twitter:card"), "summary_large_image");
    assert.equal(metaContent(html, "theme-color"), "#000000");
    for (const prefix of ["og", "twitter"]) {
      const image = metaContent(html, `${prefix}:image`);
      assert.ok(image, `${route}: ${prefix} image is required`);
      const url = new URL(image);
      const response = await fetch(new URL(url.pathname + url.search, base));
      assert.equal(response.status, 200, image);
      assert.match(response.headers.get("content-type") ?? "", /image\/png/);
      const png = Buffer.from(await response.arrayBuffer());
      assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
      assert.equal(png.readUInt32BE(16), 1200);
      assert.equal(png.readUInt32BE(20), 630);
      assert.equal(metaContent(html, `${prefix}:image:alt`)?.trim(), "Ayewar — Apps & Games");
    }
  }
  for (const path of ["/favicon.ico", "/icon.png", "/apple-icon.png"]) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /image\//, path);
    assert.ok((await response.arrayBuffer()).byteLength > 1000, path);
  }
});
