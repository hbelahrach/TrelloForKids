import React, { Component } from "react";
import cat from "../assets/images/cat";
import dog from "../assets/images/dog";
import dogs from "../assets/images/dogs";
import AddList from "./AddList";
import ListItem from "./ListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = items => {
  return Array.from(items, x => {
    return { id: x, content: `content ${x}` };
  });
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems([1, 2, 3])
    };
  }

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="container padding-top-large">
          <h1 onClick={this.test}>
            <span className="badge danger">Title board</span>
          </h1>
          <Droppable
            droppableId="droppable-1"
            type="ListItem"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div className="row" ref={provided.innerRef}>
                {this.state.items.map(item => (
                  <ListItem draggableId={item.id} key={item.id} />
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

export default Category;
