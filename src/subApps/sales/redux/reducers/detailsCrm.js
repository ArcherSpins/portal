
const initialState = {
  activeUser: {
    channel: {
      id: '8503cb8c-5b92-46a9-ac13-8c653235708d',
      title: 'LinkedIn',
    },
    client: '',
    createdAt: new Date(),
    customFields: [],
    id: null,
    jobPostingURL: '',
    jobProposalURL: '',
    manager: {
      id: '0',
      name: '',
    },
    pipeline: {
      createdAt: '',
      id: '',
      title: 'default',
      updatedAT: new Date(),
    },
    salesURL: '',
    messagesURL: '',
    source: {
      id: '',
      title: '',
    },
    stage: {
      createdAt: new Date(),
      id: '9b102320-e353-4a1d-a076-fba7b38f2bf0',
      title: 'Lead',
      updatedAT: new Date(),
    },
    title: 'New Deal',
    updatedAT: new Date(),
  },
  contacts: [],
  comments: [],
  channels: [],
  sources: [],
  managers: null,
  activeManager: {},
  loadingChannels: false,
  loadingSources: false,
  loadingComments: false,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHANNELS_REQUEST':
      return {
        ...state,
        loadingChannels: true,
      };
    case 'SET_USER':
      return {
        ...state,
        activeUser: action.payload,
      };
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
      };
    case 'GET_COMMENTS_REQUEST':
      return {
        ...state,
        loadingComments: true,
      };
    case 'GET_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: action.payload,
        loadingComments: false,
      };
    case 'GET_COMMENTS_FAIL':
      return {
        ...state,
        loadingComments: false,
      };
    case 'GET_CHANNELS_SUCCESS':
      return {
        ...state,
        channels: action.payload,
        loadingChannels: false,
      };
    case 'GET_CHANNELS_FAIL':
      return {
        ...state,
        loadingChannels: false,
      };
    case 'CREATE_COMMENT_SUCCESS':
      return {
        ...state,
        comments: [
          action.payload,
          ...state.comments,
        ],
      };

    case 'DELETE_COMMENT_SUCCESS':
      return {
        ...state,
        comments: [
          ...state.comments.slice(0,
            state.comments.findIndex((item) => item.id === action.payload)),
          ...state.comments.slice(
            state.comments.findIndex((item) => item.id === action.payload) + 1,
          ),
        ],
      };
    case 'UPDATE_COMMENT_SUCCESS':
      return {
        ...state,
        comments: [
          ...state.comments.slice(0,
            state.comments.findIndex((item) => item.id === action.payload.id)),
          action.payload.newComment,
          ...state.comments.slice(
            state.comments.findIndex((item) => item.id === action.payload.id) + 1,
          ),
        ],
      };
    case 'GET_SOURCES_REQUEST':
      return {
        ...state,
        loadingSources: true,
      };
    case 'GET_SOURCES_SUCCESS':
      return {
        ...state,
        sources: action.payload,
        loadingSources: false,
      };
    case 'GET_SOURCES_FAIL':
      return {
        ...state,
        loadingSources: false,
      };
    case 'DELETE_CONTACT_SUCCESS':
      return {
        ...state,
        contacts: state.contacts.filter((item) => item.id !== action.payload),
        activeUser: {
          ...state.activeUser,
          customFields: state.activeUser.customFields
            .filter((item) => item.id !== action.payload),
        },
      };
    case 'SET_ACTIVE_MANAGER':
      return {
        ...state,
        activeManager: action.payload,
        activeUser: {
          ...state.activeUser,
          manager: action.payload,
        },
      };
    case 'START_CREATE_NEW_DEAL':
      return {
        ...state,
        managers: [],
        activeUser: {
          channel: {
            id: '8503cb8c-5b92-46a9-ac13-8c653235708d',
            title: 'LinkedIn',
          },
          client: '',
          createdAt: new Date(),
          customFields: [],
          id: null,
          jobPostingURL: '',
          jobProposalURL: '',
          manager: {
            id: '0',
            name: '',
          },
          pipeline: {
            createdAt: '',
            id: '',
            title: 'default',
            updatedAT: new Date(),
          },
          source: state.sources[0],
          stage: {
            createdAt: new Date(),
            id: '9b102320-e353-4a1d-a076-fba7b38f2bf0',
            title: 'Lead',
            updatedAT: new Date(),
          },
          title: 'New Deal',
          updatedAT: new Date(),
          salesURL: '',
          messagesURL: '',
        },
        contacts: [],
        activeManager: {},
        comments: [],
      };
    default: return state;
  }
};
