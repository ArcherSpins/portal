/* eslint-disable import/no-cycle */
// TODO: FIX THIS
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Header } from '..';
import { theme, GlobalStyle, Content } from './styled';
import * as pages from '../../pages';
import * as routes from '../../routes';
import '../../assets/fonts/style.css';
import './style.scss';

const App = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <div className="page">
        <Header />
        <Content>
          <Switch>
            <Route
              exact
              path={routes.SINGLE_EMPLOYEE_ROUTE}
              component={pages.Employee}
            />
            <Route
              exact
              path={routes.CREATE_EMPLOYEE_ROUTE}
              component={pages.Employee}
            />
            <Route
              exact
              path={routes.ACCESS_MAP_ROUTE}
              component={pages.AccessMap}
            />
            <Route
              exact
              path={routes.EMPLOYEES_SETTINGS_ROUTE}
              component={pages.Departments}
            />
            <Route
              exact
              path={routes.PROJECTS_SETTINGS_ROUTE}
              component={pages.SittingsProjectsModule}
            />
            <Route
              exact
              path={routes.CALENDAR_ROUTE}
              component={pages.CalendarPage}
            />
            <Route
              exact
              path={routes.EMPLOYEES_ROUTE}
              component={pages.Employees}
            />
            <Redirect to={routes.EMPLOYEES_ROUTE} />
          </Switch>
        </Content>
      </div>
    </ThemeProvider>
  </>

);

export default App;
