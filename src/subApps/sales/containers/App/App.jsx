import React from 'react';
import {
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import createBaseRoute from 'utils/createRouteNames';
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

const createRoute = createBaseRoute('sales');
const App = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <div className="page">
        <Content>
          <Switch>
            <Route exact path={createRoute('/')} component={CRMContainer} />
            <Route
              exact
              path={createRoute('/details/:id')}
              component={CRMDetailsContainer}
            />
            <Route
              exact
              path={createRoute('/details')}
              component={CRMDetailsContainer}
            />
            <Route
              exact
              path={createRoute('/search/:search?')}
              component={SearchDealContainer}
            />
          </Switch>
        </Content>
      </div>
    </ThemeProvider>
  </>

);

export default App;
