import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  containerWidth: '98%',
  colors: {
    lightGreen: '#DEF5D5',
    green: '#61B16F',
    black: '#303030',
    alert: '#DF160A',
    sidebarLinkHover: '#70B97D',
    lightGrey: '#bcbcbc',
    employeeProfile: '#818A95',
    employeeActive: '#F5F7FB',
    buttonHover: '#6FB87C',
    buttonBorder: '#61A06C',
    buttonGrey: '#DEE3EC',
    orange: '#FFBE3F',
  },
  containerOffset: {
    x: '1.4rem',
    y: '2.2rem',
  },
  employeeOffset: {
    x: '0.7rem',
  },
};

export const GlobalStyle = createGlobalStyle`
  /* other styles, if u want */
`;

export const AppWrap = styled.section`
  display: grid;
  grid-template-areas:"header header" 
                      "sidebar content";
  grid-template-columns: 1fr 6fr;
  grid-template-rows: min-content 1fr;
  height: 100vh;
  max-height: 100vh;
`;

export const Content = styled.div`
  height: 100%;
`;


export const HeaderCRM = styled.div`
  padding: 7px 10px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 2px solid #F0F0F0;
`;

export const TitleCRM = styled.p`
  color: #a5a3a3;
`;
