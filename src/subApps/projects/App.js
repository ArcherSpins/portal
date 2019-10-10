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

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div style={{ padding: '0 6rem 0 6rem' }}>
          <BackButton />
          <StyledBreadcrumbs />
          <Switch>
            <Route exath path="/userPicker" component={UserPicker} />
            <Route exact path="/create" component={CreateProjectPage} />
            <Route exact path="/:projectId" component={ProjectDetailsPage} />
          </Switch>
          <Route
            exact
            path="/:projectId/milestones"
            component={MilestonesPage}
          />
          <Route
            exact
            path="/:projectId/milestones/:milestoneId/tasks"
            component={TasksPage}
          />
          <Switch>
            <Route
              exact
              path="/:projectId/milestones/:milestoneId/tasks/create"
              component={TaskAdd}
            />
            <Route
              exact
              path="/:projectId/milestones/:milestoneId/tasks/:taskId"
              component={TaskDetails}
            />
          </Switch>
          <Route
            exact
            path="/:projectId/milestones/:milestoneId/tasks/:taskId/logs"
            component={LogHistory}
          />
          <Route
            exact
            path="/:projectId/milestones/:milestoneId/tasks/:taskId/logs/:logId"
            component={LogEditPage}
          />
          <Route
            exact
            path="/:projectId/milestones/:milestoneId/tasks/:taskId/logcreate"
            component={LogCreate}
          />
          <Switch>
            <Route
              exact
              path="/:projectId/milestones/create"
              component={MilestoneAddPage}
            />
            <Route
              exact
              path="/:projectId/milestones/:milestoneId"
              component={MilestoneDetailsPage}
            />
          </Switch>
          <Route exact path="/" component={Projects} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
