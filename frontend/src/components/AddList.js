/*
* @author  Hamid belahrach
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addList } from "../actions/boards";

class AddList extends Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
		this.title = "";
	}

	create = () => {
		if (this.title)
			this.props
				.addList(this.props.match.params.boardId, { title: this.title })
				.then(() => {
					this.title = "";
					this.input.value = "";
				});
	};

	render() {
		return (
			<div>
				{!this.state.open && (
					<div className="card">
						<div
							className="card-body"
							onClick={() => {
								this.setState({ open: true });
							}}
						>
							<h4 className="card-title">Create a new item</h4>
						</div>
					</div>
				)}
				{this.state.open && (
					<div className="card">
						<div className="card-header">
							Create a List:{" "}
							<i
								className="fa fa-times"
								onClick={() => {
									this.setState({ open: false });
								}}
							/>
						</div>
						<div className="card-body">
							<h5 className="card-title">
								What shall we call the List ?
							</h5>
							<div className="form-group">
								<input
									type="text"
									placeholder="List name ..."
									id="paperInputs1"
									ref={el => (this.input = el)}
									onChange={e =>
										(this.title = e.target.value)
									}
								/>
							</div>
							<button className="btn-small" onClick={this.create}>
								Create
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addList: (boardId, data) => dispatch(addList(boardId, data))
	};
};

export default connect(null, mapDispatchToProps)(withRouter(AddList));
