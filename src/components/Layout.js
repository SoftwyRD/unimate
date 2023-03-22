import { ReactComponent as MySVG } from "../assets/logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { Container } from "@material-ui/core";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  svg: {
    width: "250px",
    height: "200px",
    margin: "2rem",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
  },
  button: {
    textTransform: "uppercase",
    padding: "0.5rem 1.5rem",
    fontFamily: "'MADE Tommy Soft', sans-serif",
    font: 'normal normal normal 20px MADE Tommy Soft',
    letterSpacing: "0.35px",
    color: "black",
    border: "none",
    backgroundColor: "transparent",
  },
  selected: {
    boxShadow: "0 2px 0 0 #304ffe",
    border: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  
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
          className={classes.button}
          onClick={() => navigate("/Login")}
        >
          Login
        </Button>
        <Button
          className={`${classes.button} ${classes.selected}`}
          onClick={() => navigate("/Register")}
        >
          Register
        </Button>
      </ButtonGroup>
      
      {children}
    </Container>
  );
};

export default Layout;
