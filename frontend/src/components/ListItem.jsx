/*
* @author  Hamid belahrach
*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getBoard, addTask } from "../actions/boards";
import TaskItem from "./TaskItem";

const getItemStyle = (draggableStyle, isDragging) => ({
	background: isDragging ? "aliceblue" : "",
	...draggableStyle
});

class ListItem extends Component {
	constructor(props) {
		super(props);
		this.title = "";
	}

	handleKeyPress = event => {
		if (event.key == "Enter" && this.title) {
			this.props
				.addTask(this.props.item._id, { title: this.title })
				.then(() => {
					this.input.value = "";
					this.title = "";
					this.props.getBoard(this.props.match.params.boardId);
				});
		}
	};

	render() {
		return (
			<Draggable
				key={this.props.item._id}
				draggableId={this.props.item.order}
				type="droppable-lists"
			>
				{(provided, snapshot) => (
					<div className="sm-4 col">
						<div
							ref={provided.innerRef}
							style={getItemStyle(
								provided.draggableStyle,
								snapshot.isDragging
							)}
							{...provided.dragHandleProps}
						>
							<div className="card">
								<div className="card-header">
									{this.props.item.title}
								</div>

								<Droppable
									droppableId={`droppable-tasks-${
										this.props.item._id
									}`}
									type={`droppable-tasks`}
									direction="vertical"
								>
									{(provided, snapshot) => (
										<div className="card-body">
											<div className="row">
												<div className="col-fill col padding-bottom-none">
													<div className="form-group">
														<input
															type="text"
															placeholder="Add a new task ..."
															id="paperInputs1"
															ref={el =>
																(this.input = el)
															}
															onKeyPress={
																this
																	.handleKeyPress
															}
															onChange={e =>
																(this.title =
																	e.target.value)
															}
														/>
													</div>
												</div>
											</div>
											<div
												className="row"
												ref={provided.innerRef}
											>
												<div className="col-fill col padding-none">
													{this.props.item.tasks.map(
														task => (
															<TaskItem
																item={task}
																key={task._id}
																droppableId={`droppable-tasks`}
															/>
														)
													)}
													{provided.placeholder}
												</div>
											</div>
										</div>
									)}
								</Droppable>
							</div>
							{provided.placeholder}
						</div>
					</div>
				)}
			</Draggable>
		);
	}
}

const mapStateToProps = state => {
	return {
		activeBoard: state.boards.activeBoard,
		error: state.boards.activeBoardError,
		isLoading: state.boards.activeBoardIsLoading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getBoard: boardId => dispatch(getBoard(boardId)),
		addTask: (listId, data) => dispatch(addTask(listId, data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(ListItem)
);
