// TODO: FIX THIS
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
// @flow
import React from 'react';
// TODO: FIX
// eslint-disable-next-line import/no-cycle
import { DetailsList } from '../../components';
import type { Props, State } from './type';
import type { SourceType } from '../../types';

class DetailsListContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { contacts, activeUser } = props;
    this.state = {
      data: activeUser,
      error: false,
      contacts,
      loadedContacts: false,
      deletedContacts: [],
    };
  }

  componentDidUpdate() {
    const { contacts, edit, activeUser } = this.props;
    const { contacts: contactsState, data } = this.state;
    if (!edit && contactsState.length !== contacts.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        contacts,
        loadedContacts: true,
      });

      this.getUser();
    }
    // if (!edit && data.channel
    //   && (activeUser.channel.id !== data.channel.id
    //     || activeUser.stage.id !== data.stage.id
    //     || activeUser.manager.name !== data.manager.name
    //     || activeUser.jobProposalURL !== data.jobProposalURL)
    // ) {
    //   this.getUser();
    // }
  }

  getUser = () => {
    const { activeUser } = this.props;
    if (activeUser) {
      this.setState({ data: activeUser });
    } else this.setState({ error: true });
  }

  changeInput = (id: string, value: string, itemId: number, obj: Object) => {
    const { activateFormEdit } = this.props;
    const { data, contacts } = this.state;
    let findContactIdx;
    let findContact;

    switch (id) {
      case 'client':
        this.setState({ data: { ...data, client: value } });
        break;
      case 'manager':
        this.setState({
          data: {
            ...data,
            manager: value,
          },
        });
        activateFormEdit({}, 'sales');
        break;
      case 'channel':
        this.setState({
          data: {
            ...data,
            channel: value,
          },
        });

        activateFormEdit({}, 'channel');
        break;
      case 'contact':
        this.setState({ data: { ...data, contact: value } });
        findContactIdx = contacts.findIndex((item) => item.id === itemId);
        findContact = contacts[findContactIdx];

        findContact.value = value;
        // eslint-disable-next-line no-case-declarations
        const contact = [...contacts];
        contact[findContactIdx] = findContact;
        this.setState({
          data: { ...data, contacts: contact },
        });
        activateFormEdit({}, 'contact');
        break;
      case 'source':
        this.setState({
          data: {
            ...data,
            [itemId]: value,
          },
        });
        activateFormEdit({}, 'source');
        break;
      case 'status':
        this.setState({
          data: {
            ...data,
            stage: value,
          },
        });
        activateFormEdit({}, 'status');
        break;
      default: return false;
    }

    return true;
  }

  setSourceData = (obj: SourceType) => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        source: obj,
      },
    });
  }

  newContact = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { activateFormEdit, contacts } = this.props;

    activateFormEdit(e, 'contact');
    this.setState({
      contacts: [
        ...contacts,
        { id: Math.random() * 10000, title: '', newContact: true }],
    });
  }

  valideInputs = (inputs: NodeList<HTMLInputElement>) => {
    const { deleteErrorForm, setErrorForm, toggleShowModal } = this.props;
    const { data } = this.state;
    let status = true;
    // eslint-disable-next-line no-restricted-syntax
    for (const input of inputs) {
      if (input.value !== '') {
        input.style.borderColor = '#C6CCD5';
        deleteErrorForm(input.id);
        // TODO: REFACTOR THIS TO MORE READABLE
        // eslint-disable-next-line no-continue
        continue;
      } else if (input.value.trim() === '') {
        if (data.stage && data.stage.title.toLowerCase() !== 'introduction' && input.id === 'jobProposalURL') {
          input.style.borderColor = '#C6CCD5';
          deleteErrorForm(input.id);
          // eslint-disable-next-line no-continue
          continue;
        } else if (data.stage.title.toLowerCase() === 'introduction' && input.id === 'jobProposalURL') {
          toggleShowModal(true);
        }
        input.style.borderColor = 'tomato';
        status = false;
        setErrorForm(input.id, null);
      }

      if (!status) return false;
      input.style.borderColor = '#C6CCD5';
      status = true;
      deleteErrorForm(input.id);
    }
    return status;
  }

  onSubmitEdit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fetchEditForm, deleteContact, toggleShowModal } = this.props;
    const { data, contacts, deletedContacts } = this.state;
    const inputs = document.querySelectorAll('.input-edit');
    // $FlowFixMe
    const status = this.valideInputs(inputs);
    if (deletedContacts.length > 0) {
      deletedContacts.forEach((item) => deleteContact(item.id));
    }
    if (status) {
      toggleShowModal(false);
      fetchEditForm(e, status, { data, contacts });
    }
    return null;
  }

  closeEdit = (e: SyntheticEvent<HTMLFormElement> | {
    preventDefault: () => void,
  }) => {
    const { closeEdit } = this.props;
    e.preventDefault();
    this.setState({
      deletedContacts: [],
    });
    closeEdit(e);
    this.getUser();
  }

  deleteContact = (e: SyntheticEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const { contacts, deletedContacts } = this.state;
    this.setState({
      contacts: contacts.filter((item) => item.id !== id),
      deletedContacts: [
        ...deletedContacts,
        contacts.find((item) => item.id === id),
      ],
    });
  }

  editImage = () => {};

  render() {
    return (
      <DetailsList {...this} />
    );
  }
}

export default DetailsListContainer;
