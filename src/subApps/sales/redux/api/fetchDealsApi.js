// @flow
import type { FetchResult } from 'apollo-client';
import client from 'utils/api';
import {
  getDeals,
  filterDeals,
  updateDeal,
  createDeal,
  deleteDeal,
} from '../../graphql/queries';
import type { DealType } from '../../types';
import type { CreateDealType } from '../sagas/types';
import type {
  PropsFilterDeals,
} from '../actions/types';

type Response = Array<DealType> | DealType

export async function fetchDeleteDeals(data: { id: string }): Promise<FetchResult<Response>> {
  try {
    const response = await client.mutate({
      mutation: deleteDeal,
      variables: data,
      fetchPolicy: 'no-cache',
    });
    return response.data.deleteDeal;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchDeals(props: PropsFilterDeals): Promise<FetchResult<Response>> {
  try {
    const response = await client.query({
      query: props ? filterDeals : getDeals,
      variables: {
        ...props,
        limit: '30',
        offset: '0',
      },
      fetchPolicy: 'no-cache',
    });
    return response.data.deals;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchUpdateDeal(data: CreateDealType): Promise<FetchResult<Response>> {
  try {
    const response = await client.mutate({
      mutation: updateDeal,
      variables: data,
    });
    return response.data.updateDeal;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchCreateDeal(data: CreateDealType): Promise<FetchResult<Response>> {
  try {
    const response = await client.mutate({
      mutation: createDeal,
      variables: data,
    });
    return response.data.createDeal;
  } catch (err) {
    throw new Error(err.message);
  }
}
