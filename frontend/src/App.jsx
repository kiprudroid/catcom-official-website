import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Liturgy from "./pages/Liturgy/Liturgy";
import About from "./pages/About/About";
import { SCCs } from "./DataFiles/data";
import SccInfo from "./pages/SccInfo/SccInfo";
import Groups from "./pages/Groups/Groups";
<<<<<<< HEAD
import PersistentPlayer from "./components/PersistentPlayer/PersistentPlayer";
=======
import Scc from "./pages/Scc/Scc";
>>>>>>> fcf430de1c8025c2a6af483570138e4ea2f4b474

function App() {
  return (
    <>
      {/* <PersistentPlayer /> */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/liturgy" element={<Liturgy />} />
        <Route path="/scc" element={<Scc />} />
        <Route path="/about" element={<About />} />
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
