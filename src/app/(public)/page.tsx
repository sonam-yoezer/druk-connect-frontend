import { Hero } from "@/src/features/landing-page/ui/Hero";
import { CategorySection } from "../../features/landing-page/ui/CategorySection";
import { CommunitySpotlight } from "../../features/landing-page/ui/CommunitySpotlight";
import { Footer } from "../../features/landing-page/ui/Footer";
import { RecentListings } from "../../features/landing-page/ui/RecentListings";
import { TrustSection } from "../../features/landing-page/ui/TrustSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <CommunitySpotlight />
      <RecentListings />
      <TrustSection />
      <Footer />
    </>
  );
}
