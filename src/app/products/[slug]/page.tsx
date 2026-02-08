import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, CheckCircle, Search, Code, Star, Zap } from "lucide-react";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import PhoneCarousel from "@/components/PhoneCarousel";

const featureIcons = [CheckCircle, Search, Star, Zap];
const serviceIcons = [Search, Code, Code, CheckCircle];

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.nameKu} | ئەیوار`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <Link href="/" className="hover:text-[var(--color-text)] transition-colors">
            بەرهەمەکان
          </Link>
          <ChevronLeft size={14} />
          <span className="text-[var(--color-text)]">{product.nameKu}</span>
        </div>
      </div>

      {/* Project Summary */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="text-[var(--color-accent)] text-sm font-medium">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6 text-[var(--color-text)]">
              {product.nameKu}
            </h1>
            <p className="text-[var(--color-text-muted)] text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-justify">
              {product.fullDescription}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-[var(--color-accent)] text-sm font-medium">
              تایبەتمەندیەکان
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-3 text-[var(--color-text)]">
              تایبەتمەندیە ساناکار و بەهێزەکان
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {product.features.slice(0, 3).map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 text-center h-full">
                    <div className="w-14 h-14 rounded-full border border-[var(--color-border)] flex items-center justify-center mx-auto mb-5">
                      <Icon size={24} className="text-[var(--color-text-muted)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed text-justify">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {product.features[3] && (
            <AnimatedSection delay={0.3} className="mt-5">
              <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 text-center max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full border border-[var(--color-border)] flex items-center justify-center mx-auto mb-5">
                  <Zap size={24} className="text-[var(--color-text-muted)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                  {product.features[3].title}
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed text-justify">
                  {product.features[3].description}
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Technology Used */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
              تەکنەلۆجیای بەکارهاتوو
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {product.technologies.map((tech) => (
                <span key={tech} className="text-xl md:text-2xl font-bold text-[var(--color-text)] opacity-70">
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Provided */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
              خزمەتگوزاری دابینکراو
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {product.services.slice(0, 3).map((service, i) => {
              const Icon = serviceIcons[i];
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 text-center">
                    <div className="w-14 h-14 rounded-full border border-[var(--color-border)] flex items-center justify-center mx-auto mb-5">
                      <Icon size={24} className="text-[var(--color-text-muted)]" />
                    </div>
                    <h3 className="text-base font-semibold text-[var(--color-text)]">
                      {service}
                    </h3>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {product.services[3] && (
            <AnimatedSection delay={0.3} className="mt-5">
              <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-8 text-center max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full border border-[var(--color-border)] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={24} className="text-[var(--color-text-muted)]" />
                </div>
                <h3 className="text-base font-semibold text-[var(--color-text)]">
                  {product.services[3]}
                </h3>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* App Screens mockup section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-[var(--color-accent)] text-sm font-medium">
              ڕوونمای ئەپلیکەیشن
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 text-[var(--color-text)] text-justify max-w-3xl mx-auto">
              نموونەی ڕووکارەکانی ئەپلیکەیشن کە لەلایەن تیمەکەمانەوە گەشەی پێدراوە
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            {product.mockups.length > 0 ? (
              <PhoneCarousel mockups={product.mockups} />
            ) : (
              <div className="flex items-center justify-center h-64">
                <Image
                  src={product.icon}
                  alt={product.nameKu}
                  width={80}
                  height={80}
                  className="rounded-2xl opacity-30"
                />
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
