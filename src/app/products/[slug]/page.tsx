import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ProductDetailView from "@/components/ProductDetailView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} | ئەیوار`,
    description: product.description,
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
    <main className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />
      <ProductDetailView product={product} prevProduct={prevProduct} nextProduct={nextProduct} />
      <CTASection />
      <Footer />
    </main>
  );
}
