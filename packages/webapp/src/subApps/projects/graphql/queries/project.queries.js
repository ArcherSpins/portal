import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const projects = async () => {
  const response = await client.query({
    query: gql`
      {
        projects(limit: 1000, searchMine: false) {
          projects {
            id
            title
            description
            estimatedTime
            URL
            createdAt
            participants {
              id
              firstName
              lastName
              name
            }
            watchers {
              firstName
              lastName
              id
              name
            }
            spentTime
            manager {
              id
              firstName
              lastName
              name
            }
            type {
              title
              id
            }
            spentTime
            estimatedTime
            engagementModel {
              title
              id
            }
          }
        }
      }
    `,
    fetchPolicy: 'network-only',
  });
  return response;
};

export const getEstimation = async (id) => {
  const response = await client.query({
    variables: {
      id,
    },
    query: gql`
      query Project($id: ID!) {
        project(id: $id) {
          estimatedTime
          spentTime
        }
      }
    `,
  });

  return response;
};

export const GET_PROJECT_TYPES = gql`
  query projectTypes {
    projectTypes {
      id
      title
    }

    engagementModels {
      id 
      title
    }
  }
`;
