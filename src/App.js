import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="header">
            <NavLink
              exact
              activeClassName="active"
              to={{ pathname: "/", state: { user: "userdata" } }}
            >
              Home
            </NavLink>
            <NavLink activeClassName="active" to="/login">
              Login
            </NavLink>
            <NavLink activeClassName="active" to="/register">
              Register
            </NavLink>
          </div>
          <div className="container">
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
