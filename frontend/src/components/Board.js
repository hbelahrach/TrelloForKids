/*
* @author  Hamid belahrach
*/

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
  getBoard,
  orderList,
  updateList,
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
    this.props.getBoard(match.params.boardId);
  }

  onDragEnd = result => {
    if (!result.destination) return;
    let board = Object.assign({}, this.props.activeBoard);

    if (result.destination.droppableId == "droppable-lists") {
      let items = reorder(
        this.props.activeBoard.lists,
        result.source.index,
        result.destination.index
      );

      board.lists = items;
      this.props.activeBoardSuccess(board);
      this.props.orderBoard(this.props.match.params.boardId, items);
    }

    if (result.destination.droppableId.startsWith("droppable-tasks")) {
      let srcDroppableId = result.source.droppableId;
      let srcParts = srcDroppableId.split("-");
      let destDroppableId = result.destination.droppableId;
      let destParts = destDroppableId.split("-");
      let lists = this.props.activeBoard.lists;
      let destIndex = lists.findIndex(item => item._id == destParts[2]);
      let srcIndex = lists.findIndex(item => item._id == srcParts[2]);

      if (srcIndex == destIndex) {
        let items = reorder(
          lists[destIndex].tasks,
          result.source.index,
          result.destination.index
        );
        board.lists[destIndex].tasks = items;
        this.props.activeBoardSuccess(board);
        this.props.orderList(destParts[2], items);
      } else {
        let [removed] = board.lists[srcIndex].tasks.splice(
          result.source.index,
          1
        );
        board.lists[destIndex].tasks.splice(
          result.destination.index,
          0,
          removed
        );
        this.props.activeBoardSuccess(board);

        let srcList = Object.assign({}, board.lists[srcIndex]);
        srcList.tasks = srcList.tasks.map(el => el._id);
        let destList = Object.assign({}, board.lists[destIndex]);
        destList.tasks = destList.tasks.map(el => el._id);
        this.props
          .updateList(srcList._id, srcList)
          .then(() =>
            this.props.orderList(srcList._id, board.lists[srcIndex].tasks)
          );
        this.props
          .updateList(destList._id, destList)
          .then(() =>
            this.props.orderList(destList._id, board.lists[destIndex].tasks)
          );
      }
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
                  {activeBoard.lists.length < 3 && (
                    <div className="sm-4 col">
                      <AddList />
                    </div>
                  )}
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
    updateList: (listId, list) => dispatch(updateList(listId, list)),
    orderList: (listId, tasks) => dispatch(orderList(listId, tasks)),
    activeBoardSuccess: item => dispatch(activeBoardSuccess(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
