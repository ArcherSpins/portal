import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const getLogs = async (taskID) => {
  const response = client.query({
    variables: {
      taskID,
      limit: '100',
    },
    query: gql`
      query getLogs($taskID: ID!, $limit: Int!) {
        tasksSpentTimeEntries(taskID: $taskID, limit: $limit) {
          spentTimeEntries {
            id
            comment
            date
            spentTime
            assignedUser {
              id
              name
            }
            task {
              id
              title
              number
            }
            createdAt
          }
        }
      }
    `,
  });
  return response;
};
