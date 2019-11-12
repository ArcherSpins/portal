/* eslint-disable import/no-cycle */
// TODO: FIX THIS
// @flow

import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import { CREATE_EMPLOYEE_ROUTE } from 'subApps/admin/routes';
import { Input, Button } from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import { TitleAdminPanel } from '../styled';
import { Header, RightBlock } from './styled';

const createTestAttr = createTestContext('header-employees');

type HeaderProps = {
  title: string,
  noSearch: boolean | null,
  noBorder: boolean,
  style: {
    [string]: string | number
  },
  styleTitle: {
    [string]: string | number
  },
  onSearch: () => void,
  search: string,
  onChange: (string) => void,
  onClear: () => void
}

export default ({
  title,
  noSearch,
  noBorder,
  search,
  style,
  onSearch,
  styleTitle,
  onChange,
  onClear,
}: HeaderProps): Node => {
  const onSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Header style={style} noBorder={noBorder}>
      <TitleAdminPanel
        style={styleTitle}
      >
        {title || 'Employees'}
      </TitleAdminPanel>
      {
        !noSearch && (
          <RightBlock>
            <form style={{ marginRight: 20 }} onSubmit={onSubmit}>
              <Input
                className="search-employees"
                name="search-employees"
                onChange={(e: SyntheticEvent<HTMLInputElement>) => {
                  // $FlowFixMe
                  onChange(String(e.target.value));
                }}
                icon={<i className="icon-search" />}
                onClearClick={onClear}
                value={search}
                placeholder="Search..."
                clearable
                data-test={createTestAttr('search-input')}
              />
            </form>
            <Link to={CREATE_EMPLOYEE_ROUTE.replace(':', '')}>
              <Button
                style={{ padding: '5px 15px', minHeight: '31px' }}
                data-test={createTestAttr('add-button')}
              >
                Add employee
              </Button>
            </Link>
          </RightBlock>
        )
      }
    </Header>
  );
};
