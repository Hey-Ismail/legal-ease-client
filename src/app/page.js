import Banner from "@/components/Banner";
import Hero from "@/components/Hero";
import LegalCategories from "@/components/LegalCategories";
import TopLawyerExperts from "@/components/TopLawyerExperts";
// import TopLawyerExpertsFixed from "@/components/TopLawyerExpertsFixed";

export default function Home() {
  return (
    <div>
      <Banner />
      <Hero />
      {/* <TopLawyerExpertsFixed /> */}
      <TopLawyerExperts />
      <LegalCategories />
    </div>
  );
}
