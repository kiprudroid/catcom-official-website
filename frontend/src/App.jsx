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
import { SuperAdminLogin } from "@/pages/AdminPanel/pages";
import { AttendanceLogin } from "@/pages/AttendanceAdmin/pages";

import {
  Home,
  Liturgy,
  About,
  Groups,
  Scc,
  NotFound,
  AdminPanel,
  AttendanceAdmin,
} from "@/pages";

import {
  EventsSection,
  LeadersSection,
  Members,
  Reports,
} from "@/pages/AdminPanel/pages";

const isAdminLoggedIn = () => !!localStorage.getItem("token");
const isAttendanceLoggedIn = () => !!localStorage.getItem("attendance_token");

const ProtectedAdmin = ({ children }) =>
  isAdminLoggedIn() ? children : <Navigate to="/login" replace />;

const ProtectedAttendance = ({ children }) =>
  isAttendanceLoggedIn() ? (
    children
  ) : (
    <Navigate to="/attendance-login" replace />
  );

const router = createBrowserRouter(
  createRoutesFromElements(
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
              path={scc.path}
            />
          }
        />
      ))}

      {/* ── Login pages ──────────────────────────────────── */}
      <Route path="/login" element={<SuperAdminLogin />} />

      {/* Group picker — landing directly on this page */}
      <Route path="/attendance-login" element={<AttendanceLogin />} />

      {/* Same component, groupId param pre-selects the group and skips the picker */}
      <Route path="/attendance-login/:groupId" element={<AttendanceLogin />} />

      {/* ── Main admin panel (protected) ─────────────────── */}
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminPanel />
          </ProtectedAdmin>
        }
      >
        <Route path="members" element={<Members />} />
        <Route path="reports" element={<Reports />} />
        <Route path="leaders" element={<LeadersSection />} />
        <Route path="events" element={<EventsSection />} />
      </Route>

      {/* ── Attendance admin (protected, separate token) ──── */}
      <Route
        path="/attendance-admin"
        element={
          <ProtectedAttendance>
            <AttendanceAdmin />
          </ProtectedAttendance>
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
