// @flow

import client from 'utils/api';
import { GET_PROJECT_TYPES } from '../../graphql/queries/project.queries';

import type { ProjectType } from './project.flow-types';

type Response = {
  projectTypes: Array<ProjectType>,
  engagementModels: Array<ProjectType>
};

// eslint-disable-next-line import/prefer-default-export
export async function fetchProjectTypes(): Promise<Response> {
  const response = await client.query({
    query: GET_PROJECT_TYPES,
  });
  return {
    projectTypes: response.data.projectTypes,
    engagementModels: response.data.engagementModels,
  };
}
