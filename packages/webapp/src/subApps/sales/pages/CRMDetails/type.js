// @flow
import type { PropsCrmDetails, State } from '../../containers/CRMDetails/type';

export type CRMDetailsPageProps = {
  props: PropsCrmDetails,
  state: State,
  activateFormEdit: () => void,
  closeEdit: (any) => void,
  deleteMessage: (string | number) => void,
  setMessage: (string | number, string) => void,
  updateMessage: (string | number, string) => void,
  toggleStatus: (boolean) => void,
  deleteContact: (string | number) => void,
  toggleActiveTitle: (boolean) => void,
  changeTitleText: (string) => void,
  fetchEditForm: () => void,
  setTitleComponent: () => void,
  toggleShowModal: (boolean) => void,
  toggleModalApproval: (boolean) => void,
  setDeleteDataDeal: ({ id: string }) => void,
  approveDeleteDeal: () => void,
  toggleModalNewDeal: (boolean) => void
}
