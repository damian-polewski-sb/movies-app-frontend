import { Routes, Route } from "react-router-dom";

import { LoginPage } from "pages/login/login";
import { RegisterPage } from "pages/register/register";
import Home from "pages/home/Home";
import Browse from "pages/browse/Browse";
import Profile from "pages/profile/Profile";

import { Layout } from "components/router/layout";
import { RequireAuth } from "components/router/require-auth";
import { PersistLogin } from "components/router/persist-login";

export const App = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<Layout />}>
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="home" element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="profile/:id" element={<Profile />} />

            {/* catch all */}
            <Route path="*" element={<div>Missing</div>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
