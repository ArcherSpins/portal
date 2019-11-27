/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// @flow
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  DetailsContent,
  HeaderDetails,
  ModalApproval,
} from '../../components';
import { ModalNewTask } from '../../components/Modals';
import { DetailsListContainer } from '../../containers';
import './style.scss';
import type { CRMDetailsPageProps } from './type';

const CRMDetailsPage = ({
  props,
  state,
  activateFormEdit,
  closeEdit,
  deleteMessage,
  setMessage,
  updateMessage,
  toggleStatus,
  deleteContact,
  toggleActiveTitle,
  changeTitleText,
  fetchEditForm,
  setTitleComponent,
  toggleShowModal,
  toggleModalApproval,
  setDeleteDataDeal,
  toggleModalNewDeal,
  approveDeleteDeal,
}: CRMDetailsPageProps) => {
  const [isNewTask, toggleNewTask] = useState(true);
  const {
    activeUser,
    setActiveUser,
    statuses,
    loadingComments,
    contacts,
    channels,
    sources,
    managers,
    setErrorForm,
    errorsFormCreate,
    deleteErrorForm,
    history,
    fetchCreateDealTask,
    fetchUpdateDealTask,
    getCalendarData,
    logDeals,
    dealTypes,
  } = props;

  const {
    editForm,
    edit,
    editTitle,
    titleText,
    redirectNewDeal,
    showModalErrorMessage,
    modalApproval,
    isNewDeal,
    taskData,
  } = state;
  if (redirectNewDeal.redirect) {
    return <Redirect to={redirectNewDeal.url} />;
  }
  const { goBack } = history;
  return (
    <div className="details-page">
      <ModalNewTask
        getCalendarData={getCalendarData}
        isOpen={isNewDeal}
        isNewTask={isNewTask}
        dealTypes={dealTypes}
        titleDeal={activeUser.title}
        data={taskData}
        onClose={() => toggleModalNewDeal(false)}
        onUpdate={(id, resolveComment) => fetchUpdateDealTask({
          id,
          resolveComment,
        })}
        onCreate={(
          typeID: string, description: string, startDate: Date, endDate: Date,
        ) => fetchCreateDealTask({
          dealID: activeUser.id,
          typeID,
          description,
          startDate,
          endDate,
        })}
      />
      <div className="header-sales-content">
        <HeaderDetails
          goBack={goBack}
          title={activeUser.title}
          statuses={statuses}
          activeUser={activeUser}
          toggleStatus={toggleStatus}
          editTitle={editTitle}
          toggleActiveTitle={toggleActiveTitle}
          changeTitleText={changeTitleText}
          titleText={titleText}
          deleteDeal={setDeleteDataDeal}
          errorsFormCreate={errorsFormCreate}
          setTitleComponent={setTitleComponent}
        />
      </div>
      <div className="content-page container-sales-content d-flex fz-14">
        <ModalApproval
          isOpen={modalApproval}
          onCancel={() => toggleModalApproval(false)}
          onDelete={approveDeleteDeal}
        />
        <DetailsListContainer
          statuses={statuses}
          activateFormEdit={activateFormEdit}
          closeEdit={closeEdit}
          editForm={editForm}
          contacts={contacts}
          activeUser={activeUser}
          setActiveUser={setActiveUser}
          edit={edit}
          channels={channels}
          sources={sources}
          deleteContact={deleteContact}
          managers={managers}
          setErrorForm={setErrorForm}
          deleteErrorForm={deleteErrorForm}
          errorsFormCreate={errorsFormCreate}
          fetchEditForm={fetchEditForm}
          toggleShowModal={toggleShowModal}
          showModalErrorMessage={showModalErrorMessage}
        />
        {
          activeUser.id && (
            <div>
              <DetailsContent
                loading={loadingComments}
                deleteMessageCrm={deleteMessage}
                setMessage={setMessage}
                activeUser={activeUser}
                comments={logDeals}
                updateMessage={updateMessage}
                toggleNewTask={toggleNewTask}
                toggleModalNewDeal={toggleModalNewDeal}
                isNewDeal={isNewDeal}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { CRMDetailsPage };
