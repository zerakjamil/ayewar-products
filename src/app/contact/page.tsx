"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/context";

export default function ContactPage() {
  const { t, locale } = useLanguage();
  const [prepared, setPrepared] = useState(false);
  const labels = {
    ckb: { action: "ئیمەیڵ ئامادە بکە", prepared: "نامەکەت لە ئەپی ئیمەیڵەکەت تەواو بکە و بینێرە.", messageRequired: "تکایە نامەیەک بنووسە.", direct: "info@ayewar.com" },
    ar: { action: "تحضير البريد", prepared: "أكمل إرسال الرسالة من تطبيق البريد لديك.", messageRequired: "يرجى كتابة رسالة.", direct: "info@ayewar.com" },
    en: { action: "Prepare email", prepared: "Finish and send your message in your email app.", messageRequired: "Enter a message.", direct: "info@ayewar.com" },
  }[locale];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = new FormData(e.currentTarget);
    const formData = Object.fromEntries(["reason", "name", "email", "phone", "message"].map((key) => [key, String(fields.get(key) ?? "").trim()]));
    const message = e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement;
    if (!formData.message) {
      message.setCustomValidity(labels.messageRequired);
      message.reportValidity();
      return;
    }
    const subject = encodeURIComponent(`Ayewar: ${t.contact.reasons[formData.reason as keyof typeof t.contact.reasons]}`);
    const body = encodeURIComponent(`${formData.message.trim()}\n\n${formData.name.trim()}\n${formData.email.trim()}${formData.phone.trim() ? `\n${formData.phone.trim()}` : ""}`);
    window.location.href = `mailto:info@ayewar.com?subject=${subject}&body=${body}`;
    setPrepared(true);
  };

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>

      <section className="py-12 sm:py-20">
        <div className="site-container max-w-3xl">
          <AnimatedSection>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="text-center mb-8 sm:mb-10">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 sm:mt-3 text-[var(--color-text)] leading-tight px-2">
                  {t.nav.contact}
                </h1>
              </div>

              <form action="mailto:info@ayewar.com" method="post" encType="text/plain" onSubmit={handleSubmit} onInput={() => setPrepared(false)} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="contact-reason" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      {t.contact.reason}
                    </label>
                    <select
                      id="contact-reason"
                      required
                      name="reason"
                      defaultValue=""
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-sm text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors touch-manipulation"
                    >
                      <option value="">{t.contact.selectReason}</option>
                      <option value="project">{t.contact.reasons.project}</option>
                      <option value="support">{t.contact.reasons.support}</option>
                      <option value="partnership">{t.contact.reasons.partnership}</option>
                      <option value="other">{t.contact.reasons.other}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      {t.contact.name}
                    </label>
                    <input
                      id="contact-name"
                      required
                      autoComplete="name"
                      pattern={".*\\S.*"}
                      maxLength={120}
                      type="text"
                      name="name"
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors touch-manipulation"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      {t.contact.email}
                    </label>
                    <input
                      id="contact-email"
                      required
                      autoComplete="email"
                      maxLength={254}
                      dir="ltr"
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors touch-manipulation"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      {t.contact.phone}
                    </label>
                    <input
                      id="contact-phone"
                      autoComplete="tel"
                      maxLength={40}
                      dir="ltr"
                      type="tel"
                      name="phone"
                      placeholder="+964 XXX XXX XXXX"
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors touch-manipulation"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    maxLength={3000}
                    onInput={(event) => event.currentTarget.setCustomValidity("")}
                    name="message"
                    rows={6}
                    className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none touch-manipulation"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <a href="mailto:info@ayewar.com" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]" dir="ltr">{labels.direct}</a>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[var(--color-accent)] text-[var(--color-bg)] px-8 py-4 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity touch-manipulation"
                  >
                    {labels.action}
                  </button>
                </div>
                {prepared && <p role="status" className="text-sm text-[var(--color-accent)]">{labels.prepared}</p>}
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
