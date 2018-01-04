/*
* @author  Hamid belahrach
*/

import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const PublicRoute = ({ component: Component, loggedIn, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			!loggedIn ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/boards",
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);
const mapStateToProps = state => ({
	loggedIn: state.session.loggedIn
});

export default connect(mapStateToProps, null)(PublicRoute);
