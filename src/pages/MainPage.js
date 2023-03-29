import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Pagina Principal</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={() => navigate('/Testing')}>Testing</button>
     
    </div>
  );
};

export default MainPage;
