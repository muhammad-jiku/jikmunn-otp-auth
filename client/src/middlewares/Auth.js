//  external import
import { Navigate } from 'react-router-dom';
//  internal import
import { useAuthStore } from '../store/store';

export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to={'/'} replace={true} />;
  }

  return children;
};

export const ProtectRoute = ({ children }) => {
  const username = useAuthStore.getState().auth.username;
  if (!username) {
    return <Navigate to={'/'} replace={true} />;
  }
  return children;
};
