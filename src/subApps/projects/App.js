import React from 'react';
import { Provider } from 'react-redux';
import './sass/main.scss';
import { Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import BackButton from './components/back-button/back-button.component';

import MilestoneDetailsPage from './pages/milestone-details-page/milestone-details-page.component';
import MilestoneAddPage from './pages/milestone-add-page/milestone-add-page.component';
import MilestonesPage from './pages/milestones-page/milestones-page.component';
import TaskDetails from './pages/task-details-page/task-details-page.component';
import StyledBreadcrumbs from './components/breadcrumbs/breadcrumbs.component';
import LogHistory from './pages/log-history-page/log-history-page.component';
import LogCreate from './pages/log-create-page/log-create-page.component';
import LogEditPage from './pages/log-edit-page/log-edit-page.component';
import TaskAdd from './pages/task-add-page/task-add-page.component';
import ProjectDetailsPage from './pages/project-details-page/project-details-page.component';
import TasksPage from './pages/tasks-page/tasks-page.component';
import CreateProjectPage from './pages/project-create-page/project-create-page.component';
import Projects from './pages/projects-page/projects-page.component';
import UserPicker from './components/user-picker/user-picker.component';

import * as routes from './routes';
import styles from './App.module.scss';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="projects__app">
          <StyledBreadcrumbs />
          <div className={styles.page}>
            <BackButton />
            <Switch>
              <Route exath path={routes.USER_PICKER_ROUTE} component={UserPicker} />
              <Route exact path={routes.CREATE_PROJECT_ROUTE} component={CreateProjectPage} />
              <Route exact path={routes.PROJECT_DETAILS_ROUTE} component={ProjectDetailsPage} />
            </Switch>
            <Route
              exact
              path={routes.MILESTONES_ROUTE}
              component={MilestonesPage}
            />
            <Route
              exact
              path={routes.TASKS_ROUTE}
              component={TasksPage}
            />
            <Switch>
              <Route
                exact
                path={routes.TASK_ADD_ROUTE}
                component={TaskAdd}
              />
              <Route
                exact
                path={routes.TASK_DETAILS_ROUTE}
                component={TaskDetails}
              />
            </Switch>
            <Switch>
              <Route
                exact
                path={routes.LOG_HISTORY_ROUTE}
                component={LogHistory}
              />
              <Route
                exact
                path={routes.LOG_CREATE_ROUTE}
                component={LogCreate}
              />
              <Route
                exact
                path={routes.LOG_EDIT_ROUTE}
                component={LogEditPage}
              />
            </Switch>
            <Switch>
              <Route
                exact
                path={routes.MILESTONE_ADD_ROUTE}
                component={MilestoneAddPage}
              />
              <Route
                exact
                path={routes.MILESTONE_DETAILS_ROUTE}
                component={MilestoneDetailsPage}
              />
            </Switch>
            <Route exact path={routes.ROOT} component={Projects} />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
