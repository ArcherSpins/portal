// @flow
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Button, LinkButton } from '@sfxdx/ui-kit';

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
          <Button
            type="button"
            onClick={() => toggleShowSelfDeals(false)}
            className={`left-button ${!state.tabStatus ? 'active' : ''}`}
            data-test={createTestAttr('my-deals-button')}
          >
            My Deals
          </Button>
          <Button
            type="button"
            onClick={() => toggleShowSelfDeals(true)}
            className={`right-button ${state.tabStatus ? 'active' : ''}`}
            data-test={createTestAttr('all-deals-button')}
          >
            All Deals
          </Button>
        </div>
        <div className="d-flex justify-content-end">
          <LinkButton data-test={createTestAttr('add-deals-button')} to={getRoute('/details')}>
            Add deal
          </LinkButton>
        </div>
      </Header>
      <HeaderCRMList />
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
    </>
  );
};

export default CRMPage;