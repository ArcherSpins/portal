// @flow
// eslint-disable-next-line import/prefer-default-export
export const getUrlFromProject = (url: string): string => {
  const urls = url.split('/');
  return urls[urls.length - 1];
};
