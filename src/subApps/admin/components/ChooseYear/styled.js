import styled, { css } from 'styled-components';

export const YearButton = styled.div`
  cursor: pointer;
  color: #61B16F;
  font-size: 2rem;
  font-family: 'Proxima Nova Black';
  border-bottom: 1px solid #61B16F;
  display: inline-block;
  margin-right: 1rem;
  ${({ selected }) => selected && css`
    color: #333;
    border-bottom: none;
    cursor: not-allowed;
  `}
`;

export const Wrap = styled.div`
  margin-bottom: 2rem;
`;
