import React, { Component } from 'react';

class AddBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  render() {
    console.log(this.props)
    return (
    	<div>
	    {
	    	!this.state.open && <div className="card">
            <div className="card-body" onClick={() => {this.setState({open: true})}}>
              <h4 className="card-title">Create a new board</h4>
            </div>
          </div>
	    }
	    {
	    	this.state.open && <div className="card">
	            <div className="card-header">Create a board: <i className="fa fa-times" onClick={() => {this.setState({open: false})}}></i></div>
	            <div className="card-body">
	              <h5 className="card-title">What shall we call the board ?</h5>
	              <div className="form-group">
	                <input type="text" placeholder="Board name ..." id="paperInputs1" />
	              </div>
	              <button className="btn-small">Create</button>
	            </div>
	        </div>
	    }
	    </div>
   );
		
  }
}

export default AddBoard;









