import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { LoginScreen } from "../auth/LoginScreen";
import { CalendarScreen } from "../calendar/CalendarScreen";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/" component={CalendarScreen} />
        </Switch>
      </div>
    </Router>
  );
};
