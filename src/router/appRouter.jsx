import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/auth/loginPage.jsx";
import RegisterPage from "../pages/auth/registerPage.jsx";

import { routes } from "./routes.js";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
