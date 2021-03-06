/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// TODO: FIX ESLINT SUPPRESS COMMENTS
// @flow
import React, { type AbstractComponent } from 'react';
import { connect } from 'react-redux';
// import { compose } from 'redux';
import moment from 'moment';
import { SearchDealPage } from '../../pages';
import {
  getDealsAction,
  getColumnsDataAction,
  getEmployeesAction,
  getCalendarData,
} from '../../redux/actions';
import type { DealType } from '../../types';
import type {
  SearchDealContainerProps,
  SearchDealContainerState,
  EmployeesArrayType,
} from './type';

class SearchDealContainer extends React.Component<
  SearchDealContainerProps,
  SearchDealContainerState
> {
  constructor(props: SearchDealContainerProps) {
    super(props);
    this.state = {
      searchValue: '',
      dataDeals: [],
      search: false,
      data: [],
      filterDeals: [],
      filterObject: {
        deal: '',
        client: '',
        status: null,
        manager: null,
        start: null,
        end: null,
      },
      managers: [],
    };
  }

  componentDidMount = () => {
    this.getData();
  }

  getData = (): void => {
    const {
      getColumnsData, getDeals, match,
    } = this.props;
    const searchText = match.params.search;
    getColumnsData(() => {});
    getDeals(
      this.getDeals,
      {
        title: searchText,
      },
    );
    this.getManagers();
  }

  getDeals = (array: Array<DealType>) => {
    const { match } = this.props;
    const searchText = match.params.search;
    if (searchText) {
      this.setState({
        dataDeals: array,
        data: array,
        filterDeals: array,
        searchValue: searchText,
      });
    } else {
      this.setState({
        dataDeals: array,
        data: array,
        filterDeals: array,
      });
    }
  }

  getManagers = (): void => {
    const { getEmployees } = this.props;
    getEmployees('', this.setManagers);
  }

  setManagers = (employees: EmployeesArrayType): void => {
    this.setState({
      managers: [
        { name: 'Not select', id: null },
        ...employees,
      ],
    });
  }

  toggleSearchShow = (): void => {
    const { search, data } = this.state;
    this.setState({
      search: !search,
      filterDeals: data,
    });
  }

  changeSearch = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      data, filterDeals, filterObject, search,
    } = this.state;
    const { getDeals } = this.props;
    const searchText = e.target.value;

    getDeals(
      this.setFilteredDeals,
      {
        stageID: filterObject.status ? filterObject.status.id : null,
        managerID: filterObject.manager ? filterObject.manager.id : null,
        client: filterObject.client,
        title: searchText,
        createdBefore:
          filterObject.end ? this.toUtc(filterObject.end) : null,
        createdAfter:
          filterObject.start ? this.toUtc(filterObject.start) : null,
      },
    );

    if (search) {
      this.setState({
        dataDeals:
          filterDeals.filter((item) => item.title.toLowerCase()
            .indexOf(searchText.toLowerCase()) !== -1),
        searchValue: searchText,
      });
    } else {
      this.setState({
        dataDeals:
          data.filter((item) => item.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1),
        searchValue: searchText,
      });
    }
  }

  changeFilter = (id: string, value: mixed) => {
    const { filterObject } = this.state;
    this.setState({
      filterObject: {
        ...filterObject,
        [id]: value,
      },
    });
  }

  setFilteredDeals = (deals: Array<DealType>): void => {
    this.setState({
      dataDeals: deals,
      filterDeals: deals,
    });
  }

  toUtc = (date) => moment(date.valueOf()).utc()
    .add(moment().utcOffset(), 'minutes')
    .toISOString();

  onSubmitFilter = () => {
    const { filterObject } = this.state;
    const { getDeals } = this.props;

    getDeals(
      this.setFilteredDeals,
      {
        stageID: filterObject.status ? filterObject.status.id : null,
        managerID: filterObject.manager ? filterObject.manager.id : null,
        client: filterObject.client,
        title: filterObject.deal,
        createdBefore:
          filterObject.end ? this.toUtc(filterObject.end) : null,
        createdAfter:
          filterObject.start ? this.toUtc(filterObject.start) : null,
      },
    );
  };

  render() {
    return (
      <SearchDealPage {...this} />
    );
  }
}

const mapStateToProps = (state) => ({
  loadingColumns: state.column.loadingColumns,
  statuses: state.column.columnsData,
  cards: state.deals.deals,
  loadingDeals: state.deals.loadingDeals,
});

const mapDispatchToProps = {
  getColumnsData: getColumnsDataAction,
  getDeals: getDealsAction,
  getEmployees: getEmployeesAction,
  getCalendarData,
};

export default (
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchDealContainer): AbstractComponent<SearchDealContainerProps>
);

// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
// )(SearchDealContainer);
