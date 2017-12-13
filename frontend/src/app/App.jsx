/*
* @author  Hamid belahrach
*/

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Board from "../components/Board";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/board/:boardId" component={Board} />
        </Switch>
      </div>
    );
  }
}

export default App;
