import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const Modal = styled.div`
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
`;

export const Title = styled.h4`
  font-family: Proxima Nova;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #000000;
`;

export const Message = styled.p`
  font-family: Proxima Nova;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #000000;
  margin-bottom: 20px;
`;

export const CanselButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 4px;
  background-color: transparent;
  font-family: Proxima Nova;
  font-size: 16px;
  color: #4F4F4F;
  padding: 6px 35px;
`;

export const SaveButton = styled.button`
  background: #EB5757;
  border: 1px solid rgba(0, 0, 0, 0.05);
  font-family: Proxima Nova;
  font-size: 16px;
  color: white;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 35px;
  float: right;
  margin-left: 12px;
`;
