// TODO: REMOVE THIS COMMENTS AND FIX
/* eslint-disable guard-for-in */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */

// @flow
import React, { type AbstractComponent } from 'react';
import { withRouter } from 'react-router-dom';
import {
  ErrorBoundry,
} from '../../components';
import { LoadingContainer } from '..';
import { CRMDetailsPage } from '../../pages';
import CrmDetailsHoc from './CrmDetailsHoc';
import type { PropsCrmDetails, State } from './type';
import type {
  ManagerType,
  DealType,
  ParameterType,
  ContactType,
  DealTask,
} from '../../types';
import { initialState } from './state';

class CRMDetailsContainer extends React.PureComponent<PropsCrmDetails, State> {
  titleComponent: ?HTMLElement;

  constructor() {
    super();
    this.state = initialState;
    this.titleComponent = null;
  }

  componentDidMount = () => {
    const { logDeals, dealTasks } = this.props;
    this.getData();
  }

  componentWillUnmount() {
    const { errorsFormCreate, deleteErrorForm } = this.props;
    Object.keys(errorsFormCreate).forEach((key) => deleteErrorForm(key));
  }

  toggleModalApproval = (status: boolean) => {
    this.setState({ modalApproval: status });
  }

  setDeleteDataDeal = (data: { id: string }) => {
    this.setState({
      dataDealForDelete: data,
      modalApproval: true,
    });
  }

  approveDeleteDeal = () => {
    const { fetchDeleteDealAction } = this.props;
    const { dataDealForDelete } = this.state;
    fetchDeleteDealAction(dataDealForDelete);
  }

  toggleShowModal = (status: boolean) => {
    this.setState({
      showModalErrorMessage: status,
    });
  }

  setTitleComponent = (el: HTMLElement) => {
    if (el) {
      this.titleComponent = el;
    }
  }

  changeTitleText = (value: string) => {
    this.setState({
      titleText: value,
    });
  }

  getActiveManager = () => {
    const {
      fetchSelfInfoAction,
    } = this.props;
    fetchSelfInfoAction();
  }

  setActiveManager = (employees: Array<ManagerType>): void => {
    const {
      activeUser,
      setActiveManagerAction,
    } = this.props;
    if (activeUser.id) {
      const active = employees.find((item) => item.id === activeUser.manager.id) || {};
      setActiveManagerAction(active || employees[0]);
    } else setActiveManagerAction(employees[0]);
  }

  getManagers = (search?: string) => {
    const {
      getEmployeesAction,
    } = this.props;
    getEmployeesAction({ search }, this.setActiveManager);
  }

  getStatuses = (): void => {
    const { getColumnsDataAction } = this.props;
    getColumnsDataAction();
  }

  getChannels = (): void => {
    const { fetchChannelsAction } = this.props;
    fetchChannelsAction();
  }

  getColumns = (): void => {
    const { getColumnsDataAction } = this.props;
    getColumnsDataAction();
  }

  getSources = (): void => {
    const { fetchSourcesAction } = this.props;
    fetchSourcesAction();
  }

  setActiveDeal = (data: Array<DealType>, id: string): void => {
    const {
      setActiveUser,
      setContactsDeal,
      fetchDealParametersAction,
      fetchDealTypesRequest,
      fetchDealTypeIdRequest,
      fetchDealTasksRequest,
      fetchDealLogs,
    } = this.props;
    const activeDeal = data.find((item) => item.title === id);
    if (activeDeal) {
      fetchDealTypesRequest();
      setContactsDeal(activeDeal.customFields);
      setActiveUser(activeDeal);
      fetchDealTypeIdRequest(activeDeal.id);
      fetchDealTasksRequest(activeDeal.id);
      fetchDealLogs({ dealID: activeDeal.id });

      fetchDealParametersAction((parameters: Array<ParameterType>) => {
        this.setState({
          title: activeDeal.title,
          titleText: activeDeal.title,
          parameters,
        });
      });

      this.getManagers();
    }
  }

  getFullData = (title) => {
    const {
      getDealsAction,
    } = this.props;
    this.getColumns();
    this.getSources();
    getDealsAction((data: Array<DealType>) => {
      this.setActiveDeal(data, title);
    }, { limit: '30', title });
    this.getStatuses();
    this.getChannels();
  }

  getData = () => {
    const {
      match,
    } = this.props;
    const { id } = match.params;
    if (id) {
      this.getFullData(id.replace(/_/g, ' ').replace('&', '/'));
    } else if (!id) {
      this.setCreateDeal();
    }
  }

  setCreatedDealFunction = (
    parameters: Array<ParameterType>,
    newEditForm: {
      client: boolean,
      sales: boolean,
      contact: boolean,
      channel: boolean,
      source: boolean,
      status: boolean,
      propSource: boolean,
    },
  ) => {
    this.setState({
      edit: true,
      editForm: newEditForm,
      editTitle: true,
      parameters,
    });
  }

