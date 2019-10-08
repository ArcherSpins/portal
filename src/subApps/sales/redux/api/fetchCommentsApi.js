// @flow
import type { FetchResult } from 'apollo-client';
import client from 'utils/api';
import {
  getDealComments,
  addDealComment,
  updateDealComment,
  deleteDealComment,
} from '../../graphql/queries';
import type { CommentType } from '../../types';

type Response = Array<CommentType>

export async function fetchUpdateComment(
  data: {
    id: string,
    content: string,
  },
): Promise<FetchResult<CommentType>> {
  try {
    const response = await client.mutate({
      mutation: updateDealComment,
      variables: data,
    });
    return response.data.updateDealComment;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchDeleteComment(
  data: { id: string },
): Promise<FetchResult<CommentType>> {
  try {
    const response = await client.mutate({
      mutation: deleteDealComment,
      variables: data,
    });
    return response.data.deleteDealComment;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchCommentsData(
  data: { dealId: string },
): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: getDealComments,
      variables: data,
    });
    return response.data.dealComments;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchCreateComment(
  data: {
    dealId: string,
    content: string
  },
): Promise<FetchResult<CommentType>> {
  try {
    const response = await client.mutate({
      mutation: addDealComment,
      variables: data,
    });
    return response.data.addDealComment;
  } catch (err) {
    throw new Error(err.message);
  }
}
