import styled from 'styled-components';

const Modal = styled.div`
  padding: 10px;
  background-color: white;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0, 0.3);
  border-radius: 4px;
  position: fixed;
  width: 250px;
  margin-left: -125px;
  top: 40px;
  z-index: 100;
`;

const TextModal = styled.p`
  color: #333;
  font-size: 16px;
`;

const ButtonCloseModal = styled.button`
  background-color: transparent;
  color: black;
  position: absolute;
  right: 3px;
  top: 3px;
  outline: none;
  cursor: pointer;
  border: none;
`;

export {
  Modal,
  TextModal,
  ButtonCloseModal,
};
