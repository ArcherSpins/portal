import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const createMilestone = async ({
  title,
  description,
  estTime,
  projectID,
  participantIDs,
}) => {
  const response = await client.mutate({
    variables: {
      title,
      description,
      estTime,
      projectID,
      participantIDs,
    },
    mutation: gql`
      mutation CreateMilestone(
        $title: String!
        $description: String!
        $estTime: Int!
        $projectID: ID!
        $participantIDs: [ID!]
      ) {
        createMilestone(
          title: $title
          description: $description
          estTime: $estTime
          projectID: $projectID
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
  unbindParticipants,
  bindParticipants,
}) => {
  const response = await client.mutate({
    variables: {
      id,
      title,
      description,
      estTime,
      unbindParticipants,
      bindParticipants,
    },
    mutation: gql`
      mutation UpdateMilestone(
        $id: ID!
        $title: String
        $description: String
        $estTime: Int
        $unbindParticipants: [ID!]
        $bindParticipants: [ID!]
      ) {
        updateMilestone(
          id: $id
          title: $title
          description: $description
          estTime: $estTime
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
