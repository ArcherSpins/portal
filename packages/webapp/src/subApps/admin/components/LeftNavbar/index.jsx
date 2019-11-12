// @flow
import React, { type Node } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ACCESS_MAP_ROUTE, CALENDAR_ROUTE,
  EMPLOYEES_ROUTE, EMPLOYEES_SETTINGS_ROUTE,
  PROJECTS_SETTINGS_ROUTE,
} from 'subApps/admin/routes';
import createTestContext from 'utils/createTestContext';
import {
  Container,
  Title,
  Item,
  List,
  LinkStyles,
} from './styled';
import './style.scss';


type ItemLinkProps = {
  to: string,
  children: Node,
  // active: boolean
}

const createTestAttr = createTestContext('sidebar');

export const ItemLink = ({
  to,
  children,
  ...props
  // active,
}: ItemLinkProps) => (
  <NavLink
    {...props}
    exact
    to={to}
    activeClassName="navbar-active-link"
    style={LinkStyles}
    activeStyle={{
      backgroundColor: '#509A5D',
    }}
  >
    {children}
  </NavLink>
);

export default () => (
  <Container>
    <Title>Admin Panel</Title>
    <List>
      <Item>
        <ItemLink
          data-test={createTestAttr('employees-link')}
          active
          to={EMPLOYEES_ROUTE}
        >
          Employees
        </ItemLink>
      </Item>
      <Item>
        <ItemLink data-test={createTestAttr('access-management-link')} to={ACCESS_MAP_ROUTE}>Access management</ItemLink>
      </Item>
      <Item>
        <ItemLink
          to={EMPLOYEES_SETTINGS_ROUTE}
          data-test={createTestAttr('settings-employees-link')}
        >
          Settings employees module
        </ItemLink>
      </Item>
      <Item>
        <ItemLink
          to={PROJECTS_SETTINGS_ROUTE}
          data-test={createTestAttr('settings-projects-link')}
        >
          Settings projects module
        </ItemLink>
      </Item>
      <Item>
        <ItemLink data-test={createTestAttr('calendar-link')} to={CALENDAR_ROUTE}>Calendar</ItemLink>
      </Item>
    </List>
  </Container>
);
