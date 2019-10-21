/* eslint-disable import/prefer-default-export */
// TODO: FIX THIS
// @flow
import React from 'react';
import {
  LeftNavbar,
  HeaderEmployees,
  ListTable,
  AccessMapItem,
  AccessMapHeaderTable,
  Paginate,
} from '../../components';
import { PageContainer, ContainerContent } from '../styled';
import { Main } from './styled';

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
              <Paginate
                count={1}
                togglePaginate={this.togglePaginate}
              />
              <ListTable
                data={[
                  { name: 'Module Name', id: 1 },
                  { name: 'Module Name', id: 2 },
                ]}
                ItemComponent={AccessMapItem}
                Header={AccessMapHeaderTable}
              />
            </div>
          </Main>
        </ContainerContent>
      </PageContainer>
    );
  }
}

export { AccessMap };
