import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated  } from "../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";


function ProtectedRoutes({ children }) {
  const { pathname } = useLocation();
  const [authStatus, setAuthStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken');
  const {refreshToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticatedResult = await isAuthenticated(accessToken, refreshToken, dispatch);

      setAuthStatus(isAuthenticatedResult);
      setIsLoading(false);
    };

    checkAuth();
  }, [accessToken, refreshToken, pathname, dispatch]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" size={80} />
      </div>
    );
  }

  if (!authStatus) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoutes;


