// @flow

export const getUrlFromProject = (url: string): string => {
  const urls = url.split('/');
  return urls[urls.length - 1];
};