import React, { useState } from "react";
import { Button } from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripVertical,
  faCartPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import uuid from "uuidv4";

import { ListItem } from "./ListItem";
import { StyledList } from "./List.style";
import {
  FAIconRightPadded,
  DraggableIcon,
  FlexRowDiv,
  StyledInput,
  StyledListHeader,
} from "../shared/components";
import { IList, IListItem } from "./types";
import { reorder } from "../../utils/DragNDrop";

interface IListProps {
  list: IList;
  onDelete: (id: string) => void;
}

export const List: React.FunctionComponent<IListProps> = ({
  list,
  onDelete,
}) => {
  const { id, name, items } = list;
  const [listItems, setListItems] = useState<IListItem[]>(items);
  const [addItemInput, setAddItemInput] = useState<string>("");

  const handleCheckbox = (id: string) => {
    const updatedItems = listItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setListItems(updatedItems);
  };

  const handleDeleteItem = (id: string) => {
    const filteredItems = listItems.filter((item) => item.id !== id);
    setListItems(filteredItems);
  };

  const handleQtyChange = (id: string, value: number) => {
    const updatedItems = listItems.map((item) =>
      item.id === id ? { ...item, quantity: value } : item
    );
    setListItems(updatedItems);
  };

  const addItemToList = () => {
    const updatedItems = [
      ...listItems,
      { id: uuid(), name: addItemInput, quantity: 1, completed: false },
    ];
    setListItems(updatedItems);
    setAddItemInput("");
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      listItems,
      result.source.index,
      result.destination.index
    );

    setListItems(items);
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
    <div>
      <StyledListHeader data-testid="ListHeaderTestId">{name}</StyledListHeader>
      <div>
        <StyledInput
          type={"text"}
          maxLength={250}
          value={addItemInput}
          onInput={(e) => setAddItemInput(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItemToList();
            }
          }}
        />
        <Button
          icon={<FAIconRightPadded icon={faCartPlus} />}
          onClick={() => addItemToList()}
        >
          Add Item
        </Button>
      </div>
      {listItems.length ? (
        <StyledList>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableListItem">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {listItems.map((item: IListItem, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
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
                              <DraggableIcon {...provided.dragHandleProps}>
                                <FontAwesomeIcon
                                  icon={faGripVertical}
                                  size={"2x"}
                                />
                              </DraggableIcon>
                              <ListItem
                                key={item.id}
                                item={item}
                                handleCheckbox={handleCheckbox}
                                handleDelete={handleDeleteItem}
                                handleQtyChange={handleQtyChange}
                                completed={item.completed}
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
        </StyledList>
      ) : null}
      <Button
        icon={<FAIconRightPadded icon={faTrash} />}
        onClick={() => onDelete(id)}
        data-testid={"ListDeleteTestId"}
      >
        Delete List
      </Button>
    </div>
  );
};
