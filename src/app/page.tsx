import { CategorySection } from "../components/landing-page/ui/CategorySection";
import { CommunitySpotlight } from "../components/landing-page/ui/CommunitySpotlight";
import { Footer } from "../components/landing-page/ui/Footer";
import { Header } from "../components/landing-page/ui/Header";
import { Hero } from "../components/landing-page/ui/Hero";
import { RecentListings } from "../components/landing-page/ui/RecentListings";
import { TrustSection } from "../components/landing-page/ui/TrustSection";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CategorySection />
      <CommunitySpotlight />
      <RecentListings />
      <TrustSection />
      <Footer />
    </>
  );
}
