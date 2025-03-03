import FeaturesSection from "@/components/Ui/Features";
import HeroSection from "@/components/Ui/Hero";
import SurvivalSection from "@/components/Ui/Modes";
import ServerStatusSection from "@/components/Ui/Serverinfo";
import VIPSection from "@/components/Ui/Team";

export default function Home() {
  return (
   <div>
   <HeroSection/>
   <SurvivalSection/>
   <ServerStatusSection/>
   <FeaturesSection/>
   <VIPSection/>
   </div>
  );
}
