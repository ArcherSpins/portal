// @flow

export type TypeDeal = {
  createdAt: string,
  id: string,
  title: string,
  updatedAt: string
}

export type DealTask = {
  id: string,
  type: {
    id: string,
    title: string,
  },
  deal: {
    id: string,
    title: string,
  },
  description: string,
  startDate: string,
  endDate: string,
  resolved: string,
  resolvedComment: string,
}
