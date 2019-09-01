import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./menu";
import Users from "./users";
import Publications from "./Publications";
import Tasks from "./Tasks";
import NewTask from "./Tasks/NewTask";

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margin">
      <Route exact path="/" component={Users} />
      <Route exact path="/tasks" component={Tasks} />
      <Route exact path="/tasks/new" component={NewTask} />
      <Route
        exact
        path="/tasks/new/:currentUserId/:currentTaskId"
        component={NewTask}
      />
      <Route exact path="/publications/:key" component={Publications} />
    </div>
  </BrowserRouter>
);

export default App;
