import styled from 'styled-components';


export const Container = styled.div`
  grid-area: content;
  height: 100%;
  padding-left: 0.7rem;
`;


export const Heading = styled.h1`
  font-family: 'Proxima Nova Black';
  color: ${(props) => props.theme.colors.black}
  font-size: 2rem;
  display: inline-block;
`;


export const Header = styled.div`
  padding-bottom: 1.3rem;
  grid-area: head;
`;
