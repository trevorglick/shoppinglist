import styled from "styled-components";
import { Input, InputNumber } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledInput = styled(Input)`
  width: 200px;
  margin: 8px;
`;

export const StyledInputNumber = styled(InputNumber)`
  margin-right: 8px;
  width: 60px;
`;

export const FlexRowDiv = styled.div`
  display: flex;
`;

export const StyledListHeader = styled.header`
  font-size: 24px;
  padding-left: 8px;
  padding-right: 8px;
`;

// button that has an Font Awesome Icon + Text
export const FAIconRightPadded = styled(FontAwesomeIcon)`
  padding-right: 8px;
`;

export const DraggableIcon = styled.span`
  height: 32px;
`;
