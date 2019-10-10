import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const createLog = async ({
  taskID, spentTime, comment, date,
}) => {
  const response = await client.mutate({
    variables: {
      taskID,
      spentTime,
      comment,
      date,
    },
    mutation: gql`
      mutation CreateLog(
        $taskID: ID!
        $spentTime: Int!
        $comment: String!
        $date: Time!
      ) {
        createSpentTimeEntry(
          taskID: $taskID
          spentTime: $spentTime
          comment: $comment
          date: $date
        ) {
          id
          spentTime
          comment
          date
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
    `,
  });
  return response;
};

export const updateLog = async ({
  id, spentTime, comment, date,
}) => {
  const response = await client.mutate({
    variables: {
      id,
      spentTime,
      comment,
      date,
    },
    mutation: gql`
      mutation UpdateLog(
        $id: ID!
        $spentTime: Int
        $comment: String
        $date: Time
      ) {
        updateSpentTimeEntry(
          id: $id
          spentTime: $spentTime
          comment: $comment
          date: $date
        ) {
          id
          spentTime
          comment
          date
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
    `,
  });
  return response;
};
