import React from "react";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import {
  communities,
  patrons,
  priests,
  catcomExecutive,
} from "./../../DataFiles/data";

// Import all the About Us sections
import { HeroSection } from '../../components/AboutWidgets/AboutHero/AboutHero';
import { HeritageSection } from '../../components/AboutWidgets/AboutHeritage/AboutHeritage';
import { MissionVisionSection } from '../../components/AboutWidgets/AboutMissionVision/AboutMissionVision';
import { SccSection } from '../../components/AboutWidgets/AboutScc/AboutScc';
import { PriestsSection } from '../../components/AboutWidgets/AboutPriests/AboutPriests';
import { PatronsSection } from '../../components/AboutWidgets/AboutPatrons/AboutPatrons';
import { ExecutivesSection } from '../../components/AboutWidgets/AboutExecutives/AboutExecutives';

const AboutPage = () => {
  return (
    <main>
      <Header />
      <HeroSection />
      <HeritageSection />
      <MissionVisionSection />
      <SccSection communities={communities} />
      <PriestsSection priests={priests} />
      <PatronsSection patrons={patrons} />
      <ExecutivesSection executives={catcomExecutive} />
      <Footer />
    </main>
  );
};

export default AboutPage;
