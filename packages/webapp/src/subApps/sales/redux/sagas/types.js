// @flow

export type CreateDealType = {
  title?: string,
  stageId?: string,
  managerID?: string,
  client?: string,
  sourceID?: string,
  channelID?: string,
  jobProposalURL?: string,
  jobPostingURL?: string,
  salesURL?: string,
  messagesURL?: string
}

export type UpdateDealType = {
  ...CreateDealType,
  id: string
}
