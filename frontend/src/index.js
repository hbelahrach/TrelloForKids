/*
* @author  Hamid belahrach
*/

import "./assets/stylesheets/fontawesome-all.css";
import "./assets/stylesheets/paper.min.css";
import "./assets/stylesheets/styles.scss";

import React from "react"; // import the main react dependency
import ReactDOM from "react-dom"; // import reactDOM
import { Router, browserHistory } from "react-router-dom";
import App from "./app/App"; // import the main app component
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import setStore from "./store/setStore";

const store = setStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
); // render our App component and mount it to our #root element
