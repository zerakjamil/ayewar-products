import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ProductDetailView from "@/components/ProductDetailView";
import type { Metadata, ResolvingMetadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  const inherited = await parent;
  const title = `${product.translations.en.name} — Ayewar`;
  const description = product.translations.en.description;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "Ayewar", images: inherited.openGraph?.images },
    twitter: { title, description, card: "summary_large_image", images: inherited.twitter?.images },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const productIndex = products.findIndex((p) => p.slug === slug);
  if (productIndex === -1) notFound();

  const product = products[productIndex];
  const prevProduct = products[(productIndex - 1 + products.length) % products.length];
  const nextProduct = products[(productIndex + 1) % products.length];

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
      <ProductDetailView product={product} prevProduct={prevProduct} nextProduct={nextProduct} />
      <CTASection />
      </main>
      <Footer />
    </>
  );
}
