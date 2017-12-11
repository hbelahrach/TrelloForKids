import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { itemsFetchData } from "../actions/boards";
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
    this.state = {
      lists: [
        {
          id: 0,
          title: "list 1",
          tasks: [{ id: 0, title: "task 0" }, { id: 1, title: "task 1" }]
        },
        {
          id: 1,
          title: "list 2",
          tasks: [{ id: 0, title: "task 0" }, { id: 1, title: "task 2" }]
        }
      ]
    };
  }

  onDragEnd = result => {
    if (!result.destination) return;
    if (result.destination.droppableId == "droppable-lists") {
      let items = reorder(
        this.state.lists,
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
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="container padding-top-large">
          <h1>
            <span className="badge danger">Title board</span>
          </h1>
          <div className="row">
            <AddList />
          </div>
          <Droppable
            droppableId="droppable-lists"
            type="droppable-lists"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div className="row" ref={provided.innerRef}>
                {this.state.lists.map(item => (
                  <ListItem item={item} key={item.id} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    error: state.itemsError,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
};

export default connect(null, null)(Category);
