import gql from 'graphql-tag';

export const getJobsForCurrentUser = gql`
  query(
    $from: Time!,
    $to: Time!,
    $sorting: JobsSorting = CREATED_AT,
    $sortDirection: SortingDirection = INCREASE,
  ) {
    jobsForCurrentUser(
      from: $from,
      to: $to,
      sorting: $sorting,
      sortDirection: $sortDirection,
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
      price {
        Min, Max
      },
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
    $sortDirection: SortingDirection = INCREASE
  ) {
    blockingJobsCurrentUser(
      from: $from,
      to: $to,
      sorting: $sorting,
      sortDirection: $sortDirection,
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
      price {
        Min, Max
      },
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
