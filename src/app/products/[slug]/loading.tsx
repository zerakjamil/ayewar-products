import { HeaderSkeleton } from "@/components/PortfolioSkeleton";

export default function ProductDetailLoading() {
  return (
    <div aria-hidden="true" className="min-h-screen bg-[var(--color-bg)]">
      <HeaderSkeleton />
      <div className="site-container detail-breadcrumb"><div className="h-5 w-1/2 rounded skeleton-shimmer" /></div>
      <section className="detail-intro">
        <div className="site-container">
          <div className="detail-title-row"><div className="detail-identity"><div className="w-16 h-16 shrink-0 rounded-2xl skeleton-shimmer" /><div className="h-12 w-2/3 rounded-lg skeleton-shimmer" /></div></div>
          <div className="space-y-3 max-w-prose">{[0, 1, 2, 3].map((line) => <div key={line} className={`h-5 rounded skeleton-shimmer ${line === 3 ? "w-4/5" : "w-full"}`} />)}</div>
        </div>
      </section>
      <section className="detail-section border-b border-[var(--color-border)]">
        <div className="site-container flex flex-col items-center gap-5">
          <div className="phone-frame-size phone-placeholder"><div className="w-full h-full rounded-[40px] skeleton-shimmer" /></div>
          <div className="w-64 max-w-full h-14 rounded-full skeleton-shimmer" />
          <div className="w-48 h-6 rounded skeleton-shimmer" />
        </div>
      </section>
    </div>
  );
}
