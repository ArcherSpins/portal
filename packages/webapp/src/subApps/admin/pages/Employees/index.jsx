/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
// TODO: FIX
// @flow
import React from 'react';
import { TablePaginate } from '@sfxdx/ui-kit';
import history from 'utils/history';
import { EMPLOYEES_ROUTE } from '../../routes';
import {
  LeftNavbar,
  HeaderEmployees,
  MessageFound,
  // AlertMessage,
} from '../../components';
import { LoadingContainer } from '../../containers';
import { PageContainer, ContainerContent } from '../styled';
import { Main } from './styled';
import type {
  Employees as EmployeesType,
} from '../../types';
import Hoc from './hoc';

export const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Department',
    accessor: 'department',
  },
  {
    Header: 'Position',
    accessor: 'position',
  },
  {
    Header: 'Location',
    accessor: 'location',
  },
];

type EmployeesProps = {
  employees: Array<EmployeesType>,
  loadingEmployees: boolean,
  loadingUser: boolean,
  requestEmployees: (params?: {
    search?: string,
    offset?: string,
    limit?: string
  }) => void,
  count: number,
}

type EmployeesState = {
   activePaginate: number,
   search: string,
   requested: boolean
}

const PAGE_SIZE = 25;

class EmployeesComponent extends React.Component<EmployeesProps, EmployeesState> {
  constructor(props) {
    super(props);
    this.state = {
      activePaginate: 0,
      search: '',
      requested: false,
    };
  }


  componentDidMount(): void {
    this._getEmployees();
  }

  _getEmployees = () => {
    const { requestEmployees } = this.props;
    requestEmployees({
      offset: '0',
      limit: PAGE_SIZE.toString(),
    });
  }

  onSearch = (): void => {
    const { requestEmployees } = this.props;
    const { search } = this.state;
    requestEmployees({
      search,
      offset: '0',
      limit: PAGE_SIZE.toString(),
    });
    this.setState({ requested: true });
  }

  onChange = (text: string) => {
    this.setState({ search: text });
  }

  togglePaginate = (idx: number) => {
    const { requestEmployees } = this.props;
    this.setState({ activePaginate: idx });

    const index = ((idx - 2) + PAGE_SIZE).toString();
    requestEmployees({
      offset: (idx - 1) > 0 ? index : '0',
      limit: PAGE_SIZE.toString(),
    });
  }

  clearSearchBar = () => {
    const { requested } = this.state;
    this.setState({ search: '' });
    if (requested) {
      this._getEmployees();
      this.setState({ requested: false });
    }
  }

  render() {
    const {
      loadingEmployees,
      loadingUser,
      employees,
      count,
    } = this.props;
    const { activePaginate, search } = this.state;
    return (
      <PageContainer style={{ display: 'flex' }}>
        <LeftNavbar />
        <ContainerContent
          style={{
            marginLeft: `${220}px`,
          }}
        >
          {
            loadingUser || loadingEmployees ? <LoadingContainer /> : (
              <div>
                <HeaderEmployees
                  search={search}
                  onSearch={this.onSearch}
                  onChange={this.onChange}
                  onClear={this.clearSearchBar}
                />
                <Main>
                  <div>
                    <TablePaginate
                      items={employees.map((item) => ({
                        url: `${EMPLOYEES_ROUTE}/${item.id}`,
                        name: item.name,
                        department: item.department ? item.department.title : 'Not department',
                        position: item.position ? item.position.title : 'Not position',
                        location: `${(item.city.name || 'Not city, ')} ${(item.city.country || 'not country')}`,
                      }))}
                      pageSize={PAGE_SIZE}
                      getNumber={this.togglePaginate}
                      columns={columns}
                      activeIndex={activePaginate}
                      count={Math.ceil(count / PAGE_SIZE)}
                      history={history}
                      manual
                      data-test="employees__table"
                    />
                  </div>
                  {
                    employees.length === 0 && <MessageFound />
                  }
                </Main>
              </div>
            )
          }
        </ContainerContent>
      </PageContainer>
    );
  }
}

const Employees = Hoc(EmployeesComponent);

// TODO: FIX THIS
// eslint-disable-next-line import/prefer-default-export
export { Employees };
