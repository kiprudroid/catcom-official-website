import React, { useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { SCCs } from "@/pages/Scc/Datafiles/scc";
import SccInfo from "./pages/Scc/SccInfo/SccInfo";

import Login from "@/pages/AdminPanel/pages/Auth/Login";

import {
  Home,
  Liturgy,
  About,
  Groups,
  Scc,
  NotFound,
  AdminPanel,
} from "@/pages";
import { Members, Reports } from "@/pages/AdminPanel/pages";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
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
        >
          {/* <Route path="members" element={<Members />} />
          <Route path="reports" element={<Reports />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
