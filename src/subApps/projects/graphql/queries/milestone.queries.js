import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const getMilestones = async (projectID, limit = '100') => {
  const response = await client.query({
    variables: { projectID, limit },
    query: gql`
      query Milestones($limit: Int!, $projectID: ID) {
        milestones(limit: $limit, projectID: $projectID) {
          milestones {
            id
            title
            description
            estimatedTime
            spentTime
            number
            state {
              id
              title
            }
            taskCreators {
              id
              firstName
              lastName
              name
            }
            participants {
              id
              firstName
              lastName
              name
            }
            project {
              URL
              id
              title
            }
          }
        }
      }
    `,
  });
  return response;
};

export const getMilestone = async (id) => {
  const response = await client.query({
    variables: {
      id,
    },
    query: gql`
      query GetMilestone($id: ID!) {
        milestone(id: $id) {
          id
          title
          description
          number
          state {
            id
            title
          }
          spentTime
          estimatedTime
          taskCreators {
            id
            firstName
            lastName
            name
          }
          participants {
            id
            firstName
            lastName
            name
          }
          project {
            id
            title
            URL
          }
        }
      }
    `,
  });
  return response;
};

export const getEstimation = async (id) => {
  const response = await client.query({
    variables: {
      id,
    },
    query: gql`
      query Milestone($id: ID!) {
        milestone(id: $id) {
          estimatedTime
          spentTime
        }
      }
    `,
  });

  return response;
};
