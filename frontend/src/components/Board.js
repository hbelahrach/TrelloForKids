import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
  getBoard,
  orderList,
  orderBoard,
  activeBoardSuccess
} from "../actions/boards";
import AddList from "./AddList";
import ListItem from "./ListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (lists, startIndex, endIndex) => {
  const result = Array.from(lists);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class Board extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { history, match } = this.props;
    this.props.getBoard(match.params.number);
  }

  onDragEnd = result => {
    if (!result.destination) return;
    let board = this.props.activeBoard;

    if (result.destination.droppableId == "droppable-lists") {
      let items = reorder(
        this.props.activeBoard.lists,
        result.source.index,
        result.destination.index
      );

      board.lists = items;
      this.props.activeBoardSuccess(board);
      this.props.orderBoard(this.props.match.params.number, items);
    }

    if (result.destination.droppableId.startsWith("droppable-tasks")) {
      let droppableId = result.destination.droppableId;
      let parts = droppableId.split("-");
      let lists = this.props.activeBoard.lists;
      let index = lists.findIndex(item => item._id == parts[2]);

      let items = reorder(
        lists[index].tasks,
        result.source.index,
        result.destination.index
      );

      board.lists[index].tasks = items;
      this.props.activeBoardSuccess(board);
      this.props.orderList(parts[2], items);
    }
  };

  render() {
    let { activeBoard } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="container">
          <h1>
            <span className="badge danger">
              {activeBoard && activeBoard.title}
            </span>
          </h1>
          <Droppable
            droppableId="droppable-lists"
            type="droppable-lists"
            direction="horizontal"
          >
            {(provided, snapshot) =>
              activeBoard && (
                <div className="row" ref={provided.innerRef}>
                  {activeBoard.lists.map(item => (
                    <ListItem item={item} key={item._id} />
                  ))}
                  {provided.placeholder}
                  <div className="sm-4 col">
                    <AddList />
                  </div>
                </div>
              )
            }
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeBoard: state.boards.activeBoard,
    error: state.boards.activeBoardError,
    isLoading: state.boards.activeBoardIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBoard: boardId => dispatch(getBoard(boardId)),
    orderBoard: (boardId, lists) => dispatch(orderBoard(boardId, lists)),
    orderList: (listId, tasks) => dispatch(orderList(listId, tasks)),
    activeBoardSuccess: item => dispatch(activeBoardSuccess(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
