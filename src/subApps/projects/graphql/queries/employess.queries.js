import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const getEmployees = async () => {
  const response = await client.query({
    query: gql`
      query Employees {
        employees {
          employees {
            id
            firstName
            lastName
            name
          }
        }
      }
    `,
  });

  return response;
};
