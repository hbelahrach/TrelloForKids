import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { getBoard,     orderList: (boardId, params) => dispatch(orderList(boardId, params))
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

class Category extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { history, match } = this.props;
    this.props.getBoard(match.params.number);
  }

  onDragEnd = result => {
    if (!result.destination) return;
    if (result.destination.droppableId == "droppable-lists") {
      let items = reorder(
        this.props.lists,
        result.source.index,
        result.destination.index
      );

      this.setState({
        lists: items
      });
    }

    if (result.destination.droppableId.startsWith("droppable-tasks")) {
      let droppableId = result.destination.droppableId;
      let parts = droppableId.split("-");
      let lists = this.state.lists;
      let index = lists.findIndex(item => item.id == parts[2]);

      let items = reorder(
        lists[index].tasks,
        result.source.index,
        result.destination.index
      );
      lists[index].tasks = items;

      this.setState({
        lists: lists
      });
    }
  };

  render() {
    let { activeBoard } = this.props;
    console.log("activeBoard: ", activeBoard);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="container padding-top-large">
          <h1>
            <span className="badge danger">
              {activeBoard && activeBoard.title}
            </span>
          </h1>
          <div className="row">
            <AddList />
          </div>
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
    orderList: (boardId, params) => dispatch(orderList(boardId, params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
