/*
* @author  Hamid belahrach
*/

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { getBoards, addBoard, orderList } from "../actions/boards";
import AddBoard from "./AddBoard";

class Home extends Component {
  componentWillMount() {
    this.props.getBoards();
  }

  render() {
    return (
      <div className="container padding-top-large">
        <div className="row flex-middle">
          <div className="sm-4 col">
            <AddBoard />
          </div>
          {this.props.items.map(item => {
            return (
              <div className="sm-4 col" key={item._id}>
                <div className="card">
                  <div className="card-body">
                    <h4
                      className="card-title"
                      onClick={() => {
                        this.props.history.push(`board/${item._id}`);
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.boards.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoards: () => dispatch(getBoards())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
