/* eslint-disable react/no-unused-state */
// @flow
type DealType = {
  id: string,
  title: string,
  createdAt: string,
  updatedAT: string,
  dealInfo: {
    tasksForToday: number,
    overdueTasks: number
  },
  pipeline: {
    id: string,
    title: string,
    createdAt: string,
    updatedAT: string,
  },
  stage: {
    id: string,
    title: string,
    createdAt: string,
    updatedAT: string,
  },
  manager: {
    id: string,
    name: string
  },
  customFields: {
    id: string,
    parameter: {
      id: string,
      title: string,
    },
    value: string
  },
  source: {
    id: string,
    title: string
  },
  jobProposalURL: string,
  jobPostingURL: string,
  salesURL: string,
  messagesURL: string,
  channel: {
    id: string,
    title: string
  },
  client: string
}

// eslint-disable-next-line import/prefer-default-export
export type { DealType };
