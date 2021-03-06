// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Input, Button } from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import { Title, LeftTitleBlock } from './styled';
import getRoute from '../../helpers/getRoute';
// import SearchInput from '../../components/shared/Input/SearchInput';

const createTestAttr = createTestContext('deal');

type LeftBlockProps = {
  submitSearch: (SyntheticEvent<any>) => void,
  searchValue: string,
  onChange: (string | any) => void,
  redirect: boolean,
  className?: string
}

const LeftBlock = ({
  submitSearch, searchValue, onChange, redirect, className,
}: LeftBlockProps) => (
  <LeftTitleBlock className={className}>
    <form onSubmit={submitSearch}>
      <Title>Deals</Title>
      <Input
        icon={<i className="icon-search" />}
        value={searchValue}
        onChange={onChange}
        placeholder="Search"
        data-test={createTestAttr('search-input')}
      />
      <Button
        use="transparent"
        type="submit"
        className="search-button fz-16"
        data-test={createTestAttr('search-button')}
      >
        Search
      </Button>
    </form>
    {
      redirect ? (
        <Redirect to={getRoute(`/search/${searchValue}`)} />
      )
        : null
    }
  </LeftTitleBlock>
);

LeftBlock.defaultProps = {
  className: '',
};

// eslint-disable-next-line import/prefer-default-export
export { LeftBlock };
