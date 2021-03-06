/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// @flow

import React from 'react';
import {
  SearchHeader,
  SearchItem,
  FilterBlock,
} from '../../components';
import type {
  StatusType,
  ManagerType,
  DealType,
  CalendarType,
} from '../../types';
import {
  LoadingContainer,
} from '../../containers';
import './style.scss';

type SearchDealPageProps = {
  state: {
    dataDeals: Array<DealType>,
    search: boolean,
    searchValue: string,
    filterObject: {
      deal: string,
      client: string,
      status: mixed,
      manager: mixed,
      start: string | null,
      end: string | null,
    },
    managers: Array<ManagerType>,
  },
  props: {
    statuses: Array<StatusType>,
    loadingDeals: boolean,
    loadingColumns: boolean,
    getCalendarData: (string, returnFunc?: (Array<CalendarType>) => void) => void
  },
  toggleSearchShow: () => void,
  changeSearch: (string | mixed) => void,
  onSubmitFilter: (any, any) => void,
  changeDate: (string) => void,
  changeFilter: (string, any) => void,
}

const SearchDealPage = ({
  state,
  props,
  toggleSearchShow,
  changeSearch,
  onSubmitFilter,
  changeDate,
  changeFilter,
}: SearchDealPageProps) => {
  const {
    dataDeals, search, searchValue, filterObject, managers,
  } = state;

  const typeProps: {
    statuses: Array<StatusType>,
    loadingDeals: boolean,
    loadingColumns: boolean,
    getCalendarData: (string, returnFunc?: (Array<CalendarType>) => void) => void
  } = props;

  const {
    statuses, loadingDeals, loadingColumns, getCalendarData,
  } = typeProps;

  return (
    <div className="search-deal-page fz-14">
      <SearchHeader
        toggleSearchShow={toggleSearchShow}
        search={search}
        searchValue={searchValue}
        changeSearch={changeSearch}
      />
      <main className="content scroll-block">
        {
          search ? (
            <FilterBlock
              statuses={statuses}
              onSubmitFilter={onSubmitFilter}
              changeDate={changeDate}
              managers={managers}
              endDate={filterObject.end}
              date={filterObject.start}
              changeFilter={changeFilter}
              filterObject={filterObject}
              idStatus="status"
              getCalendarData={getCalendarData}
              idManager="manager"
            />
          ) : null
        }
        {
          loadingDeals || loadingColumns ? (
            <LoadingContainer />
          ) : (
            <ul>
              {
                dataDeals.length > 0
                  ? dataDeals.map((item, i) => (
                    <SearchItem
                      key={item.id || i}
                      path={`/details/${item.title.replace(/\s/g, '_')}`}
                      {...item}
                    />
                  ))
                  : <div>Not found!</div>
              }
            </ul>
          )
        }
      </main>
    </div>
  );
};

export default SearchDealPage;
