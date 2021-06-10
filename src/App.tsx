import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Page } from "components/Page";
import { initDevices, updateDevices, updateExperiments } from "mock";
import Dashboard from "pages/Dashboard";
import ExperimentDetail from "pages/ExperimentDetail";
import ExperimentList from "pages/ExperimentList";
import { NewExperiment } from "pages/NewExperiment";

import { Container } from "@material-ui/core";

export const App = () => {
  useEffect(() => {
    initDevices();
    const handler = setInterval(async () => {
      await updateExperiments();
      await updateDevices();
    }, 500);
    return () => clearInterval(handler);
  });

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/experiments" exact>
          <ExperimentList />
        </Route>
        <Route path="/experiments/new" exact>
          <NewExperiment />
        </Route>
        <Route
          path="/experiments/:experiment_id"
          render={({ match }) => (
            <ExperimentDetail
              experiment_id={parseInt(match.params.experiment_id)}
            />
          )}
        />
        <Route path="*">
          <Page>
            <Container maxWidth="sm">404: Page not found.</Container>
          </Page>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
