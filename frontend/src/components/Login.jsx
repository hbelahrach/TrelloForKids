/*
* @author  Hamid belahrach
*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router";
import { login, logout } from "../actions/session";

class Login extends Component {
	constructor(props) {
		super(props);
		this.email = "";
		this.password = "";
	}

	login = () => {
		if (this.email && this.password)
			this.props.login({ email: this.email, password: this.password });
	};

	logout = () => {
		this.props.logout();
	};

	render() {
		return (
			<div className="container padding-top-large">
				{this.props.loggedIn && <Redirect to={{ pathname: "/" }} />}
				<div className="row flex-center flex-">
					<div className="sm-5 col ">
						<div className="card">
							<div className="card-header">
								<label className="card-title ">Login </label>
							</div>
							<div className="card-body">
								<div className="row flex-center flex">
									{this.props.authError && (
										<div class="alert alert-danger">
											Email or password incorrect
										</div>
									)}
									<div className="form">
										<div className="sm-12 col padding-top-small padding-bottom-none">
											<div className="form-group">
												<label htmlFor="email">
													Email
												</label>
												<input
													type="text"
													placeholder="email"
													id="email"
													ref={el =>
														(this.inputEmail = el)
													}
													onChange={e =>
														(this.email =
															e.target.value)
													}
												/>
											</div>
										</div>
										<div className="col padding-top-none padding-bottom-small">
											<div className="form-group">
												<label htmlFor="password">
													Password
												</label>
												<input
													type="password"
													placeholder="password"
													id="password"
													ref={el =>
														(this.inputPassword = el)
													}
													onChange={e =>
														(this.password =
															e.target.value)
													}
												/>
											</div>
										</div>
										<div className="col padding-top-small padding-bottom-none">
											<button
												className="btn-block"
												onClick={this.login}
											>
												Login
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.session.loggedIn,
		authError: state.session.authError
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: data => dispatch(login(data)),
		logout: data => dispatch(logout())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
