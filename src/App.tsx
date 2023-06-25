import React from 'react';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        {/* protected routes */}
        <Route path='home' element={<div>Home</div>} />

        {/* catch all */}
        <Route path='*' element={<div>Missing</div>} />
      </Route>
    </Routes>
  );
}

export default App;
