import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MainPage from "./pages/MainPage";
import { createGlobalStyle } from "styled-components";
import SignInPage from "./pages/Login_Register/SignInPage";
import SignUpPage from "./pages/Login_Register/SignUpPage";
import Layout from "./components/Layout";

const GlobalStyle = createGlobalStyle`
  ${(props) =>
    props.useFont &&
    `
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
      <GlobalStyle useFont={true} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/Login"
            element={
              <Layout>
                <SignInPage />
              </Layout>
            }
          />
          <Route path="/Register" element={
              <Layout>
                <SignUpPage />
              </Layout>
            } />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
