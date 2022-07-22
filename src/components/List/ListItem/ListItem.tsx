import React from "react";
import { Button } from "antd";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import {
  ItemName,
  ItemQty,
  StyledCheckbox,
  StyledListItem,
} from "./ListItem.style";
import { IListItem } from "../types";
import { StyledInputNumber } from "../../shared/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IListItemProps {
  item: IListItem;
  completed: boolean;
  handleCheckbox: (id: string) => void;
  handleDelete: (id: string) => void;
  handleQtyChange: (id: string, qty: number) => void;
}

export const ListItem: React.FunctionComponent<IListItemProps> = ({
  completed,
  item,
  handleCheckbox,
  handleDelete,
  handleQtyChange,
}) => {
  const onQtyChange = (value: any) => {
    handleQtyChange(item.id, value);
  };
  return (
    <StyledListItem completed={completed} data-testid="ListItemTestId">
      <StyledCheckbox
        type="checkbox"
        onChange={() => handleCheckbox(item.id)}
        checked={completed}
      />
      <ItemName title={item.name}>{item.name}</ItemName>
      <ItemQty>Qty: </ItemQty>
      <StyledInputNumber
        min={1}
        max={99}
        defaultValue={item.quantity}
        onChange={onQtyChange}
      />
      <Button
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={() => handleDelete(item.id)}
      />
    </StyledListItem>
  );
};
