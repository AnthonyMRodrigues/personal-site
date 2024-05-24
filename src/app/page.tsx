import React from "react";

import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import HeroSection from "@/app/components/hero-section/herosection";
import Skills from "@/app/components/skills/skills";
import MiniAbout from "@/app/components/mini-about/mini-about";

export default function Home() {
  return (
    <>
        <Header />
        <HeroSection />
        <MiniAbout />
        {/*<Skills />*/}
        <Footer />
    </>
  );
}
