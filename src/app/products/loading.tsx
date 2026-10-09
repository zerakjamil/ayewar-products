export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-24 overflow-hidden pointer-events-none select-none">
      {/* Top Navbar Skeleton */}
      <div className="h-16 sm:h-20 border-b border-[var(--color-border)]/50 px-4 sm:px-8 flex items-center justify-between max-w-7xl mx-auto">
        <div className="w-28 h-8 rounded-xl skeleton-shimmer" />
        <div className="hidden md:flex items-center gap-3">
          <div className="w-20 h-7 rounded-full skeleton-shimmer" />
          <div className="w-24 h-7 rounded-full skeleton-shimmer" />
          <div className="w-20 h-7 rounded-full skeleton-shimmer" />
        </div>
        <div className="w-28 h-8 rounded-full skeleton-shimmer" />
      </div>

      {/* Hero Header Skeleton */}
      <section className="pt-24 pb-12 sm:pt-36 sm:pb-16 text-center max-w-4xl mx-auto px-4">
        <div className="w-36 h-7 rounded-full skeleton-shimmer mx-auto mb-4" />
        <div className="h-10 sm:h-12 w-2/3 max-w-xl rounded-2xl skeleton-shimmer mx-auto mb-4" />
        <div className="h-4 w-1/2 max-w-md rounded-md skeleton-shimmer mx-auto" />
      </section>

      {/* Products Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-md flex flex-col justify-between h-[420px]"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl skeleton-shimmer" />
                  <div className="w-24 h-5 rounded-full skeleton-shimmer" />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="w-24 h-3.5 rounded skeleton-shimmer" />
                  <div className="w-40 h-6 rounded-lg skeleton-shimmer" />
                  <div className="w-28 h-3.5 rounded skeleton-shimmer" />
                </div>
                <div className="space-y-2">
                  <div className="w-full h-3 rounded skeleton-shimmer" />
                  <div className="w-5/6 h-3 rounded skeleton-shimmer" />
                  <div className="w-3/4 h-3 rounded skeleton-shimmer" />
                </div>
              </div>

              {/* Preview image placeholder */}
              <div className="h-48 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] skeleton-shimmer" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
