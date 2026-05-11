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
  SccLeaders,
  JoinGroup,
  JoinSccsSection,
  MediaSection,
} from "@/pages/AdminPanel/pages";

import OtherTools from "@/pages/AdminPanel/pages/OtherTools/OtherTools";

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

      <Route path="/login" element={<SuperAdminLogin />} />
      <Route path="/attendance-login" element={<AttendanceLogin />} />
      <Route path="/attendance-login/:groupId" element={<AttendanceLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminPanel />
          </ProtectedAdmin>
        }
      >
        <Route index element={<Navigate to="events" replace />} />
        <Route path="leaders" element={<LeadersSection />} />
        <Route path="scc-leaders" element={<SccLeaders />} />
        <Route path="events" element={<EventsSection />} />
        <Route path="members" element={<Members />} />
        <Route path="join-sccs" element={<JoinSccsSection />} />
        <Route path="reports" element={<Reports />} />
        <Route path="other-tools" element={<OtherTools />} />
        <Route path="join-group" element={<JoinGroup />} />
        <Route path="media" element={<MediaSection />} />
      </Route>

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
