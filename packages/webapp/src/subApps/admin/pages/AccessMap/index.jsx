/* eslint-disable import/prefer-default-export */
// TODO: FIX THIS
// @flow
import React from 'react';
import TablePaginate from 'ui-kit/src/TablePaginate';
import {
  LeftNavbar,
  HeaderEmployees,
} from '../../components';
import { PageContainer, ContainerContent } from '../styled';
import { Main } from './styled';

export const columnsAccess = [
  {
    Header: 'Module',
    accessor: 'module_name',
  },
  {
    Header: 'Role name',
    accessor: 'role_name',
  },
  {
    Header: 'Role access',
    accessor: 'role_access',
  },
  {
    Header: 'Employee name',
    accessor: 'employee_name',
  },
];

type State = {
}

class AccessMap extends React.Component<State> {
  togglePaginate = () => {}

  render() {
    return (
      <PageContainer style={{ display: 'flex' }}>
        <LeftNavbar />
        <ContainerContent
          style={{
            marginLeft: `${220}px`,
          }}
        >
          <HeaderEmployees noSearch title="Access management" />
          <Main style={{ fontSize: `${14}px` }}>
            <div>
              <TablePaginate
                items={[
                  {
                    module_name: 'Module Name',
                    role_name: 'Role name',
                    role_access: 'Role access',
                    employee_name: 'John Doe Konstantinovich',
                    id: 1,
                  },
                ]}
                pageSize={10}
                getNumber={this.togglePaginate}
                columns={columnsAccess}
                activeIndex={1}
                count={1}
                manual
              />
            </div>
          </Main>
        </ContainerContent>
      </PageContainer>
    );
  }
}

export { AccessMap };
