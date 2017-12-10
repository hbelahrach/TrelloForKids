import "./assets/stylesheets/fontawesome-all.css";
import "papercss/dist/paper.css";
import "./assets/stylesheets/styles.scss";

import React from "react"; // import the main react dependency
import ReactDOM from "react-dom"; // import reactDOM
import { Router, browserHistory } from "react-router-dom";
import App from "./app/App"; // import the main app component
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
ReactDOM.render(
	<Router history={history}>
		<App />
	</Router>,
	document.getElementById("root")
); // render our App component and mount it to our #root element
