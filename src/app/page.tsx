import { CategorySection } from "../components/landing-page/ui/category-section";
import { CommunitySpotlight } from "../components/landing-page/ui/community-spotlight";
import { Footer } from "../components/landing-page/ui/footer";
import { Header } from "../components/landing-page/ui/header";
import { Hero } from "../components/landing-page/ui/hero";
import { PrayerFlags } from "../components/landing-page/ui/prayer-flags";
import { RecentListings } from "../components/landing-page/ui/recent-listings";
import { TrustSection } from "../components/landing-page/ui/trust-section";

export default function Home() {
  return (
    <>
      <Header />

      {/* <PrayerFlags /> */}

      <main>
        <Hero />

        {/* <CategorySection />

        <CommunitySpotlight />

        <RecentListings /> */}
      </main>

      {/* <PrayerFlags />

      <TrustSection />

      <Footer /> */}
    </>
  );
}
