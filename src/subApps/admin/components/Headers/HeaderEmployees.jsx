/* eslint-disable import/no-cycle */
// TODO: FIX THIS
// @flow

import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import { CREATE_EMPLOYEE_ROUTE } from 'subApps/admin/routes';
import { Input, Button } from 'ui-kit';
import { TitleAdminPanel } from '../styled';
import { Header, RightBlock } from './styled';

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
              />
            </form>
            <Link to={CREATE_EMPLOYEE_ROUTE.replace(':', '')}>
              <Button
                style={{ padding: '5px 10px', minHeight: `${31}px` }}
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
