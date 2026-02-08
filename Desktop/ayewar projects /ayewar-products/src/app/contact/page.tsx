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

      <section className="pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12 lg:p-16">
              <div className="text-center mb-10">
                <span className="text-[var(--color-accent)] text-sm font-medium">
                  پەیوەندیمان پێوە بکە
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-3 text-[var(--color-text)]">
                  پرۆژەیەکت هەیە، پشتگیری پێویستە، یان دەتەوێت زیاتر بزانیت؟ ئێمە لێرەین بۆ یارمەتیدان.
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      هۆکاری پەیوەندی
                    </label>
                    <select
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none"
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
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
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
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
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
                      className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
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
                    className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
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
