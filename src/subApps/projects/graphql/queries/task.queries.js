import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const getAllTasks = async (milestoneID) => {
  const response = await client.query({
    variables: {
      milestoneID,
      limit: '100',
    },
    query: gql`
      query Tasks($limit: Int!, $milestoneID: ID!) {
        tasks(limit: $limit, milestoneID: $milestoneID, searchMine: false) {
          tasks {
            id
            title
            description
            number
            spentTime
            assignedUser {
              id
              name
            }
            state {
              id
              title
            }
            milestone {
              id
              title
              number
            }
            project {
              id
              title
            }
            createdAt
          }
        }
      }
    `,
  });

  return response;
};
