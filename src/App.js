import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import SignInSignUp from "./pages/SignInSignUp";
import MainPage from "./pages/MainPage";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${props => props.useFont && `
    @import url('./fonts.css');
    
    body {
      font-family: 'MADE Tommy Soft', sans-serif;
    }
  `}
  
  body {
    margin: 0;
    padding: 0;
    background: #F2F2F2 0% 0% no-repeat padding-box;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle useFont={true}/>
      <Router>
        <Routes>
          <Route path="/" element={<SignInSignUp />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
