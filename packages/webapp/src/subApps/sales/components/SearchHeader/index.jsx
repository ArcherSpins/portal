// @flow
import React from 'react';
import styled from 'styled-components';
import { Input, Button } from '@sfxdx/ui-kit';
import { Heading } from '../shared/styled';

import './style.scss';

const Title = styled(Heading)`
  margin-right: 20px;
`;

export type SearchHeaderProps = {
  searchValue: string,
  toggleSearchShow: () => void,
  changeSearch: (string | mixed) => void,
  search: boolean,
}

// eslint-disable-next-line import/prefer-default-export
export const SearchHeader = ({
  searchValue,
  toggleSearchShow,
  changeSearch,
  search,
}: SearchHeaderProps) => (
  <div className="header-search">
    <Title>Search</Title>
    <Input
      className="search-input not-focus"
      name="search-header"
      onChange={changeSearch}
      icon={<i className="icon-search" />}
      value={searchValue}
      placeholder="Search..."
    />
    <Button
      type="button"
      onClick={toggleSearchShow}
      className="filters"
      use="transparent"
    >
      {!search ? 'Show ' : 'Hide '}
      Filters
    </Button>
  </div>
);
