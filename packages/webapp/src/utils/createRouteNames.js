// @flow
const createRoute = (basename: string) => (route: string) => `/${basename}${route}`;
export default createRoute;
