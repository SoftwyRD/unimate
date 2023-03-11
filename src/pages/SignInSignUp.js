import React, { useState } from "react";
import SignInPage from "./Login_Register/SignInPage";
import SignUpPage from "./Login_Register/SignUpPage";
import { ReactComponent as MySVG } from "../assets/logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, ButtonGroup } from "@material-ui/core";
import { motion } from "framer-motion";
import fonts from "../../src/fonts/fonts.css";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  svg: {
    width: "250px",
    height: "200px",
    margin: "2rem",
  },
  button: {
    textTransform: "uppercase",
    padding: "0.5rem 1.5rem",
    fontFamily: "'MADE Tommy Soft', sans-serif",
    font: 'normal normal normal 20px MADE Tommy Soft',
    letterSpacing: "0.35px",
    color: "black",
    border: "none",
  },
  selected: {
    boxShadow: "0 2px 0 0 #304ffe",
  },
  buttonContainer: {
    textAlign: "center",
    
  },
}));

const lineVariants = {
  hidden: {
    width: 0,
    x: "50%",
    y: "100%",
  },
  visible: {
    width: "100%",
    x: 0,
    y: "100%",
  },
};

const SignInSignUp = () => {
  const classes = useStyles();
  const [activePage, setActivePage] = useState("SignIn");

  const handlePageChange = (event, newActivePage) => {
    setActivePage(newActivePage);
  };

  return (
    <Container className={classes.container}>
      <MySVG className={classes.svg} />
      <ButtonGroup
        className={classes.buttonContainer}
        disableElevation
        component={motion.div}
        initial={{ opacity: 1, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          className={`${classes.button} ${
            activePage === "SignIn" && classes.selected
          }`}
          onClick={(e) => handlePageChange(e, "SignIn")}
          
        >
          <motion.span
            className={classes.line}
            variants={lineVariants}
            initial="hidden"
            style={{ fontFamily: "MADE Tommy Soft', sans-serif" }}
            animate={activePage === "SignIn" ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
          />
          Login
        </Button>
        <Button
          className={`${classes.button} ${
            activePage === "SignUp" && classes.selected
          }`}
          onClick={(e) => handlePageChange(e, "SignUp")}
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          <motion.span
            className={classes.line}
            variants={lineVariants}
            initial="hidden"
            animate={activePage === "SignUp" ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
          />
          Register
        </Button>
      </ButtonGroup>
      <motion.div
        key={activePage}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
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
