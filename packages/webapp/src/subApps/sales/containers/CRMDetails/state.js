// eslint-disable-next-line import/prefer-default-export
export const initialState = {
  title: '',
  error: false,
  edit: false,
  editForm: {
    client: false,
    sales: false,
    contact: false,
    channel: false,
    source: false,
    status: false,
    propSource: false,
  },
  parameters: [],
  editTitle: false,
  titleText: '',
  redirectNewDeal: {
    redirect: false,
    url: '',
  },
  showModalErrorMessage: false,
  modalApproval: false,
  dataDealForDelete: {},
  redirectDeleteDeal: false,
  isNewDeal: false,
};
