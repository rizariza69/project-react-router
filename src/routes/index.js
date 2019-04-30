import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "../App";
import { WrappedNormalLoginForm } from "../components/Login";
import { WrappedRegistrationForm } from "../components/Register";

export const AppRouter = () => {
  return (
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/login" component={WrappedNormalLoginForm} />
      <Route path="/register" component={WrappedRegistrationForm} />
    </Router>
  );
};
