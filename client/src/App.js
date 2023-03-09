import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Password from './components/Profile/Password';
import Profile from './components/Profile/Profile';
import Recovery from './components/Profile/Recovery';
import Reset from './components/Profile/Reset';
import Username from './components/Profile/Username';
import NotFound from './components/Shared/NotFound';
import { AuthorizeUser, ProtectRoute } from './middlewares/Auth';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <ProtectRoute>
          <Route path="/password" element={<Password />} />
        </ProtectRoute>
        <AuthorizeUser>
          <Route path="/profile" element={<Profile />} />
        </AuthorizeUser>
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
