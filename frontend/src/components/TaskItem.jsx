/*
* @author  Hamid belahrach
*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { updateTask, getBoard } from "../actions/boards";
import { Draggable, Droppable } from "react-beautiful-dnd";

const getItemStyle = (draggableStyle, isDragging) => ({
	background: isDragging ? "aliceblue" : "",
	...draggableStyle
});

class TaskItem extends Component {
	check = () => {
		let item = this.props.item;
		item.done = !item.done;
		this.props
			.updateTask(this.props.item._id, { done: item.done })
			.then(() => this.props.getBoard(this.props.match.params.boardId));
	};

	render() {
		return (
			<Draggable
				key={this.props.item._id}
				draggableId={this.props.item._id}
				type={this.props.droppableId}
			>
				{(provided, snapshot) => (
					<div className="row">
						<div className="col-fill col">
							<div
								ref={provided.innerRef}
								style={getItemStyle(
									provided.draggableStyle,
									snapshot.isDragging
								)}
								{...provided.dragHandleProps}
							>
								<div
									className={`card ${this.props.item.done &&
										"background-success"}`}
									onClick={this.check}
								>
									<div className="card-body">
										<h4>
											{this.props.item.title}
											<i
												className={`fa ${this.props.item
													.done && "fa-check check"}`}
											/>
										</h4>
									</div>
								</div>
							</div>
							{provided.placeholder}
						</div>
					</div>
				)}
			</Draggable>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getBoard: boardId => dispatch(getBoard(boardId)),
		updateTask: (taskId, item) => dispatch(updateTask(taskId, item))
	};
};

export default connect(null, mapDispatchToProps)(withRouter(TaskItem));
