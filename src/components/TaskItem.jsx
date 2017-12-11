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
				key={this.props.item.id}
				draggableId={this.props.item.id}
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
