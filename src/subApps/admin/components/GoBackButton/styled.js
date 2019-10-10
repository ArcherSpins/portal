
import styled from 'styled-components';

export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  outline: none;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    box-shadow: none;
  }
`;

export const Img = styled.img`
  width: 12px;
  height: 12px;
`;
