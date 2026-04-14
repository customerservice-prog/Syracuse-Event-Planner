/**
 * Crawlable intro copy for local + service intent (keep readable; avoid keyword stuffing).
 */
export default function SeoIntro() {
  return (
    <section
      className="relative border-y border-white/5 bg-navy-900/40"
      aria-label="About Syracuse Event Planner"
    >
      <div className="container-max px-4 md:px-8 lg:px-16 py-14 max-w-3xl mx-auto text-center">
        <p className="text-white/55 text-base md:text-lg leading-relaxed">
          Planning a wedding, corporate summit, or gala in Syracuse? We are a full-service event
          planning team based in Onondaga County, working across Central New York — from downtown
          venues and the Oncenter to lake-country celebrations. Expect vendor coordination, permit
          support, insurance certificates for venues, and pricing that reflects real Syracuse-area
          costs.
        </p>
      </div>
    </section>
  );
}
