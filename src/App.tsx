import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "pages/login/login";
import { RegisterPage } from "pages/register/register";
import { HomePage } from "pages/home/home";
import { ProfilePage } from "pages/profile/profile";
import { MediaPage } from "pages/browse/media";
import { SettingsPage } from "pages/settings/settings";
import { SearchPage } from "pages/browse/search";

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
        <Route index element={<Navigate to="home" replace />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="home" element={<HomePage />} />
            <Route path="profile/:userId" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />

            {/* movies routes */}
            <Route path="movies">
              <Route index element={<Navigate to="search" replace />} />

              <Route path="search" element={<SearchPage />} />
              <Route path="trending" element={<></>} />
              <Route path=":id" element={<MediaPage />} />
            </Route>

            {/* shows routes */}
            <Route path="shows">
              <Route index element={<Navigate to="search" replace />} />

              <Route path="search" element={<SearchPage />} />
              <Route path="trending" element={<></>} />
              <Route path=":id" element={<MediaPage />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<div>Missing</div>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
