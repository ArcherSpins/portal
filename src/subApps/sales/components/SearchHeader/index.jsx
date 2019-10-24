// @flow
import React from 'react';
import styled from 'styled-components';
import { Input } from 'ui-kit';
// import SearchInput from '../shared/Input/SearchInput';
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
    {/* <SearchInput
      value={searchValue}
      onChange={changeSearch}
      className="search-input not-focus"
      placeholder=""
    /> */}
    <button
      type="button"
      onClick={toggleSearchShow}
      className={`fz-14 filters ${search ? 'none' : ''}`}
    >
      {!search ? 'Show ' : 'Hide '}
      Filters
      <svg
        style={{ marginLeft: '5px' }}
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.22491 4.75L0.949269 1H0.494141V0H8.68645V1H8.23132L5.95568 4.75V9H3.22491V4.75ZM2.0434 1L4.13517 4.447V8H5.04542V4.447L7.13719 1H2.0434Z"
          fill={`${search ? '#333' : 'white'}`}
        />
      </svg>
    </button>
  </div>
);
