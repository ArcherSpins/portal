// @flow
import React, { type Node } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ACCESS_MAP_ROUTE, CALENDAR_ROUTE,
  EMPLOYEES_ROUTE, EMPLOYEES_SETTINGS_ROUTE,
  PROJECTS_SETTINGS_ROUTE,
} from 'subApps/admin/routes';
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

export const ItemLink = ({
  to,
  children,
  // active,
}: ItemLinkProps) => (
  <NavLink
    exact
    to={to}
    activeClassName="active-link"
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
        <ItemLink active to={EMPLOYEES_ROUTE}>Employees</ItemLink>
      </Item>
      <Item>
        <ItemLink to={ACCESS_MAP_ROUTE}>Access management</ItemLink>
      </Item>
      <Item>
        <ItemLink
          to={EMPLOYEES_SETTINGS_ROUTE}
        >
          Settings employees module
        </ItemLink>
      </Item>
      <Item>
        <ItemLink
          to={PROJECTS_SETTINGS_ROUTE}
        >
          Settings projects module
        </ItemLink>
      </Item>
      <Item>
        <ItemLink to={CALENDAR_ROUTE}>Calendar</ItemLink>
      </Item>
    </List>
  </Container>
);
