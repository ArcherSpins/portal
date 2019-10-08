// @flow
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
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

const CRMPage = ({
  props,
  state,
  submitSearch,
  toggleSearchValue,
  onDragEnd,
  toggleShowTab,
  closeModal,
  setSefColumn,
  toggleModalShow,
}: CrmPageProps) => {
  const {
    dealsData,
    columnOrder,
    columns,
  } = props;
  const { modalInfo } = state;

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
          submitSearch={submitSearch}
          searchValue={state.searchValue}
          onChange={toggleSearchValue}
          redirect={state.redirect}
        />
        <div className="tab-buttons fz-16">
          <button
            type="button"
            onClick={() => toggleShowTab(false)}
            className={`left-button ${!state.tabStatus ? 'active' : ''}`}
          >
            My Deals
          </button>
          <button
            type="button"
            onClick={() => toggleShowTab(true)}
            className={`right-button ${state.tabStatus ? 'active' : ''}`}
          >
            All Deals
          </button>
        </div>
        <div>
          <Link to="/crm/details" className="add-deal-button">
            Add deal
          </Link>
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
