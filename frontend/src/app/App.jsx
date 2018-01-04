/*
* @author  Hamid belahrach
*/

import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Login from "../components/Login";
import Board from "../components/Board";
import PrivateRoute from "../wrappers/PrivateRoute";
import { connect } from "react-redux";
import { restoreSession } from "../actions/session";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    this.props.restoreSession();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/:boardId" component={Board} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    restoreSession: data => dispatch(restoreSession())
  };
};

export default connect(null, mapDispatchToProps)(App);
