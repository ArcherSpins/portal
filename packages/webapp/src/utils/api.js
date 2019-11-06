import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

import { Toast } from '@sfxdx/ui-kit';
import history from 'utils/history';
import { AUTH_TOKEN_KEY, UNAUTHENTICATED_CODE } from './constants';

const apiUrl = 'http://internal.sfxdx.ru/api/graphql';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const [firstError] = graphQLErrors;
    graphQLErrors.forEach(async (err) => {
      if (err.extensions && err.extensions.code === UNAUTHENTICATED_CODE) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        history.push('/');
      }
    });
    Toast.push({ message: firstError.message, type: 'danger' });
  }
  if (networkError) Toast.push({ message: `[Network error]: ${networkError}`, type: 'danger' });
});

const httpLink = new HttpLink({ uri: apiUrl });

const link = errorLink.concat(httpLink);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    link,
  ]),
  uri: apiUrl,
  cache: new InMemoryCache(),
});

export default client;
