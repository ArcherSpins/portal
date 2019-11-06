// @flow
import type { FetchResult } from 'apollo-client';
import client from 'utils/api';
import {
  deleteCustomField,
  addDealCustomField,
  updateCustomField,
} from '../../graphql/queries';
import type { ContactType } from '../../types';

type Response = ContactType

export async function fetchUpdateContact(
  data: {
    id: string,
    value: string
  },
): Promise<void> {
  try {
    await client.mutate({
      mutation: updateCustomField,
      variables: data,
    });
    // return response.data.addDealCustomField;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchCreateContact(data: {
  dealId: string,
  parameterId: string,
  value: string,
}): Promise<FetchResult<Response>> {
  try {
    const response = await client.mutate({
      mutation: addDealCustomField,
      variables: data,
    });
    return response.data.addDealCustomField;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchDeleteContact(data: { id: string }): Promise<FetchResult<Response>> {
  try {
    const response = await client.mutate({
      mutation: deleteCustomField,
      variables: data,
    });
    return response.data.deleteDealCustomField;
  } catch (err) {
    throw new Error(err.message);
  }
}
