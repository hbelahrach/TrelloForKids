/*
* @author  Hamid belahrach
*/

import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			return loggedIn ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{ pathname: "/login", state: { from: props.location } }}
				/>
			);
		}}
	/>
);
const mapStateToProps = state => {
	return { loggedIn: state.session.loggedIn };
};

export default withRouter(connect(mapStateToProps, null)(PrivateRoute));
