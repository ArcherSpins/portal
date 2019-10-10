import styled from 'styled-components';

export const Container = styled.div`
  background-color: #61B16F;
  padding: 10px 10px 20px 0px;
  width: 220px;
  height: 100%;
  position: fixed;
  z-index: 20;
`;

export const Title = styled.h3`
  color: white;
  font-family: Proxima Nova;
  font-size: 20px;
  line-height: 20px;
  padding: 8px;
`;

export const Item = styled.li`
`;

export const List = styled.ul`
  list-style-type: none;
`;

export const LinkStyles = {
  color: 'white',
  textDecoration: 'none',
  fontFamily: 'Proxima Nova',
  fontSize: 14,
  paddingTop: 7,
  paddingBottom: 7,
  paddingLeft: 8,
  display: 'block',
};
