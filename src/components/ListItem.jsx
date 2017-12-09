import React, { Component } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (draggableStyle, isDragging) => ({
	background: isDragging ? "lightblue" : "",
	...draggableStyle
});

class ListItem extends Component {
	render() {
		return (
			<Draggable
				key={this.props.draggableId}
				draggableId={this.props.draggableId}
				type="ListItem"
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
									List item {this.props.draggableId}
								</div>
								<div className="card-body">
									<div className="row flex-middle">
										<div className="col sm-12">
											<div className="form-group">
												<input
													type="text"
													placeholder="Add a new task ..."
													id="paperInputs1"
												/>
											</div>
										</div>
									</div>
									<div className="row flex-middle">
										<div className="col sm-12">
											<div className="card">
												<div className="card-body">
													<h4 className="card-title">
														Task 1
													</h4>
												</div>
											</div>
										</div>
									</div>
									<div className="row flex-middle">
										<div className="col sm-12">
											<div className="card">
												<div className="card-body">
													<h4 className="card-title">
														Task 2
													</h4>
												</div>
											</div>
										</div>
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

export default ListItem;
