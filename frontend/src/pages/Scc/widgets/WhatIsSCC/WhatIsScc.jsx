import React from "react";
import { PageHeroSection } from "@/components";

function WhatIsScc() {
  return (
    <PageHeroSection
      eyebrow="JKUAT · CATCOM"
      title="Small Christian Communities"
      subtitle="SCCs are the basic units of the Church — small groups of Catholic students who meet regularly to pray together, read and reflect on Scripture, share their lives, and support one another in living the faith on campus. They are the heartbeat of CATCOM at JKUAT."
      imageSrc="/others/unityCircle.png"
      imageAlt="Small Christian Community"
      accent="#003366"
      pills={["Prayer", "Scripture", "Community", "Growth"]}
    />
  );
}

export default WhatIsScc;
