import ApolloClient from 'apollo-boost';
import { Toast } from 'ui-kit';
// import Toast from 'ui-kit';

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
    Toast.push(firstError.message);
  },
});

export default client;
