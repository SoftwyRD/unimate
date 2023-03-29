import React, { useEffect } from "react";
import { ReactComponent as MySVG } from "../assets/logo.svg";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const Button = styled.button`
  text-transform: uppercase;
  padding: 0.5rem 1.5rem;
  font-family: "MADE Tommy Soft", sans-serif;
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 0.35px;
  color: black;
  border: none;
  background-color: transparent;
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background: #304ffe;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }
  &.active {
    &:after {
      transform: translateX(0);
    }
  }
  &.selected {
    box-shadow: 0 2px 0 0 #304ffe;
  }
`;

const ContainerWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
`;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = React.useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/Login":
        setActiveButton(0);
        break;
      case "/Register":
        setActiveButton(1);
        break;
      default:
        setActiveButton(0);
    }
  }, [location]);

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  return (
    <ContainerWrapper>
      <MySVG width="250px" height="200px" />
      <ButtonGroup
        as={motion.div}
        initial={{ opacity: 1, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          className={activeButton === 0 ? "active" : ""}
          onClick={() => {
            navigate("/Login");
            handleButtonClick(0);
          }}
        >
          Login
        </Button>
        <Button
          className={activeButton === 1 ? "active selected" : ""}
          onClick={() => {
            navigate("/Register");
            handleButtonClick(1);
          }}
        >
          Register
        </Button>
      </ButtonGroup>
      {children}
    </ContainerWrapper>
  );
};

export default Layout;
