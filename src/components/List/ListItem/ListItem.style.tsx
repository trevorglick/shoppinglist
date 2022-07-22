import styled from "styled-components";
import { Checkbox } from "antd";

export const StyledListItem = styled.li<{ completed: boolean }>`
  display: flex;
  flex-grow: 1;
  align-items: center;
  ${(props) => props.completed && `text-decoration: line-through`}
`;

export const ItemName = styled.div`
  flex-grow: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 120px;
`;

export const ItemQty = styled.div`
  margin-left: auto;
  margin-right: 8px;
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-left: 8px;
  margin-right: 8px;
`;
