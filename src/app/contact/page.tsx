"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    reason: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="text-center mb-8 sm:mb-10">
                <span className="text-[var(--color-accent)] text-xs sm:text-sm font-medium">
                  پەیوەندیمان پێوە بکە
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 sm:mt-3 text-[var(--color-text)] leading-tight px-2">
                  پرۆژەیەکت هەیە، پشتگیری پێویستە، یان دەتەوێت زیاتر بزانیت؟ ئێمە لێرەین بۆ یارمەتیدانت.
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      هۆکاری پەیوەندی
                    </label>
                    <select
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-sm text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none touch-manipulation"
                    >
                      <option value="">جۆری هەڵبژێرە</option>
                      <option value="project">پرۆژەی نوێ</option>
                      <option value="support">پشتگیری</option>
                      <option value="partnership">هاوکاری</option>
                      <option value="other">هی تر</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      ناوی تەواو
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="ناوت لێرە بنووسە"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors touch-manipulation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      ناونیشانی ئیمەیڵ
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors touch-manipulation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      ژمارەی تەلەفۆن
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+964 XXX XXX XXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors touch-manipulation"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                    نامە
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="نامە"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none touch-manipulation"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[var(--color-accent)] text-white px-8 py-3.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity touch-manipulation"
                  >
                    داواکاری بنێرە
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
