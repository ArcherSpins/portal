// @flow
import React from 'react';
import {
  SidebarWrap,
  SidebarHead,
  SidebarNav,
  SidebarNavItem,
  SidebarNavInnerItem,
} from './styled';

const Sidebar = () => (
  <SidebarWrap>
    <SidebarHead>Admin Panel</SidebarHead>
    <SidebarNav>
      <SidebarNavItem
        activeStyle={{ background: '#509A5D' }}
        to="/employees"
      >
        Employees
      </SidebarNavItem>
      <SidebarNavItem
        activeStyle={{ background: '#509A5D' }}
        to="/departments"
      >
        Departments
      </SidebarNavItem>
      <SidebarNavItem
        activeStyle={{ background: '#509A5D' }}
        to="/sales"
      >
        Sales
      </SidebarNavItem>
      <SidebarNavItem
        activeStyle={{ background: '#509A5D' }}
        to="/planned-resources"
      >
        Planned Resources
      </SidebarNavItem>
      <SidebarNavItem
        activeStyle={{ background: '#509A5D' }}
        to="/calendar"
      >
        Calendar
      </SidebarNavItem>
      <SidebarNavItem activeStyle={{ background: '#509A5D' }} to="/plugins">
        Plugins
      </SidebarNavItem>
      <SidebarNavInnerItem
        activeStyle={{ background: '#509A5D' }}
        to="/plugins/plugin_1"
      >
        Plugin 1
      </SidebarNavInnerItem>
      <SidebarNavInnerItem
        activeStyle={{ background: '#509A5D' }}
        to="/plugins/plugin_2"
      >
        Plugin 2
      </SidebarNavInnerItem>
      <SidebarNavInnerItem
        activeStyle={{ background: '#509A5D' }}
        to="/plugins/plugin_3"
      >
        Plugin 3
      </SidebarNavInnerItem>
    </SidebarNav>
  </SidebarWrap>
);

export default Sidebar;
