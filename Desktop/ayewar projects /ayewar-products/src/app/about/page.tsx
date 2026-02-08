import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
  title: "دەربارە | ئایەوار",
  description: "دەربارەی ئایەوار - تیمێکی داهێنەر و پێشکەوتوو لە کوردستان",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="text-[var(--color-accent)] text-sm font-medium">
              دەربارەمان
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6 text-[var(--color-text)]">
              لە ئایەواردا باوەڕمان بە ئەوەیە کە گەیشتن بە تەواوی توانای داهێنەرانەت پێویستی بە کاری سەخت، دڵسۆزی، و داهێنان هەیە.
            </h1>
            <p className="text-[var(--color-text-muted)] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              ئایەوار کۆمەڵەیەکی تەکنەلۆجییە کە لە کوردستان کاردەکات و
              تایبەتمەندە لە دروستکردنی ئەپلیکەیشنی مۆبایل و وێب. ئێمە
              باوەڕمان بە دروستکردنی بەرهەمانەیە کە کاریگەریی ڕاستەقینەیان
              لەسەر ژیانی ڕۆژانەی خەڵکی هەبێت.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
