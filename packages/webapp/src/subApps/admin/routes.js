import createBaseRoute from 'utils/createRouteNames';

const getRoute = createBaseRoute('admin');

export const EMPLOYEES_ROUTE = getRoute('/employees');
export const SINGLE_EMPLOYEE_ROUTE = getRoute('/employees/:id');
export const CREATE_EMPLOYEE_ROUTE = getRoute('/create/:new_employee');
export const ACCESS_MAP_ROUTE = getRoute('/access_map');
export const EMPLOYEES_SETTINGS_ROUTE = getRoute('/settings_employees');
export const PROJECTS_SETTINGS_ROUTE = getRoute('/settings_projects');
export const CALENDAR_ROUTE = getRoute('/calendar');
