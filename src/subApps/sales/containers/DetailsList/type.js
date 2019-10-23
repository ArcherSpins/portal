// @flow
import type {
  DealType,
  ContactType,
  // ChannelType,
} from '../../types';

export type Props = {
  contacts: any,
  activeUser: any,
  edit: boolean,
  // ....
  activateFormEdit: (SyntheticEvent<HTMLFormElement> | mixed, string) => void | mixed,
  deleteContact: (string | number) => void,
  closeEdit: (mixed) => void,
  setErrorForm: (string, string | null) => void,
  deleteErrorForm: (string) => void,
  fetchEditForm: (
    SyntheticEvent<HTMLFormElement>,
    boolean | string,
    {
      data: DealType,
      contacts: Array<ContactType>
    }
  ) => DealType,
  toggleShowModal: (boolean) => void,
}

export type State = {
  data: {
    id: string,
    client: string,
    createdAt: string,
    updatedAT: string,
    channel: string,
    salesURL: string,
    messagesURL: string,
    stage: any,
    jobPostingURL: string,
    jobProposalURL: string,
    manager: string,
    contact: string
  },
  error: boolean,
  contacts: Array<ContactType>,
  deletedContacts: Array<ContactType>,
  loadedContacts: boolean,
}
