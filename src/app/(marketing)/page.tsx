import { Cta } from "@/components/sections/cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Products } from "@/components/sections/products";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Products />
      <HowItWorks />
      <Pricing />
      <Cta />
    </>
  );
}
