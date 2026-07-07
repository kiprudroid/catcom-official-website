import React from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { SCCs } from "@/pages/Scc/data/scc";

// ── 1. Extract the Lazy Loading Functions outside the component ──
const loadHome = () => import("@/pages").then(m => ({ Component: m.Home }));
const loadAbout = () => import("@/pages").then(m => ({ Component: m.About }));
const loadGroups = () => import("@/pages").then(m => ({ Component: m.Groups }));
const loadScc = () => import("@/pages").then(m => ({ Component: m.Scc }));
const loadMedia = () => import("@/pages").then(m => ({ Component: m.MediaAnnouncements }));
const loadPrayers = () => import("@/pages").then(m => ({ Component: m.DailyReadingsAndPrayers }));
const loadNotFound = () => import("@/pages").then(m => ({ Component: m.NotFound }));

const loadSuperAdminLogin = () => import("@/pages/AdminPanel/pages").then(m => ({ Component: m.SuperAdminLogin }));
const loadAttendanceLogin = () => import("@/pages/AttendanceAdmin/pages").then(m => ({ Component: m.AttendanceLogin }));

const loadLeaders = () => import("@/pages/AdminPanel/pages").then(m => ({ Component: m.LeadersSection }));
const loadSccLeaders = () => import("@/pages/AdminPanel/pages").then(m => ({ Component: m.SccLeaders }));
const loadEvents = () => import("@/pages/AdminPanel/pages").then(m => ({ Component: m.EventsSection }));
const loadMembers = () => import("@/pages/AdminPanel/pages").then(m => ({ Component: m.Members }));
const loadJoinSccs = () => import("@/pages/AdminPanel/pages").then(m => ({ Component: m.JoinSccsSection }));
const loadReports = () => import("@/pages/AdminPanel/pages").then(m => ({ Component: m.Reports }));
const loadJoinGroup = () => import("@/pages/AdminPanel/pages").then(m => ({ Component: m.JoinGroup }));
const loadMediaSection = () => import("@/pages/AdminPanel/pages").then(m => ({ Component: m.MediaSection }));
const loadOtherTools = () => import("@/pages/AdminPanel/pages/OtherTools/OtherTools").then(m => ({ Component: m.default }));

// Layout wrappers
const loadAdminPanel = async () => {
  const m = await import("@/pages");
  return { Component: () => <ProtectedAdmin><m.AdminPanel /></ProtectedAdmin> };
};
const loadAttendanceAdmin = async () => {
  const m = await import("@/pages");
  return { Component: () => <ProtectedAttendance><m.AttendanceAdmin /></ProtectedAttendance> };
};


// Auth checks
const isAdminLoggedIn = () => !!localStorage.getItem("token");
const isAttendanceLoggedIn = () => !!localStorage.getItem("attendance_token");

const ProtectedAdmin = ({ children }) =>
  isAdminLoggedIn() ? children : <Navigate to="/login" replace />;

const ProtectedAttendance = ({ children }) =>
  isAttendanceLoggedIn() ? children : <Navigate to="/attendance-login" replace />;


// ── 2. Clean, highly-readable Router configuration ──
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Pages */}
      <Route path="/" lazy={loadHome} />
      <Route path="/prayers-readings" lazy={loadPrayers} />
      <Route path="/media" lazy={loadMedia} />
      <Route path="/about" lazy={loadAbout} />
      <Route path="/groups" lazy={loadGroups} />
      <Route path="/scc" lazy={loadScc} />

      {/* Dynamic Details with Inline Closures for Route contexts */}
      {SCCs.map((scc) => (
        <Route
          key={scc.name}
          path={scc.path}
          lazy={async () => {
            const m = await import("./pages/Scc/SccInfo/SccInfo");
            return {
              Component: (props) => <m.default {...props} {...scc} />
            };
          }}
        />
      ))}

      {/* Auth */}
      <Route path="/login" lazy={loadSuperAdminLogin} />
      <Route path="/attendance-login" lazy={loadAttendanceLogin} />
      <Route path="/attendance-login/:groupId" lazy={loadAttendanceLogin} />

      {/* Admin Protected Layout */}
      <Route path="/admin" lazy={loadAdminPanel}>
        <Route index element={<Navigate to="events" replace />} />
        <Route path="leaders" lazy={loadLeaders} />
        <Route path="scc-leaders" lazy={loadSccLeaders} />
        <Route path="events" lazy={loadEvents} />
        <Route path="members" lazy={loadMembers} />
        <Route path="join-sccs" lazy={loadJoinSccs} />
        <Route path="reports" lazy={loadReports} />
        <Route path="other-tools" lazy={loadOtherTools} />
        <Route path="join-group" lazy={loadJoinGroup} />
        <Route path="media" lazy={loadMediaSection} />
      </Route>

      {/* Attendance Protected Layout */}
      <Route path="/attendance-admin" lazy={loadAttendanceAdmin} />

      {/* 404 */}
      <Route path="*" lazy={loadNotFound} />
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;