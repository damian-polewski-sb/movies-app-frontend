import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/authContext';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Browse from './pages/browse/Browse';
import Profile from './pages/profile/Profile';

import Layout from './components/Layout/Layout';


function App() {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }: any) => {
    if(!currentUser) {
      return <Navigate to='/login' />
    }

    return children
}


  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path='home' element={<Home />} />
        <Route path='browse' element={<Browse />} />
        <Route path='profile/:id' element={<Profile />} />

        {/* catch all */}
        <Route path='*' element={<div>Missing</div>} />
      </Route>
    </Routes>
  );
}

export default App;
