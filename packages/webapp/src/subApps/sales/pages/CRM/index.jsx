// @flow
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { LinkButton, Switcher } from '@sfxdx/ui-kit';

import createTestContext from 'utils/createTestContext';
import getRoute from '../../helpers/getRoute';
import { Header, Content } from './styled';
// TODO: Fix this
// eslint-disable-next-line import/no-cycle
import {
  CardCRM,
  HeaderCRMList,
  BlockListCRM,
  ModalMessage,
} from '../../components';
import LoadingContainer from '../../containers/Loading';
import { LeftBlock } from './ComponentsPage';
import type { CrmPageProps } from './type';
import './style.scss';

const createTestAttr = createTestContext('crm');

const CRMPage = ({
  props,
  state,
  submitSearch,
  toggleSearchValue,
  onDragEnd,
  toggleShowTab,
  closeModal,
  setSefColumn,
  getDealsFilter,
  toggleModalShow,
  loading,
}: CrmPageProps) => {
  const {
    dealsData,
    columnOrder,
    columns,
    activeManager,
  } = props;
  const { modalInfo } = state;

  const toggleShowSelfDeals = (status: boolean) => {
    toggleShowTab(status);
    const limit = !state.tabStatus ? '30' : '20';
    const propsDeals = !state.tabStatus ? { limit } : { limit, managerID: activeManager.id };
    getDealsFilter(propsDeals);
  };
  console.log(dealsData);
  return (
    <>
      <ModalMessage
        message={modalInfo.message}
        statusError
        animate="right"
        toggleModal={toggleModalShow}
        show={modalInfo.show}
      />
      <Header>
        <LeftBlock
          className="search-container_crm"
          submitSearch={submitSearch}
          searchValue={state.searchValue}
          onChange={toggleSearchValue}
          redirect={state.redirect}
        />
        <div className="tab-buttons fz-16">
          <Switcher
            items={['My Deals', 'All Deals']}
            value={!state.tabStatus ? 'My Deals' : 'All Deals'}
            data-test={createTestAttr('deals-button')}
            onChange={(item) => toggleShowSelfDeals(item !== 'My Deals')}
          />
        </div>
        <div className="d-flex justify-content-end">
          <LinkButton data-test={createTestAttr('add-deals-button')} to={getRoute('/details')}>
            Add deal
          </LinkButton>
        </div>
      </Header>
      <HeaderCRMList />
      {
        loading ? <LoadingContainer style={{ paddingBottom: 100 }} /> : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Content>
              {
                Array.isArray(columnOrder) && columnOrder.map((columnId, i) => {
                  // $FlowFixMe
                  const column = columns[columnId];
                  const tasks = column.taskIds.map((taskId) => dealsData[taskId]);
                  return (
                    <BlockListCRM
                      closeCreateCrm={closeModal}
                      Component={CardCRM}
                      tasks={tasks}
                      allStatus={state.tabStatus}
                      className={i >= 1 ? 'border-left' : null}
                      id={columnId}
                      key={String(columnId) || i}
                      index={column.index}
                      setSefColumn={setSefColumn}
                    />
                  );
                })
              }
            </Content>
          </DragDropContext>
        )
      }
    </>
  );
};

export default CRMPage;
