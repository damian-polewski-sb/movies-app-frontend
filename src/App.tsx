import { Routes, Route } from "react-router-dom";

import { LoginPage } from "pages/login/login";
import { RegisterPage } from "pages/register/register";
import { ProfilePage } from "pages/profile/profile";
import Home from "pages/home/Home";
import Browse from "pages/browse/Browse";

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
            <Route path="profile/:userId" element={<ProfilePage />} />

            {/* catch all */}
            <Route path="*" element={<div>Missing</div>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
