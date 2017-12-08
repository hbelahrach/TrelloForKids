import React, { Component } from 'react';
import cat from '../assets/images/cat';
import dog from '../assets/images/dog';
import dogs from '../assets/images/dogs';
import AddList from './AddList'
import ListItem from './ListItem'

class Category extends Component {
  render() {
    console.log(this.props)
    return (
	     <div className="container padding-top-large">
	       <h1><span className="badge danger">Title board</span></h1>
	       <div className="row flex-middle">
		        <div className="sm-4 col">
		        	<ListItem />
		        </div>
		        <div className="sm-4 col">
		        	<div className="card">
		        		<div className="card-header">List item 2</div>
			            <div className="card-body">
			              <div className="row flex-middle">
			              	 <div className="col sm-12">
					        	<div className="form-group">
							        <input type="text" placeholder="Add a new task ..." id="paperInputs1" />
							    </div>
							  </div> 
		          		   </div>
			            </div>
		          	</div>
		        </div>
		        <div className="sm-4 col">
		        	<AddList/>
		        </div>
      		</div>
	    </div>
    );
  }
}

export default Category;