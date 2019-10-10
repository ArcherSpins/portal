// @flow

import React, { type Node } from 'react';
import { Link } from 'react-router-dom';
import { EMPLOYEES_ROUTE } from 'subApps/admin/routes';
import {
  GoBackButton,
  TransparentButton,
} from '..';
import { TitleAdminPanel } from '../styled';
import {
  Header,
  RightBlock,
  Subtitle,
  LeftBlock,
  ArrorIcon,
} from './styled';
// $FlowFixMe
import arrowIcon from '../../assets/icons/arrow-right.svg';

type HeaderProps = {
  goBack: () => void,
  deleteEmployee: (string | number) => void,
  title: string
}

const HeaderComponent = ({ goBack, deleteEmployee, title }: HeaderProps): Node => (
  <Header style={{ alignItems: 'flex-end' }}>
    <LeftBlock>
      <Subtitle>
        <Link to={EMPLOYEES_ROUTE}>
          employees
        </Link>
        <ArrorIcon src={arrowIcon} />
        employee
      </Subtitle>
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
          <TransparentButton
            onClick={deleteEmployee}
          >
            Delete employee
          </TransparentButton>
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