  setCreateDeal = () => {
    const {
      startCreateNewDeal,
      fetchDealParametersAction,
      activeUser,
    } = this.props;
    const { editForm } = this.state;
    this.getStatuses();
    this.getSources();
    this.getChannels();
    this.getColumns();
    startCreateNewDeal();
    this.getActiveManager();
    this.getManagers();

    const newEditForm = { ...editForm };
    newEditForm.propSource = activeUser.stage.title.toLowerCase() !== 'declined';
    // TODO: REMOVE THIS AND FIX
    // eslint-disable-next-line no-restricted-syntax
    for (const i in newEditForm) {
      newEditForm[i] = true;
    }

    fetchDealParametersAction((parameters: Array<ParameterType>) => {
      this.setCreatedDealFunction(parameters, newEditForm);
    });
  }

  submitEditForm = (data: DealType): void => {
    const { editTask, activeUser } = this.props;
    if (activeUser.id) {
      editTask(activeUser.id, data);
      this.setState({ edit: false, editTitle: false });
    }
  }

  fetchEditForm = (
    e: SyntheticEvent<HTMLFormElement>,
    status: boolean, data: DealType,
  ): boolean => {
    const { activeUser, setErrorForm } = this.props;
    const { title, titleText } = this.state;

    if (status) {
      if (titleText.trim() === '') {
        if (this.titleComponent) this.titleComponent.style.border = '1px solid tomato';
        setErrorForm('title');
      } else if (activeUser.id) {
        this.editValidate(e, data);
      } else if (
        !activeUser.id && titleText !== null
        && String(titleText).trim() !== ''
        && String(titleText).trim() !== title
      ) {
        this.editCreatedValide(e, data);
      }
    }

    return true;
  }

  updateContacts = (contacts: Array<ContactType>) => {
    const { fetchUpdateContactAction } = this.props;
    contacts.forEach((item) => fetchUpdateContactAction(item));
  }

  editValidate = (
    e: SyntheticEvent<HTMLFormElement>,
    { contacts, data }: { contacts: Array<ContactType>, data: DealType },
  ) => {
    const {
      activeUser,
      setActiveUser,
      activeManager,
      fetchUpdateDealAction,
    } = this.props;
    const { title, titleText } = this.state;
    this.addContact(contacts.filter((item) => item.newContact), activeUser);
    this.updateContacts(contacts.filter((item) => !item.newContact));
    fetchUpdateDealAction({
      id: activeUser.id,
      title: titleText !== title ? titleText.split('').slice(0, 100).join('').trim() : null,
      managerID: data.manager.id !== activeManager.id ? data.manager.id : null,
      client: String(data.client).trim() !== '' ? data.client : null,
      sourceID: data.source.id,
      jobPostingURL: data.jobPostingURL ? data.jobPostingURL.trim() : '',
      jobProposalURL: data.jobProposalURL ? data.jobProposalURL.trim() : '',
      messagesURL: data.messagesURL ? data.messagesURL.trim() : '',
      salesURL: data.salesURL ? data.salesURL.trim() : '',
      channelID: data.channel.id,
    }, (deal: DealType) => {
      setActiveUser(deal);
      fetchUpdateDealAction({
        id: activeUser.id,
        sourceID: data.source.id,
        jobPostingURL: data.jobPostingURL ? data.jobPostingURL.trim() : '',
        jobProposalURL: data.jobProposalURL ? data.jobProposalURL.trim() : '',
        messagesURL: data.messagesURL ? data.messagesURL.trim() : '',
        salesURL: data.salesURL ? data.salesURL.trim() : '',
        channelID: data.channel.id,
        stageId: activeUser.stage.id !== data.stage.id ? data.stage.id : null,
      }, (_deal: DealType) => {
        setActiveUser(_deal);
        this.closeEdit(e);
      });
    });
  }

  editCreatedValide = (
    e: SyntheticEvent<HTMLFormElement>,
    { data, contacts }: { data: DealType, contacts: Array<ContactType> },
  ): void => {
    const {
      setActiveUser,
      setActiveManagerAction,
    } = this.props;
    // $FlowFixMe TODO: FIX THIS
    document.querySelector('.block-title input').style.border = '1px solid #C6CCD5';
    setActiveManagerAction(data.manager);
    setActiveUser(data);
    this.createNewDeal(
      data,
      { contacts },
      (dealData: {
        status: boolean
      }) => {
        if (dealData.status) {
          this.closeEdit(e);
        }
      },
    );
  }

  activateFormEdit = (e, idx: string): void => {
    const { editForm } = this.state;

    const newEditForm = {
      ...editForm,
      [idx]: true,
    };

    this.setState({
      edit: true,
      editForm: newEditForm,
    });
  }

  toggleActiveTitle = (status: boolean): void => {
    this.setState({ editTitle: status, edit: status });
  }

