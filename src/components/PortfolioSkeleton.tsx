export default function PortfolioSkeleton() {
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

      {/* Hero Skeleton */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 text-center max-w-4xl mx-auto px-4">
        {/* Logo box */}
        <div className="w-24 h-10 rounded-2xl skeleton-shimmer mx-auto mb-6" />

        {/* Title skeleton */}
        <div className="h-10 sm:h-14 w-3/4 max-w-2xl rounded-2xl skeleton-shimmer mx-auto mb-4" />
        <div className="h-6 sm:h-8 w-1/2 max-w-lg rounded-xl skeleton-shimmer mx-auto mb-8" />

        {/* Description lines */}
        <div className="space-y-2.5 max-w-2xl mx-auto mb-10">
          <div className="h-4 rounded-md skeleton-shimmer w-full" />
          <div className="h-4 rounded-md skeleton-shimmer w-5/6 mx-auto" />
          <div className="h-4 rounded-md skeleton-shimmer w-3/4 mx-auto" />
        </div>

        {/* Highlights ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] flex flex-col justify-between h-28"
            >
              <div className="w-8 h-8 rounded-lg skeleton-shimmer mb-3" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-3/4 rounded skeleton-shimmer" />
                <div className="h-2.5 w-1/2 rounded skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Pills Skeleton */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2.5 my-6">
        <div className="w-28 h-9 rounded-full skeleton-shimmer" />
        <div className="w-32 h-9 rounded-full skeleton-shimmer" />
        <div className="w-32 h-9 rounded-full skeleton-shimmer" />
        <div className="w-32 h-9 rounded-full skeleton-shimmer" />
      </div>

      {/* Product Cards Skeleton Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 mt-10">
        {[0, 1].map((cardIdx) => (
          <div
            key={cardIdx}
            className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl"
          >
            <div
              className={`flex flex-col ${
                cardIdx % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Content Column */}
              <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl skeleton-shimmer" />
                      <div className="w-24 h-6 rounded-full skeleton-shimmer" />
                    </div>
                    <div className="w-28 h-6 rounded-full skeleton-shimmer" />
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-2 mb-6">
                    <div className="h-8 w-2/3 rounded-xl skeleton-shimmer" />
                    <div className="h-4 w-1/3 rounded-md skeleton-shimmer" />
                    <div className="h-5 w-4/5 rounded-md skeleton-shimmer pt-1" />
                  </div>

                  {/* Description paragraphs */}
                  <div className="space-y-2.5 mb-8">
                    <div className="h-3.5 rounded skeleton-shimmer w-full" />
                    <div className="h-3.5 rounded skeleton-shimmer w-11/12" />
                    <div className="h-3.5 rounded skeleton-shimmer w-4/5" />
                  </div>
                </div>

                {/* Read more button */}
                <div className="w-36 h-11 rounded-full skeleton-shimmer" />
              </div>

              {/* Phone Mockup Column */}
              <div className="flex-1 py-10 px-4 sm:px-8 flex items-center justify-center bg-[var(--color-bg-secondary)]/50 border-t lg:border-t-0 border-[var(--color-border)]">
                <div className="relative h-[440px] w-[215px] sm:h-[480px] sm:w-[235px] rounded-[48px] border-[10px] border-[#141822] bg-[#141822] shadow-2xl overflow-hidden ring-1 ring-white/10 flex flex-col justify-between p-2">
                  {/* Dynamic Island */}
                  <div className="w-20 h-4 bg-black rounded-full mx-auto" />

                  {/* Screen Shimmer Body */}
                  <div className="w-full h-full rounded-[36px] skeleton-shimmer my-2" />

                  {/* Home Bar */}
                  <div className="w-24 h-1 bg-white/20 rounded-full mx-auto" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
