/* eslint-disable import/prefer-default-export */
// TODO: FIX THIS
// @flow
import React from 'react';
import TablePaginate from 'ui-kit/TablePaginate';
import {
  LeftNavbar,
  HeaderEmployees,
} from '../../components';
import { PageContainer, ContainerContent } from '../styled';
import { Main } from './styled';

export const columnsAccess = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Name',
    accessor: 'name',
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
                  { name: 'Module Name', id: 1 },
                  { name: 'Module Name', id: 2 },
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
