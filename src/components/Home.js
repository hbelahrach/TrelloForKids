import React, { Component } from 'react';
import cat from '../assets/images/cat';
import dog from '../assets/images/dog';
import dogs from '../assets/images/dogs';
import AddBoard from './AddBoard'

class Home extends Component {
  render() {
    return (
      <div className="container padding-top-large">
      <div className="row flex-middle">
        <div className="sm-4 col">
          <AddBoard />
        </div>
        <div className="sm-4 col">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title" onClick={()=> {this.props.history.push(`board/${1}`)}}>Board Name</h4>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Home;