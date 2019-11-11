/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  DetailsContent,
  HeaderDetails,
  ModalApproval,
} from '../../components';
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
  approveDeleteDeal,
}: CRMDetailsPageProps) => {
  const {
    activeUser,
    comments,
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
  } = props;

  const {
    editForm, edit, editTitle, titleText, redirectNewDeal, showModalErrorMessage, modalApproval,
  } = state;

  if (redirectNewDeal.redirect) {
    return <Redirect to={redirectNewDeal.url} />;
  }

  const { goBack } = history;
  return (
    <div className="details-page">
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
      <div className="content-page d-flex fz-14">
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
        <DetailsContent
          loading={loadingComments}
          deleteMessageCrm={deleteMessage}
          setMessage={setMessage}
          activeUser={activeUser}
          comments={comments}
          updateMessage={updateMessage}
        />
      </div>
    </div>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { CRMDetailsPage };
