import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import getRoute from '../../helpers/getRoute';
// TODO: FIX
// eslint-disable-next-line import/no-cycle
import {
  CRMContainer,
  CRMDetailsContainer,
  SearchDealContainer,
} from '..';
import { theme, GlobalStyle, Content } from './styled';
// import * as pages from '../../pages';
import '../../assets/fonts/style.css';
import './style.scss';

const App = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <div className="page">
        <Content>
          <Switch>
            <Route exact path={getRoute('/')} component={CRMContainer} />
            <Route
              exact
              path={getRoute('/details/:id')}
              component={CRMDetailsContainer}
            />
            <Route
              exact
              path={getRoute('/details')}
              component={CRMDetailsContainer}
            />
            <Route
              exact
              path={getRoute('/search/:search?')}
              component={SearchDealContainer}
            />
            <Redirect to={getRoute('/')} />
          </Switch>
        </Content>
      </div>
    </ThemeProvider>
  </>

);

export default App;
