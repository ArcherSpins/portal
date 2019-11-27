/* eslint-disable import/prefer-default-export */
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

const apiUrl = 'http://internal.sfxdx.ru/api/graphql';
const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: apiUrl });

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, extensions }) => {
      if (message === 'invalid token signature') {
        localStorage.removeItem('token');
      }

      return {
        message,
        extensions,
      };
    });
  }
});
const link = errorLink.concat(httpLink);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    headers: {
      ...headers,
      authorization: '',
    },
  };
});


export const client = new ApolloClient({
  cache,
  uri: apiUrl,
  link: ApolloLink.from([authLink, link]),
  queryDeduplication: false,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});
