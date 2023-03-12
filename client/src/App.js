import React from 'react';
//  external imports
import { Route, Routes } from 'react-router-dom';
//  internal imports
import Reset from './components/Profile/Reset';
import Profile from './components/Profile/Profile';
import Register from './components/Auth/Register';
import Recovery from './components/Profile/Recovery';
import Password from './components/Profile/Password';
import Username from './components/Profile/Username';
import NotFound from './components/Shared/NotFound';
import { AuthorizeUser, ProtectRoute } from './middlewares/Auth';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />{' '}
        <Route
          path="/password"
          element={
            <ProtectRoute>
              <Password />
            </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthorizeUser>
              <Profile />
            </AuthorizeUser>
          }
        />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
