import { Hero } from "@/src/components/landing-page/ui/Hero";
import { CategorySection } from "../../components/landing-page/ui/CategorySection";
import { CommunitySpotlight } from "../../components/landing-page/ui/CommunitySpotlight";
import { Footer } from "../../components/landing-page/ui/Footer";
import { RecentListings } from "../../components/landing-page/ui/RecentListings";
import { TrustSection } from "../../components/landing-page/ui/TrustSection";

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
