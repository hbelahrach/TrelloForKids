/*
* @author  Hamid belahrach
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import { getBoards, addBoard } from "../actions/boards";

class AddBoard extends Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
		this.title = "";
	}

	create = () => {
		if (this.title)
			this.props.addBoard({ title: this.title }).then(() => {
				this.title = "";
				this.input.value = "";
				this.props.getBoards();
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
							<h4 className="card-title">Create a new board</h4>
						</div>
					</div>
				)}
				{this.state.open && (
					<div className="card">
						<div className="card-header">
							Create a board:{" "}
							<i
								className="fa fa-times"
								onClick={() => {
									this.setState({ open: false });
								}}
							/>
						</div>
						<div className="card-body">
							<h5 className="card-title">
								What shall we call the board ?
							</h5>
							<div className="form-group">
								<input
									type="text"
									placeholder="Board name ..."
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
		getBoards: url => dispatch(getBoards()),
		addBoard: item => dispatch(addBoard(item))
	};
};

export default connect(null, mapDispatchToProps)(AddBoard);
