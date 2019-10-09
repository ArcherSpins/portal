import styled from 'styled-components';

export const ItemList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.07);
  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
`;

export const Item = styled.li`
  padding: 10px 5px 10px 3px;
  font-size: 14px;
  font-family: Proxima Nova;
  width: 25%;
  color: #333;
`;

export const DepartmentItem = styled.li`
  padding: 10px 5px 10px 3px;
  font-size: 14px;
  font-family: Proxima Nova;
  width: 20%;
  box-sizing: border-box;
  color: #333;
`;

export const DepartHeader = styled.p`
  margin-bottom: 8px;
`;

export const DepartSubTitle = styled.p`
  color: rgba(51, 51, 51, 0.54);
`;

export const PositionList = styled.ul`
  list-style-type: none;
`;

export const PositionItem = styled.li`
  color: #61B16F;
  &:nth-child(n+2) {
    margin-top: 6px;
  }
`;

export const EmployeesItem = styled.p`
  &:nth-child(n+2) {
    margin-top: 6px;
  }
`;
