import ApolloClient from 'apollo-boost';
import { Toast } from 'ui-kit';
import history from 'utils/history';
import { AUTH_TOKEN_KEY, UNAUTHENTICATED_CODE } from './constants';

const apiUrl = 'http://internal.sfxdx.ru/api/graphql';

const client = new ApolloClient({
  uri: apiUrl,
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  onError: ({ graphQLErrors }) => {
    const [firstError] = graphQLErrors;
    graphQLErrors.forEach(async (err) => {
      if (err.extensions.code === UNAUTHENTICATED_CODE) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        history.push('/');
      }
    });
    Toast.push(firstError.message);
  },
});

export default client;
