import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Button } from "antd";
import uuid from "uuidv4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";

import { AppContainer } from "./App.style";
import {
  DraggableIcon,
  FAIconRightPadded,
  FlexRowDiv,
  StyledInput,
} from "./components/shared/components";
import { List } from "./components/List";
import { IList } from "./components/List/types";
import { ListData } from "./utils/ListData";
import { reorder } from "./utils/DragNDrop";

const App: React.FunctionComponent = () => {
  // take in initial list data and set it as the lists state so we can manipulate it
  const [lists, setLists] = useState<IList[]>(ListData);
  const [addListInput, setAddListInput] = useState<string>("");

  const deleteList = (id: string) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  };

  const addList = () => {
    const newList: IList = { id: uuid(), name: addListInput, items: [] };
    setAddListInput("");
    setLists([...lists, newList]);
  };

  // used for drag and drop, fires when item is let go
  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(lists, result.source.index, result.destination.index);
    setLists(items);
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 400,
  });

  return (
    <AppContainer className="App">
      <h1>Ye ol' Goods Gatherin</h1>
      <div>
        {/* text input that can fire if enter is pressed */}
        <StyledInput
          type={"text"}
          maxLength={250}
          value={addListInput}
          onInput={(e) => setAddListInput(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addList();
            }
          }}
          data-testid={"addListInputTestId"}
          aria-label="add-list"
        />
        <Button
          icon={<FAIconRightPadded icon={faFileCirclePlus} />}
          onClick={() => addList()}
        >
          Add List
        </Button>
      </div>

      {/* drag and drop context needed to encapsulate data that will be draggable */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableList">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {lists.map((list, index) => {
                return (
                  <Draggable key={list.id} draggableId={list.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <FlexRowDiv>
                          {/* dragHandleProps is placed on an element that we want to use to drag items */}
                          <DraggableIcon {...provided.dragHandleProps}>
                            <FontAwesomeIcon
                              icon={faGripVertical}
                              size={"2x"}
                            />
                          </DraggableIcon>
                          <List
                            key={list.id}
                            list={list}
                            onDelete={() => deleteList(list.id)}
                          />
                        </FlexRowDiv>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </AppContainer>
  );
};

export default App;
