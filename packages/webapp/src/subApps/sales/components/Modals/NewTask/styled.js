import styled from 'styled-components';

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: gray;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 18px;
  cursor: pointer;
`;

export const EditButton = styled.button`
  border: 1px solid #D7D7D7;
  box-sizing: border-box;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const TextEdit = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

export const TransparentButton = styled.button``;

export const DealNameBlock = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #333333;
`;

export const DealNameContainer = styled.div`
  text-align: left;
`;

export const DealNameLabel = styled.label`
  font-size: 14px;
  line-height: 20px;
  color: rgba(51, 51, 51, 0.5);
`;

export const Icon = styled.i;
