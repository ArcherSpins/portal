import ApolloClient from 'apollo-boost';

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
});

export default client;
