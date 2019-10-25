// TODO: FIX THIS
/* eslint-disable import/no-cycle */
// @flow
import React from 'react';
import {
  LeftNavbar,
  HeaderEmployees,
  ListTable,
  DepartmentsItem,
  DepartmentsHeaderTable,
  MessageFound,
} from '../../components';
import { LoadingContainer } from '../../containers';
import { PageContainer, ContainerContent } from '../styled';
import { Main } from './styled';
import type { Department } from '../../types';
import Hoc from './hoc';


const StyledList = (props) => (
  <ListTable {...props} style={{ maxWidth: '1600px' }} />
);

type DepartmentsProps = {
  requestAllDepartments: () => void,
  departments: Array<Department>,
  loading: boolean,
}

class DepartmentsComponent extends React.Component<DepartmentsProps> {
  componentDidMount() {
    const { requestAllDepartments } = this.props;
    requestAllDepartments();
  }

  render() {
    const {
      departments,
      loading,
    } = this.props;

    return (
      <PageContainer style={{ display: 'flex' }}>
        <LeftNavbar />
        <ContainerContent
          style={{
            marginLeft: `${220}px`,
          }}
        >
          {
            loading ? <LoadingContainer /> : (
              <div>
                <HeaderEmployees noBorder noSearch title="Departments" />
                <Main>
                  {
                    departments.length > 0 ? (
                      <div>
                        <StyledList
                          data={departments}
                          ItemComponent={DepartmentsItem}
                          Header={DepartmentsHeaderTable}
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

const Departments = Hoc(DepartmentsComponent);

// TODO: FIX THIS
// eslint-disable-next-line import/prefer-default-export
export { Departments };
