// @flow

import React, { type Node } from 'react';
import {
  EMPLOYEES_ROUTE,
  SINGLE_EMPLOYEE_ROUTE,
  CREATE_EMPLOYEE_ROUTE,
} from 'subApps/admin/routes';
import { Button, Breadcrumbs, H1 } from '@sfxdx/ui-kit';
import {
  GoBackButton,
} from '..';
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

const HeaderComponent = ({ goBack, deleteEmployee, title }: HeaderProps): Node => {
  const routes = {
    '/admin': null,
    [EMPLOYEES_ROUTE]: 'Employees',
    [SINGLE_EMPLOYEE_ROUTE]: title,
    [CREATE_EMPLOYEE_ROUTE]: 'Add New Employee',
    '/admin/create': 'Employees',
  };
  return (
    <Header style={{ alignItems: 'flex-end', marginTop: 10 }}>
      <LeftBlock>
        <Breadcrumbs
          routes={routes}
        />
        <H1 style={{ position: 'relative', color: '#333333' }}>
          <GoBackButton
            className="go-back-button"
            onClick={goBack}
          />
          {title || 'Employee Name'}
        </H1>
      </LeftBlock>
      <RightBlock>
        {
          deleteEmployee && (
            <Button use="transparent" onClick={deleteEmployee}>
              Delete employee
            </Button>
          )
        }
      </RightBlock>
    </Header>
  );
};

Header.defaultProps = {
  goBack: () => {},
  deleteEmployee: () => {},
};

export default HeaderComponent;
