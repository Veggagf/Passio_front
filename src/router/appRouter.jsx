import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/auth/loginPage.jsx";
import RegisterPage from "../pages/auth/registerPage.jsx";
import EventsListPage from "../pages/events/eventsListPage.jsx";
import EventsDashboardPage from "../pages/events/eventsDashboardPage.jsx";
import UserManagementPage from "../pages/admin/userManagementPage.jsx";

import { routes } from "./routes.js";
import EventsDashboardPageStaff from "../pages/events/eventsDahboardPageStaff.jsx";
import EventsDashboardPageOrganizer from "../pages/events/eventsDashboardPageOrganizer.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.eventslistpage} element={<EventsListPage />} />
        <Route
          path={routes.eventsdashboardpage}
          element={<EventsDashboardPage />}
        />
        <Route
          path={routes.usermanagementpage}
          element={<UserManagementPage />}
        />
        <Route
          path={routes.eventsdashboardpagestaff}
          element={<EventsDashboardPageStaff />}
        />
        <Route
          path={routes.eventsdashboardpageorganizer}
          element={<EventsDashboardPageOrganizer />}
        />
      </Routes>
    </BrowserRouter>
  );
}
