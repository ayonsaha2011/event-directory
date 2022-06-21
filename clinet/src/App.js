import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddEvent from "./components/AddEvent";
import AddCategory from "./components/AddCategory";
import Event from "./components/Event";
import EventsList from "./components/EventsList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/events" className="navbar-brand">
        Events Directory
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to={"/events"} className="nav-link" activeClassName="active">
              Events
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/add"} className="nav-link"  activeClassName="active">
              Add
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/add-category"} className="nav-link"  activeClassName="active">
              AddCategory
            </NavLink>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/events"]} component={EventsList} />
          <Route exact path="/add" component={AddEvent} />
          <Route exact path="/add-category" component={AddCategory} />
          <Route path="/events/:id" component={Event} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
