import Hero from "@/components/Hero";
import WhatDoWeDoSection from "@/components/WhatDoWeDoSection";
import FellowshipSection from "@/components/FellowshipSection";
import WhereWeGoSection from "@/components/WhereWeGoSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <FellowshipSection />
      <WhatDoWeDoSection />
      <WhereWeGoSection />
      <Footer />
    </main>
  );
}
