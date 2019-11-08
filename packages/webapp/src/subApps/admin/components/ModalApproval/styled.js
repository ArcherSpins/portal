import styled from 'styled-components';
import { Button } from 'ui-kit';

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

export const CancelButton = styled(Button)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 4px;
  background-color: transparent;
  font-family: Proxima Nova;
  font-size: 16px;
  color: #4F4F4F;
  padding: 6px 38px;

  &:hover {
    background-color: transparent;
  }
`;

export const SaveButton = styled(Button)`
  background: #EB5757;
  border: 1px solid rgba(0, 0, 0, 0.05);
  font-family: Proxima Nova;
  font-size: 16px;
  color: white;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 38px;
  float: right;
  margin-left: 12px;

  &:hover {
    background-color: #EB5757;
  }
`;
