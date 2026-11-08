export function HeaderSkeleton() {
  return (
    <div className="site-header">
      <div className="site-container header-inner">
        <div className="brand-logo rounded-lg skeleton-shimmer" />
        <div className="w-24 h-12 rounded-lg skeleton-shimmer" />
      </div>
    </div>
  );
}

export default function PortfolioSkeleton() {
  return (
    <div aria-hidden="true" className="min-h-screen bg-[var(--color-bg)]">
      <HeaderSkeleton />
      <div className="site-container portfolio-heading"><div className="portfolio-title-placeholder rounded-lg skeleton-shimmer" /></div>
      <div className="site-container">
        <div className="portfolio-toolbar">
          <div className="portfolio-filters">
            <div className="w-10 sm:w-16 h-11 rounded-lg skeleton-shimmer" />
            <div className="w-16 sm:w-24 h-11 rounded-lg skeleton-shimmer" />
            <div className="w-18 sm:w-28 h-11 rounded-lg skeleton-shimmer" />
            <div className="w-32 sm:w-40 h-11 rounded-lg skeleton-shimmer" />
          </div>
        </div>
        <div className="portfolio-grid">
          {[0, 1].map((index) => (
            <div key={index}>
              <div className="project-caption"><div className="w-10 h-10 shrink-0 rounded-xl skeleton-shimmer" /><div className="h-6 w-1/2 rounded-lg skeleton-shimmer" /></div>
              <div className="project-art skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
