import styled from 'styled-components';

export const Modal = styled.div`
  width: 300px;
  background-color: ${(props) => {
    const color = props.error ? '#DF160A' : 'white';
    return color;
  }};
  color: ${(props) => {
    const color = props.error ? 'white' : '#333';
    return color;
  }};
  border-radius: 4px;
  padding: 15px 8px;
  position: fixed;
  top: 40px;
  left: 50%;
  margin-left: -150px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.62);
  padding-right: 30px;
  z-index: 1000;
`;

export const Text = styled.p`
`;

export const CloseButton = styled.button`
  background-color: transparent;
  color: gray;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  right: 8px;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  margin-top: -10px;
  top: 50%;
  font-size: 14px;
  box-shadow: none !important;
`;
