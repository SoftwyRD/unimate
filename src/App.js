import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import SignInSignUp from "./pages/SignInSignUp";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<SignInSignUp />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;