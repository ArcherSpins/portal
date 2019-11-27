import gql from 'graphql-tag';

export const getJobForCurrentUser = gql`
  query(
    $from: Time!,
    $to: Time!,
    $sorting: JobsSorting = CREATED_AT,
    $sortDirection: SortingDirection = INCREASE,
    $limit: Int! = 15,
    $offset: Int! = 0
  ) {
    jobsForCurrentUser(
      from: $from,
      to: $to,
      sorting: $sorting,
      sortDirection: $sortDirection,
      limit: $limit,
      offset: $offset
    ) {
      id,
      title,
      description,
      url,
      type,
      country,
      createdAt,
      budget,
      totalCharge,
      avgHourlyRate,
      price,
      tags {
        id, title
      },
      tagClouds {
        id, title, tags { id, title }
      }
    }
  }
`;

export const getBlockingJobsCurrentUser = gql`
  query(
    $from: Time!,
    $to: Time!,
    $sorting: JobsSorting = CREATED_AT,
    $sortDirection: SortingDirection = INCREASE,
    $limit: Int! = 15,
    $offset: Int! = 0
  ) {
    blockingJobsCurrentUser(
      from: $from,
      to: $to,
      sorting: $sorting,
      sortDirection: $sortDirection,
      limit: $limit,
      offset: $offset
    ) {
      id,
      title,
      description,
      url,
      type,
      country,
      createdAt,
      budget,
      totalCharge,
      avgHourlyRate,
      price,
      tags {
        id, title
      },
      tagClouds {
        id, title, tags { id, title }
      }
    }
  }
`;

export const createBlockingJobsForCurrentUser = gql`
  mutation(
    $from: Time!,
    $to: Time!,
    $tags: [ID!]
  ) {
    createBlockingJobsForCurrentUser(
      from: $from,
      to: $to,
      tags: $tags
    ) {
      id,
      from,
      to,
      userId,
      tags {
        id, title
      },
      createdAt
    }
  }
`;
