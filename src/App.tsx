import { Routes, Route } from "react-router-dom";

import { LoginPage } from "pages/login/login";
import { RegisterPage } from "pages/register/register";
import { ProfilePage } from "pages/profile/profile";
import { MoviePage } from "pages/content/movie";
import { ShowPage } from "pages/content/show";
import { SettingsPage } from "pages/settings/settings";
import { BrowsePage } from "pages/browse/browse";
import Home from "pages/home/Home";

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
            <Route path="browse" element={<BrowsePage />} />
            <Route path="profile/:userId" element={<ProfilePage />} />
            <Route path="movies/:movieId" element={<MoviePage />} />
            <Route path="shows/:showId" element={<ShowPage />} />
            <Route path="settings" element={<SettingsPage />} />

            {/* catch all */}
            <Route path="*" element={<div>Missing</div>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
