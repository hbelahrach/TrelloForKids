import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const source = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource('listItem', source, collect)
class ListItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };
  render() {
    console.log(this.props)
    return connectDragSource(
		        	<div className="card">
		        		<div className="card-header">List item 1</div>
			            <div className="card-body">
			              <div className="row flex-middle">
			              	 <div className="col sm-12">
					        	<div className="form-group">
							        <input type="text" placeholder="Add a new task ..." id="paperInputs1" />
							    </div>
							  </div> 
		          		   </div>
			              <div className="row flex-middle">
			              	<div className="col sm-12">
					              <div className="card">
					            	<div className="card-body">
					                	<h4 className="card-title">Task 1</h4>
					              	</div>
					              </div>
		          		   </div>
		          		  </div>
		          		  <div className="row flex-middle">
			              	<div className="col sm-12">
					              <div className="card">
					            	<div className="card-body">
					                	<h4 className="card-title">Task 2</h4>
					              	</div>
					              </div>
		          		   </div>
		          		  </div>
			            </div>
		          	</div>
    );
  }
}

export default ListItem;