import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const createTask = async ({
  title,
  description,
  assignedUserID,
  milestoneID,
}) => {
  const response = await client.mutate({
    variables: {
      title,
      description,
      assignedUserID,
      milestoneID,
    },
    mutation: gql`
      mutation CreateTask(
        $title: String!
        $description: String!
        $assignedUserID: ID!
        $milestoneID: ID!
      ) {
        createTask(
          title: $title
          description: $description
          assignedUserID: $assignedUserID
          milestoneID: $milestoneID
        ) {
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
            spentTime
            number
          }
          project {
            id
            title
          }
          createdAt
        }
      }
    `,
  });

  return response;
};

export const updateTask = async ({
  id,
  title,
  description,
  assignedUserID,
  stateID,
}) => {
  const response = await client.mutate({
    variables: {
      id,
      title,
      description,
      assignedUserID,
      stateID,
    },
    mutation: gql`
      mutation UpdateTask(
        $id: ID!
        $title: String
        $description: String
        $assignedUserID: ID
        $stateID: ID
      ) {
        updateTask(
          id: $id
          title: $title
          description: $description
          assignedUserID: $assignedUserID
          stateID: $stateID
        ) {
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
    `,
  });

  return response;
};

export const deleteTask = async (id) => {
  const response = await client.mutate({
    variables: {
      id,
    },
    mutation: gql`
      mutation DeleteTask($id: ID!) {
        deleteTask(id: $id)
      }
    `,
  });
  return response;
};
