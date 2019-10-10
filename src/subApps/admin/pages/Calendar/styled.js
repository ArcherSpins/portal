import styled from 'styled-components';

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-template-rows: repeat(3, 1fr);
  height: 100%;
`;

export const Div = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
`;
