import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const createMilestone = async ({
  title,
  description,
  estTime,
  projectID,
  taskCreatorsIDs,
  participantIDs,
}) => {
  const response = await client.mutate({
    variables: {
      title,
      description,
      estTime,
      projectID,
      taskCreatorsIDs,
      participantIDs,
    },
    mutation: gql`
      mutation CreateMilestone(
        $title: String!
        $description: String!
        $estTime: Int!
        $projectID: ID!
        $taskCreatorsIDs: [ID!]
        $participantIDs: [ID!]
      ) {
        createMilestone(
          title: $title
          description: $description
          estTime: $estTime
          projectID: $projectID
          taskCreatorsIDs: $taskCreatorsIDs
          participantIDs: $participantIDs
        ) {
          id
          title
          description
          estimatedTime
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
            title
            id
          }
        }
      }
    `,
  });
  return response;
};

export const updateMilestone = async ({
  id,
  title,
  description,
  estTime,
  // stateID,
  unbindTaskCreators,
  bindTaskCreators,
  unbindParticipants,
  bindParticipants,
}) => {
  const response = await client.mutate({
    variables: {
      id,
      title,
      description,
      estTime,
      // stateID,
      unbindTaskCreators,
      bindTaskCreators,
      unbindParticipants,
      bindParticipants,
    },
    mutation: gql`
      mutation UpdateMilestone(
        $id: ID!
        $title: String
        $description: String
        $estTime: Int
        # $stateID: ID
        $unbindTaskCreators: [ID!]
        $bindTaskCreators: [ID!]
        $unbindParticipants: [ID!]
        $bindParticipants: [ID!]
      ) {
        updateMilestone(
          id: $id
          title: $title
          description: $description
          estTime: $estTime
          # stateID: $stateID
          unbindTaskCreators: $unbindTaskCreators
          bindTaskCreators: $bindTaskCreators
          unbindParticipants: $unbindParticipants
          bindParticipants: $bindParticipants
        ) {
          id
          title
          description
          number
          estimatedTime
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
            title
            URL
            id
          }
        }
      }
    `,
  });

  return response;
};

export const deleteMilestone = async (id) => {
  const response = await client.mutate({
    variables: {
      id,
    },
    mutation: gql`
      mutation DeleteMilestone($id: ID!) {
        deleteMilestone(id: $id)
      }
    `,
  });

  return response;
};
