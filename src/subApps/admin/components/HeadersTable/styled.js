import styled from 'styled-components';

export const HeaderList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.07);
  li {
    width: 25%;
  }
`;

export const HeaderListDepartment = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.07);
  li {
    width: 20%;
  }
`;

export const HeaderItem = styled.li`
  padding: 8px 6px 8px 4px;
  color: color: rgba(51, 51, 51, 0.54);
  font-weight: bold;
  font-family: Proxima Nova;
  font-size: 14px;
`;
