import React from "react";
import { ReactComponent as MySVG } from "../assets/logo.svg";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Container } from "@material-ui/core";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ButtonContainer = styled(ButtonGroup)({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
});

const ButtonStyled = styled(Button)(({ theme }) => ({
  textTransform: "uppercase",
  padding: "0.5rem 1.5rem",
  fontFamily: "'MADE Tommy Soft', sans-serif",
  font: "normal normal normal 20px MADE Tommy Soft",
  letterSpacing: "0.35px",
  color: "black",
  border: "none",
  backgroundColor: "transparent",
  position: "relative",
  overflow: "hidden",
  "&:after": {
    content: "''",
    position: "absolute",
    left: "0",
    bottom: "0",
    height: "2px",
    width: "100%",
    background: "#304ffe",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
  },
  "&.active": {
    "&:after": {
      transform: "translateX(0)",
    },
  },
  "&.selected": {
    boxShadow: "0 2px 0 0 #304ffe",
  },
}));

const ContainerStyled = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = React.useState(0);

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  return (
    <ContainerStyled>
      <MySVG width="250px" height="200px" margin="2rem" />
      <ButtonContainer
        disableElevation
        component={motion.div}
        initial={{ opacity: 1, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <ButtonStyled
          className={`${activeButton === 0 ? "active" : ""}`}
          onClick={() => {
            navigate("/Login");
            handleButtonClick(0);
          }}
        >
          Login
        </ButtonStyled>
        <ButtonStyled
          className={`${activeButton === 1 ? "active selected" : ""}`}
          onClick={() => {
            navigate("/Register");
            handleButtonClick(1);
          }}
        >
          Register
        </ButtonStyled>
      </ButtonContainer>

      {children}
    </ContainerStyled>
  );
};

export default Layout;