import React, { useEffect, useState } from "react";
import { initializeLogger } from "common/logger";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "components/Dashboard";
import CreateTask from "components/Tasks/CreateTask";
import ShowTask from "components/Tasks/ShowTask";
import EditTask from "components/Tasks/EditTask";
import PageLoader from "components/PageLoader";
// import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/tasks/:slug/edit" component={EditTask} />
        <Route exact path="/tasks/:slug/show" component={ShowTask} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default App;
