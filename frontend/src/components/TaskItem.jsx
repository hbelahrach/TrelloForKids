import React, { Component } from "react";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";

const getItemStyle = (draggableStyle, isDragging) => ({
	background: isDragging ? "lightblue" : "",
	...draggableStyle
});

class TaskItem extends Component {
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
								<div className="card">
									<div className="card-body">
										<h4 className="card-title">
											{this.props.item.title}
											<i
												className={`fa ${this.props.item
													.done && "fa-check"}`}
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

export default TaskItem;
