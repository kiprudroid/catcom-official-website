import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Liturgy from "./pages/Liturgy/Liturgy";
import Community from "./pages/Community/Community";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Join from "./pages/Join-scc/Join";
import Media from "./pages/Media/Media";
import { SCCs } from "./DataFiles/data";
import SccInfo from "./pages/SccInfo/SccInfo";
import Groups from "./pages/Groups/Groups";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/liturgy" element={<Liturgy />} />
        <Route path="/community" element={<Community />} />
        <Route path="/about" element={<About />} />
        <Route path="/media" element={<Media />} />
        <Route path="/join-scc" element={<Join />} />
        <Route path="/media" element={<Media />} />
        <Route path="/groups" element={<Groups />} />
        {SCCs.map((scc) => (
          <Route
            key={scc.name}
            path={scc.path}
            element={
              <SccInfo
                name={scc.name}
                about={scc.about}
                activities={scc.activities}
                sccPhotos={scc.sccPhotos}
                aboutPatronSaint={scc.aboutPatronSaint}
                prayer={scc.prayer}
                image={scc.image}
              />
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
