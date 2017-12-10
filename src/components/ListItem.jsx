import React, { Component } from "react";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

const getItemStyle = (draggableStyle, isDragging) => ({
	background: isDragging ? "lightblue" : "",
	...draggableStyle
});

class ListItem extends Component {
	render() {
		return (
			<Draggable
				key={this.props.item.id}
				draggableId={this.props.item.id}
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
										this.props.item.id
									}`}
									type={`droppable-tasks-${
										this.props.item.id
									}`}
									direction="vertical"
								>
									{(provided, snapshot) => (
										<div className="card-body">
											<div className="row">
												<div className="form-group">
													<input
														type="text"
														placeholder="Add a new task ..."
														id="paperInputs1"
													/>
												</div>
											</div>
											<div ref={provided.innerRef}>
												{this.props.item.tasks.map(
													task => (
														<TaskItem
															item={task}
															key={task.id}
															droppableId={`droppable-tasks-${
																this.props.item
																	.id
															}`}
														/>
													)
												)}
												{provided.placeholder}
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

export default ListItem;
