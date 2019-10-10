/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
// TODO: FIX
// @flow
import React from 'react';
import {
  LeftNavbar,
  HeaderEmployees,
  ListTable,
  EmployeeItem,
  EmployeesHeaderTable,
  MessageFound,
  AlertMessage,
} from '../../components';
import { Paginate } from '../../components/Paginate';
import { LoadingContainer } from '../../containers';
import { PageContainer, ContainerContent } from '../styled';
import { Main } from './styled';
import type {
  Employees as EmployeesType,
} from '../../types';
import Hoc from './hoc';

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
  closeErrorMessage: () => void,
  errorStatus: boolean,
  errorMessage: string,
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
    // $FlowFixMe
    requestEmployees({
      offset: idx > 0 ? ((idx) + PAGE_SIZE).toString() : '0',
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
      errorStatus,
      errorMessage,
      closeErrorMessage,
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
            errorStatus && (
              <AlertMessage
                error
                message={errorMessage}
                closeModal={closeErrorMessage}
              />
            )
          }
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
                  {
                    employees.length > 0 ? (
                      <div>
                        <Paginate
                          activeNum={activePaginate}
                          count={count / PAGE_SIZE}
                          togglePaginate={this.togglePaginate}
                        />
                        <ListTable
                          data={employees}
                          ItemComponent={EmployeeItem}
                          Header={EmployeesHeaderTable}
                        />
                      </div>
                    ) : <MessageFound />
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
