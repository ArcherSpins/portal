// @flow

import React, { type Node } from 'react';
import { EMPLOYEES_ROUTE, SINGLE_EMPLOYEE_ROUTE } from 'subApps/admin/routes';
import { Button, Breadcrumbs } from 'ui-kit';
import {
  GoBackButton,
} from '..';
import { TitleAdminPanel } from '../styled';
import {
  Header,
  RightBlock,
  LeftBlock,
} from './styled';

type HeaderProps = {
  goBack: () => void,
  deleteEmployee: (string | number) => void,
  title: string
}

const routes = {
  [EMPLOYEES_ROUTE]: 'Employees',
  [SINGLE_EMPLOYEE_ROUTE]: 'Employee',
};

const HeaderComponent = ({ goBack, deleteEmployee, title }: HeaderProps): Node => (
  <Header style={{ alignItems: 'flex-end' }}>
    <LeftBlock>
      <Breadcrumbs
        routes={routes}
      />
      <TitleAdminPanel style={{ position: 'relative' }}>
        <GoBackButton
          className="go-back-button"
          onClick={goBack}
        />
        {title || 'Employee Name'}
      </TitleAdminPanel>
    </LeftBlock>
    <RightBlock>
      {
        deleteEmployee && (
          <Button className="delete-deal-button" use="transparent" onClick={deleteEmployee}>
            Delete employee
          </Button>
        )
      }
    </RightBlock>
  </Header>
);

Header.defaultProps = {
  goBack: () => {},
  deleteEmployee: () => {},
};

export default HeaderComponent;
