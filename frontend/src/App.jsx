import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Liturgy from "./pages/Liturgy/Liturgy";
import About from "./pages/About/About";
import { SCCs } from "./DataFiles/scc";
import SccInfo from "./pages/Scc/SccInfo/SccInfo";
import Groups from "./pages/Groups/Groups";
import Scc from "./pages/Scc/Scc";
import NotFound from "./pages/NotFound/NotFound";
import AdminPanel from "@/pages/AdminPanel";
import Login from "@/pages/Auth/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
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

        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? <AdminPanel /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
