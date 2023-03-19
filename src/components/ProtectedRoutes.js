import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated as validateAuthenticated } from "../utils/auth";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

function Protected({ children }) {
  const [authStatus, setAuthStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await validateAuthenticated(
        accessToken,
        refreshToken
      );
      setAuthStatus(isAuthenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

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
    return <Navigate to="/Login" />;
  }

  return children;
}

export default Protected;
