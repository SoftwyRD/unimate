import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import SignInSignUp from "./pages/SignInSignUp";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <Provider store={store}>
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