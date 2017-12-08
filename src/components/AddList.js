import React, { Component } from 'react';

class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  render() {
    return (
    	<div>
	    {
	    	!this.state.open && <div className="card">
            <div className="card-body" onClick={() => {this.setState({open: true})}}>
              <h4 className="card-title">Create a new item</h4>
            </div>
          </div>
	    }
	    {
	    	this.state.open && <div className="card">
	            <div className="card-header">Create a List: <i className="fa fa-times" onClick={() => {this.setState({open: false})}}></i></div>
	            <div className="card-body">
	              <h5 className="card-title">What shall we call the List ?</h5>
	              <div className="form-group">
	                <input type="text" placeholder="List name ..." id="paperInputs1" />
	              </div>
	              <button className="btn-small">Create</button>
	            </div>
	        </div>
	    }
	    </div>
   );
		
  }
}

export default AddList;









