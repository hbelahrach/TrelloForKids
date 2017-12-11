import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { boardsFetch } from "../actions/boards";
import AddBoard from "./AddBoard";

class Home extends Component {
  componentWillMount() {
    this.props.getBoards(
      "http://5a2dcd370e07b700120839f0.mockapi.io/api/boards"
    );
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
              <div className="sm-4 col" key={item.id}>
                <div className="card">
                  <div className="card-body">
                    <h4
                      className="card-title"
                      onClick={() => {
                        this.props.history.push(`board/${item.id}`);
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
    items: state.boards.boards,
    error: state.boards.boardsError,
    isLoading: state.boards.boardsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoards: url => dispatch(boardsFetch(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
