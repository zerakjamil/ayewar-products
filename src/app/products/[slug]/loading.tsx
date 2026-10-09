export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-24 overflow-hidden pointer-events-none select-none">
      {/* Top Navbar Skeleton */}
      <div className="h-16 sm:h-20 border-b border-[var(--color-border)]/50 px-4 sm:px-8 flex items-center justify-between max-w-7xl mx-auto">
        <div className="w-28 h-8 rounded-xl skeleton-shimmer" />
        <div className="w-28 h-8 rounded-full skeleton-shimmer" />
      </div>

      {/* Breadcrumb skeleton */}
      <div className="pt-24 sm:pt-28 pb-4 max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2">
        <div className="w-16 h-4 rounded skeleton-shimmer" />
        <div className="w-4 h-4 rounded skeleton-shimmer" />
        <div className="w-20 h-4 rounded skeleton-shimmer" />
        <div className="w-4 h-4 rounded skeleton-shimmer" />
        <div className="w-24 h-4 rounded skeleton-shimmer" />
      </div>

      {/* Header section skeleton */}
      <section className="py-8 sm:py-12 border-b border-[var(--color-border)] max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl skeleton-shimmer flex-shrink-0" />
          <div className="space-y-2.5">
            <div className="flex gap-2">
              <div className="w-24 h-5 rounded-full skeleton-shimmer" />
              <div className="w-28 h-5 rounded-full skeleton-shimmer" />
            </div>
            <div className="w-64 h-8 rounded-xl skeleton-shimmer" />
            <div className="w-40 h-4 rounded skeleton-shimmer" />
          </div>
        </div>
        <div className="space-y-2 max-w-3xl">
          <div className="h-4 rounded skeleton-shimmer w-full" />
          <div className="h-4 rounded skeleton-shimmer w-5/6" />
        </div>
      </section>

      {/* Phone Showcase section skeleton */}
      <section className="py-16 sm:py-24 border-b border-[var(--color-border)] flex flex-col items-center">
        <div className="w-32 h-6 rounded-full skeleton-shimmer mb-3" />
        <div className="w-48 h-8 rounded-xl skeleton-shimmer mb-8" />

        {/* Centered phone mockup skeleton */}
        <div className="relative h-[440px] w-[215px] sm:h-[500px] sm:w-[245px] rounded-[52px] border-[12px] border-[#141822] bg-[#141822] shadow-2xl overflow-hidden p-2 flex flex-col justify-between">
          <div className="w-20 h-4 bg-black rounded-full mx-auto" />
          <div className="w-full h-full rounded-[40px] skeleton-shimmer my-2" />
          <div className="w-24 h-1 bg-white/20 rounded-full mx-auto" />
        </div>
      </section>
    </div>
  );
}
