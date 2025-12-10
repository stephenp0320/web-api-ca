import { useContext } from "react"; 
import { Navigate, Outlet, useLocation } from "react-router";
import { MoviesContext } from './contexts/moviesContext'

const ProtectedRoutes = () => {

  const context = useContext(MoviesContext);
  const location = useLocation();

  return context.isAuthenticated === true ? (
    <Outlet /> 
  ) : (
    <Navigate to='/login' replace state={{ from: location }}/>
  );
};

export default ProtectedRoutes;
