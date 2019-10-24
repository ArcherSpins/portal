import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const getEmployees = async (name) => {
  const response = await client.query({
    query: gql`
      query Employees($search: String) {
        employees(search: $search) {
          employees {
            id
            firstName
            lastName
            name
          }
        }
      }
    `,
    variables: {
      search: name,
    },
  });

  return response;
};
