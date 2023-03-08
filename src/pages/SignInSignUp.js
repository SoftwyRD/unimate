import React, { useState } from "react";
import SignInPage from "./Login_Register/SignInPage";
import SignUpPage from "./Login_Register/SignUpPage";
import "../../src/styles/SignInSignUp.css"; // importa el archivo CSS

const SignInSignUp = () => {
  const [activePage, setActivePage] = useState("SignIn");

  const togglePage = () => {
    setActivePage(activePage === "SignIn" ? "SignUp" : "SignIn");
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <button onClick={togglePage}>
              {activePage === "SignIn" ? "Sign Up" : "Sign In"}
            </button>
          </li>
        </ul>
      </nav>

      {activePage === "SignIn" ? <SignInPage /> : <SignUpPage />}
    </div>
  );
};

export default SignInSignUp;
