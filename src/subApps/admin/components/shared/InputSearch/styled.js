import styled from 'styled-components';

export const Input = styled.input`
  padding: 4px 6px;
  border: none;
  box-shadow: none;
  outline: none;
  width: 90%;
  font-family: Proxima Nova;
  font-size: 16px;

  &:focus {
    box-shadow: none;
    border: none;
  }
`;

export const ClearButton = styled.button`
  background-color: transparent;
  border: none;
  color: gray;
  font-size: 18px;
  padding:  5px 6px 3px 3px;

  &:active, &:focus {
    box-shadow: none;
  }

  &:hover {
    cursor: pointer;
    color: #333;
  }
`;

export const InputContainer = styled.div`
  border: 1px solid #C6CCD5;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding-left: 3px;
  min-width: 300px;
  min-height: 31px;
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
  left: 4px;
  top: 4px;
`;