  toggleStatus = (idx: string, obj: DealType): void => {
    const { fetchUpdateDealAction } = this.props;
    fetchUpdateDealAction({
      id: idx,
      stageId: obj.id,
    });

    this.getColumns();
  }

  addContact = (array: Array<ContactType>, options: DealType): void => {
    const {
      activeUser,
      contacts,
      fetchCreateContactAction,
    } = this.props;
    const { parameters } = this.state;
    const findIdParameter = parameters.find((item) => item.title === activeUser.channel.title);
    const id = options ? options.id : activeUser.id;
    const channelId = findIdParameter ? findIdParameter.id : activeUser.id;
    for (let i = 0; i < array.length; i += 1) {
      fetchCreateContactAction({
        dealId: id,
        parameterId: channelId,
        value: array[i].value,
      }, contacts);
    }
  }

  deleteContact = (id: string): void => {
    const { fetchDeleteContactAction } = this.props;
    fetchDeleteContactAction(id);
  }

  closeEdit = (e): void => {
    e.preventDefault();
    const { editForm } = this.state;
    const { errorsFormCreate, deleteErrorForm } = this.props;
    const editFormNew = { ...editForm };
    // eslint-disable-next-line no-restricted-syntax
    for (const i in editFormNew) {
      editFormNew[i] = false;
    }

    Object.entries(errorsFormCreate).forEach((item) => {
      deleteErrorForm(item[0]);
    });

    this.setState({
      edit: false,
      editTitle: false,
      editForm: editFormNew,
    });
  }

  setMessage = (obj: { idx: string, message: string }): void => {
    const { fetchCreateCommentAction, setCommentAction } = this.props;
    if (obj.idx) {
      fetchCreateCommentAction({
        dealId: obj.idx,
        content: obj.message,
      });
    } else {
      setCommentAction({
        ...obj,
        content: obj.message,
        id: Math.random() * 10000,
        user: {
          name: 'no name',
        },
        noSaved: true,
      });
    }
  }

  deleteMessage = (find: { id: string }) => {
    const { fetchDeleteCommentAction, activeUser } = this.props;
    fetchDeleteCommentAction(find.id, activeUser.id);
  }

  updateMessage = (
    obj: {
      id: string,
      content: string
    },
  ) => {
    const { fetchUpdateCommentAction } = this.props;
    fetchUpdateCommentAction(obj);
  }

  createNewDeal = (
    data: DealType,
    options: { contacts: Array<ContactType> },
    successFunc: ({ status: boolean }) => void,
  ): void => {
    const { titleText } = this.state;
    const {
      sources, comments, fetchCreateDealAction, activeManager,
    } = this.props;

    const form = document.getElementsByClassName('tab-block-content');
    const jobForm = Array.from(form)[0].style.display;
    if (
      (data.jobPostingURL && data.jobProposalURL && data.stage.title.toLowerCase() === 'introduction')
      || (data.stage.title.toLowerCase() !== 'introduction' && data.jobPostingURL) || String(jobForm) === 'none'
    ) {
      const newComments = comments.filter((item) => item.noSaved);
      fetchCreateDealAction({
        title: titleText.split('').slice(0, 100).join('').trim(),
        stageId: data.stage.id,
        managerID: data.manager ? data.manager.id : activeManager.id,
        client: data.client.trim(),
        sourceID: data.source ? data.source.id : sources[0].id,
        channelID: data.channel.id,
        jobProposalURL: data.jobProposalURL.trim(),
        jobPostingURL: data.jobPostingURL.trim(),
        salesURL: data.salesURL.trim(),
        messagesURL: data.messagesURL.trim(),
      }, (deal: DealType) => {
        if (options) {
          this.addContact(options.contacts, {
            id: deal.id,
            channelId: deal.channel.id,
          });
        }

        for (let i = 0; i < newComments.length; i += 1) {
          this.setMessage({
            ...newComments[i],
            idx: deal.id,
          });
        }

        this.closeEdit({
          preventDefault: () => {},
        });

        successFunc({
          status: true,
          deal,
        });
      });
    }
  }

  toggleModalNewDeal = (status: boolean, data?: DealTask) => {
    this.setState({ isNewDeal: status, taskData: data || {} });
  }

  render() {
    const { error } = this.state;
    const {
      // getDealById,
      loadingEmployees,
      loadingColumns,
      loadingDeals,
      loadingChannels,
      loadingSources,
      loadingComments,
      loadingById,
    } = this.props;
    if (error) {
      return <ErrorBoundry message="Ops, error! Page not found" />;
    }

    const loading = loadingById
      || loadingChannels
      || loadingSources
      || loadingEmployees
      || loadingColumns
      || loadingDeals;
    return (
      <div style={{ height: '100%' }}>
        { loading ? <LoadingContainer /> : <CRMDetailsPage {...this} /> }
      </div>
    );
  }
}

export default CrmDetailsHoc(withRouter(CRMDetailsContainer));
