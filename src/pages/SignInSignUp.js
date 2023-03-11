import React, { useState } from "react";
import SignInPage from "./Login_Register/SignInPage";
import SignUpPage from "./Login_Register/SignUpPage";
import styled from "styled-components";
import { ReactComponent as MySVG } from "../assets/logo.svg";
import { motion } from "framer-motion";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const Button = styled.button`
  text-transform: uppercase;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  background-color: transparent;
  border: none;
  box-shadow: 0 0 0 0 gray;
  transition: all 0.5s ease-in-out;
  ${(props) => props.selected && `box-shadow: 0 2px 0 0 #304ffe;`};
`;

const SignInSignUp = () => {
  const [activePage, setActivePage] = useState("SignIn");

  const handlePageChange = (event) => {
    setActivePage(event.target.value);
  };

  return (
    <Container>
      <MySVG
        style={{
          width: "250px",
          height: "200px",
          margin: "2rem",
        }}
      />
      <div style={{ textAlign: "center" }}>
        <Button
          selected={activePage === "SignIn"}
          value="SignIn"
          onClick={handlePageChange}
        >
          Login
        </Button>
        <Button
          selected={activePage === "SignUp"}
          value="SignUp"
          onClick={handlePageChange}
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          Register
        </Button>
      </div>
      <motion.div
        key={activePage}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5}}
      >
        {activePage === "SignIn" ? (
          <SignInPage />
        ) : (
          <SignUpPage changePage={setActivePage} />
        )}
      </motion.div>
    </Container>
  );
};

export default SignInSignUp;
