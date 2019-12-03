// @flow

export type TagType = {
  id: string,
  title: string
}

export type TagClouds = {
  id: string,
  tags: Array<TagType>,
  title: string
}

export type JobsCurrentUserType = {
  avgHourlyRate: number,
  budget: number,
  country: string,
  createdAt: string,
  description: string,
  id: string,
  price: number,
  tags: Array<TagType>,
  tagClouds: TagClouds,
  title: string,
  totalCharge: number,
  type: string,
  url: string
}
