import React from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { SCCs } from "@/pages/Scc/data/scc";
import SccInfo from "./pages/Scc/SccInfo/SccInfo";
import Login from "@/pages/AdminPanel/pages/Auth/Login";
import { PastoralLogin } from "@/pages/PastoralAttendance/pages";

import {
  Home,
  Liturgy,
  About,
  Groups,
  Scc,
  NotFound,
  AdminPanel,
  PastoralAttendance,
} from "@/pages";

import {
  EventsSection,
  LeadersSection,
  Members,
  Reports,
  JoinSccsSection,
} from "@/pages/AdminPanel/pages";

// ── Check token in localStorage ───────────────────────────────────
const isLoggedIn = () => !!localStorage.getItem("token");

<<<<<<< HEAD
// ── Protected: redirects to fallback if not logged in ─────────────
const Protected = ({ children, fallback }) =>
  isLoggedIn() ? children : <Navigate to={fallback} replace />;

// ── Router created ONCE outside React — prevents infinite re-render
const router = createBrowserRouter(
  createRoutesFromElements(
=======
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
                leaders={scc.leaders}
                path={scc.path}
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
          // element={
          //   isAuthenticated ? <AdminPanel /> : <Navigate to="/login" replace />
          // }
          element={<AdminPanel />}
        >
          <Route path="members" element={<Members />} />
          <Route path="reports" element={<Reports />} />
          <Route path="leaders" element={<LeadersSection />} />
          <Route path="events" element={<EventsSection />} />
          <Route path="join-sccs" element={<JoinSccsSection />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
>>>>>>> b4764ad952f1064ff18c76ca33f17b4604db9b84
    <>
      {/* ── Public ───────────────────────────────────────── */}
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
              leaders={scc.leaders}
            />
          }
        />
      ))}

      {/* ── Login pages (public) ─────────────────────────── */}
      <Route path="/login" element={<Login />} />
      <Route path="/pastoral-login" element={<PastoralLogin />} />

      {/* ── Admin panel (protected) ──────────────────────── */}
      {/* <Route
        path="/admin"
        element={
          <Protected fallback="/login">
            <AdminPanel />
          </Protected>
        }
      > */}

      <Route path="/admin" element={<AdminPanel />}>
        <Route path="members" element={<Members />} />
        <Route path="reports" element={<Reports />} />
        <Route path="leaders" element={<LeadersSection />} />
        <Route path="events" element={<EventsSection />} />
      </Route>

      {/* ── Pastoral attendance (protected) ──────────────── */}
      <Route
        path="/attendance-admin"
        element={
          <Protected fallback="/pastoral-login">
            <PastoralAttendance />
          </Protected>
        }
      />

      <Route path="*" element={<NotFound />} />
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
