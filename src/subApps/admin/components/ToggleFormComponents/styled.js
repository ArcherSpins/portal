import styled from 'styled-components';

export const Label = styled.label`
  margin-bottom: 7px;
  display: block;
  color: #79818D;
  font-family: Proxima Nova;
  font-size: 14px;
  line-height: 20px;
  color: ${({ error }) => error && 'tomato'};
`;

export const Input = styled.input`
  border-radius: 4px;
  padding: 4px 4px;
  border: 1px solid #b5b2b2;
  min-width: 210px;
  border-color: ${({ error }) => error && 'tomato !important'};
`;

export const Text = styled.p`
  color: #333;
  font-family: Proxima Nova;
  font-size: 14px;
  line-height: 20px;
`;

export const Icon = styled.img`
  width: 16px;
  height: 18px;
  margin-left: 8px;
`;

export const FlexBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const FieldBlock = styled.div`
  width: 50%;

  input {
    border-radius: 4px;
    padding: 4px 4px;
    border: 1px solid #b5b2b2;
    min-width: 210px;
  }
`;

export const Select = styled.select`
  border: none;
  background-color: white;
  padding: 4px 0;
  color: #333;
  min-width: 210px;
`;
