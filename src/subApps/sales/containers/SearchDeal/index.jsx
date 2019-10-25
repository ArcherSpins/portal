/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// TODO: FIX ESLINT SUPPRESS COMMENTS
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { SearchDealPage } from '../../pages';
import {
  getDealsAction,
  getColumnsDataAction,
  getEmployeesAction,
} from '../../redux/actions';
import { LoadingContainer } from '../index';
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
      getColumnsData, getDeals,
    } = this.props;
    getColumnsData(() => {});
    getDeals(this.getDeals);
    this.getManagers();
  }

  getDeals = (array: Array<DealType>) => {
    const { match } = this.props;
    const searchText = match.params.search;
    if (searchText) {
      this.setState({
        dataDeals:
          array.filter((item) => item.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1),
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
    const { data, filterDeals, search } = this.state;
    const searchText = e.target.value;

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

  onSubmitFilter = () => {
    const { filterObject } = this.state;
    const { getDeals } = this.props;
    const toUtc = (date) => moment(date.valueOf()).utc()
      .add(moment().utcOffset(), 'minutes')
      .toISOString();

    getDeals(
      this.setFilteredDeals,
      {
        stageID: filterObject.status ? filterObject.status.id : null,
        managerID: filterObject.manager ? filterObject.manager.id : null,
        client: filterObject.client,
        title: filterObject.deal,
        createdBefore:
          filterObject.end ? toUtc(filterObject.end) : null,
        createdAfter:
          filterObject.start ? toUtc(filterObject.start) : null,
      },
    );
  };

  render() {
    const { loadingDeals, loadingColumns } = this.props;
    if (loadingDeals || loadingColumns) {
      return <LoadingContainer />;
    }

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
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(SearchDealContainer);
