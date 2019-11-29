// @flow

export type TagType = {
  id: string,
  title: string
}

export type TagClouds = {
  id: string,
  tags: Array<TabType>,
  title: string
}

export type JobCurrentUserType = {
  avgHourlyRate: mixed,
  budget: number,
  country: string,
  createdAt: Date | string,
  description: string,
  id: string,
  price: mixed,
  tags: Array<TagType>,
  tagClouds: TagClouds,
  title: string,
  totalCharge: number,
  type: string,
  url: string
}
