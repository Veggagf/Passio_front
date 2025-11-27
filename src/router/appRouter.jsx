import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/auth/loginPage.jsx";
import RegisterPage from "../pages/auth/registerPage.jsx";
import EventsListPage from "../pages/events/eventsListPage.jsx";
import EventsDashboardPage from "../pages/events/eventsDashboardPage.jsx";
import UserManagementPage from "../pages/admin/userManagementPage.jsx";
import RegisterUser from "../pages/auth/registerUser.jsx";
import Boletos from "../pages/events/boletos.jsx";
import EventslistUser from "../pages/events/eventsListUser.jsx";

import { routes } from "./routes.js";
import EventsDashboardPageStaff from "../pages/events/eventsDahboardPageStaff.jsx";
import EventsDashboardPageOrganizer from "../pages/events/eventsDashboardPageOrganizer.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import { ROLES } from "../utils/constants";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.eventslistpage} element={<EventsListPage />} />
        <Route path={routes.registerUser} element={<RegisterUser />} />
        <Route path={routes.boletos} element={<Boletos />} />
        <Route path={routes.eventslistpageuser} element={<EventslistUser />} />

        <Route
          path={routes.eventsdashboardpage}
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR, ROLES.ORGANIZADOR, ROLES.STAFF]}>
              <EventsDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.eventsdashboardpagestaff}
          element={
            <ProtectedRoute allowedRoles={[ROLES.STAFF]}>
              <EventsDashboardPageStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.usermanagementpage}
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMINISTRADOR]}>
              <UserManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.eventsdashboardpageorganizer}
          element={
            <ProtectedRoute allowedRoles={[ROLES.ORGANIZADOR]}>
              <EventsDashboardPageOrganizer />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}