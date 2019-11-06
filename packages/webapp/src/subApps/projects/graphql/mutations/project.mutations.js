import gql from 'graphql-tag';
import client from 'utils/api';

// eslint-disable-next-line import/prefer-default-export
export const updateProject = async ({
  id,
  title,
  URL,
  description,
  managerID,
  engagementModel,
  type,
  unbindWatchers,
  bindWatchers,
  unbindParticipants,
  bindParticipants,
}) => {
  const response = await client.mutate({
    variables: {
      id,
      title,
      URL,
      description,
      managerID,
      modelID: engagementModel,
      typeID: type,
      unbindWatchers,
      bindWatchers,
      unbindParticipants,
      bindParticipants,
    },
    mutation: gql`
      mutation UpdateProject(
        $id: ID!
        $title: String
        $URL: String
        $description: String
        $managerID: ID
        $modelID: ID
        $typeID: ID
        $unbindWatchers: [ID!]
        $bindWatchers: [ID!]
        $unbindParticipants: [ID!]
        $bindParticipants: [ID!]
      ) {
        updateProject(
          id: $id
          title: $title
          URL: $URL
          description: $description
          managerID: $managerID
          modelID: $modelID
          typeID: $typeID
          unbindWatchers: $unbindWatchers
          bindWatchers: $bindWatchers
          unbindParticipants: $unbindParticipants
          bindParticipants: $bindParticipants
        ) {
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
            id
            firstName
            lastName
            name
          }
          spentTime
          manager {
            id
            firstName
            lastName
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
    `,
  });

  return response;
};

export const createProject = async ({
  title,
  URL,
  description,
  managerID,
  engagementModel,
  type,
  watchers,
  participants,
}) => {
  const response = await client.mutate({
    variables: {
      title,
      URL,
      description,
      managerID,
      modelID: engagementModel,
      typeID: type,
      watcherIDs: watchers,
      participantIDs: participants,
    },
    mutation: gql`
      mutation CreateProject(
        $title: String!
        $URL: String!
        $description: String!
        $managerID: ID!
        $modelID: ID!
        $typeID: ID!
        $watcherIDs: [ID!]
        $participantIDs: [ID!]
      ) {
        createProject(
          title: $title
          URL: $URL
          description: $description
          managerID: $managerID
          modelID: $modelID
          typeID: $typeID
          watcherIDs: $watcherIDs
          participantIDs: $participantIDs
        ) {
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
            id
            firstName
            lastName
            name
          }
          spentTime
          manager {
            id
            firstName
            lastName
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
    `,
  });
  return response;
};
