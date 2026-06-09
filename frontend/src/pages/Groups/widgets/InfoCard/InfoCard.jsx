import React from "react";
import { PageHeroSection } from "@/components";

function InfoCard() {
  return (
    <PageHeroSection
      eyebrow="JKUAT · CATCOM"
      title="Groups in JKUAT CATCOM"
      subtitle="The CATCOM community is built on unity, service, and shared faith. Our various groups bring together students with different gifts, passions, and callings — all working together to strengthen our mission and deepen our fellowship. By joining a group, members find belonging, purpose, and a meaningful way to live out their discipleship at JKUAT."
      imageSrc="/others/Group.jpg"
      imageAlt="CATCOM Groups"
      pills={["Unity", "Service", "Shared faith", "Leadership"]}
    />
  );
}

export default InfoCard;
