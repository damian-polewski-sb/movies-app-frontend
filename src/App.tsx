import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "pages/login/login";
import { RegisterPage } from "pages/register/register";
import Home from "pages/home/Home";
import Browse from "pages/browse/Browse";
import Profile from "pages/profile/Profile";

import Layout from "components/Layout/Layout";

import { useAuth } from "hooks/use-auth";

function App() {
  const { auth } = useAuth();

  const ProtectedRoute = ({ children }: any) => {
    if (!auth) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="browse" element={<Browse />} />
        <Route path="profile/:id" element={<Profile />} />

        {/* catch all */}
        <Route path="*" element={<div>Missing</div>} />
      </Route>
    </Routes>
  );
}

export default App;
