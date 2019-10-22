import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const getEmployess = gql`
  query Query(
    $search:String,
    $sorting:EmployeesSorting = FIRST_NAME,
    $sortDirection: SortingDirection = INCREASE,
    $limit: Int = 25,
    $offset: Int = 0
  ) {
    employees(
      search:$search,
      sorting:$sorting,
      sortDirection:$sortDirection,
      limit: $limit,
      offset: $offset
    ) {
      count,
      employees {
        id,
        email,
        name,
        lastName,
        firstName,
        middleName,
        status,
        city {
          id,
          name,
          country,
        },
        timeZone,
        skills {
          id, title
        },
        department {
          id,
          title,
          positions {
            id,
            title
          },
          manager {
            id,
            name,
            email
          },
          managingDepartment {
            id,
            title
          },
          countEmployees      
        },
        phoneNumber,
        birthday,
        dateOfEmployment,
        workDayEnd {
          hours,
          minutes
        },
        workDayStart{
          hours,
          minutes
        },
        lunchStart{
          hours,
          minutes
        },
        createdAt,
        updatedAt,
        position {
          id,
          title,
          businessLoad,
        }
      }
    }
  }
`;

const getEmployeeById = gql`
  query Query($id: ID!){
    employee(id:$id) {
      id,
      email,
      name,
      middleName,
      status,
      timeZone,
      lastName,
      firstName,
      city {
        id,
        name,
        country,
      },
      skills {
        id, title
      },
      department {
        id,
        title,
        positions {
          id,
          title
        },
        manager {
          id,
          name,
          email
        },
        managingDepartment {
          id,
          title
        },
        countEmployees      
      },
      phoneNumber,
      birthday,
      dateOfEmployment,
      workDayEnd {
        hours,
        minutes
      },
      workDayStart{
        hours,
        minutes
      },
      lunchStart{
        hours,
        minutes
      },
      createdAt,
      updatedAt,
      position {
        id,
        title,
        businessLoad,
      }
    }
  }
`;

export const updateEmployee = gql`
  mutation updateEmployee(
    $id: ID!,
    $email: String,
    $city: Int,
    $firstName: String,
    $middleName: String,
    $lastName: String,
    $timeZone: Timezone = "Novosibirsk +7",
    $phoneNumber: String,
    $birthday: Time,
    $dateOfEmployment: Time,
    $workDayStart: [Int!],
    $lunchStart: [Int!],
    $positionId: ID
  ) {
    updateEmployee(
      id: $id,
      email: $email,
      firstName: $firstName,
      middleName: $middleName,
      city: $city,
      lastName: $lastName,
      timeZone: $timeZone,
      phoneNumber: $phoneNumber,
      birthday: $birthday,
      dateOfEmployment: $dateOfEmployment,
      workDayStart: $workDayStart,
      lunchStart: $lunchStart
      positionId: $positionId
    ) {
      id,
      email,
      name,
      middleName,
      status,
      timeZone,
      lastName,
      firstName,
      city {
        id,
        name,
        country,
      },
      skills {
        id, title
      },
      department {
        id,
        title,
        positions {
          id,
          title
        },
        manager {
          id,
          name,
          email
        },
        managingDepartment {
          id,
          title
        },
        countEmployees      
      },
      phoneNumber,
      birthday,
      dateOfEmployment,
      workDayEnd {
        hours,
        minutes
      },
      workDayStart{
        hours,
        minutes
      },
      lunchStart{
        hours,
        minutes
      },
      createdAt,
      updatedAt,
      position {
        id,
        title,
        businessLoad,
      }
    }
  }
`;

const withUpdateEmployee = graphql(updateEmployee, {
  props: ({ mutate }) => ({
    updateEmployee: (employee) => mutate({
      variables: employee,
      // refetchQueries: [{ query: getEmployess }],
    }),
  }),
});

const getDepartments = gql`
  query Query(
    $sorting: DepartmentSorting = TITLE,
    $sortDirection: SortingDirection = INCREASE
  ) {
    departments(
      sorting:$sorting,
      sortDirection:$sortDirection
    ) {
      id,
      title,
      positions {
        id,
        title,
        businessLoad
      },
      manager {
        id,
        email,
        name,
        middleName,
        status,
        timeZone,
        skills {
          id, title
        },
        department {
          id,
          title,
          positions {
            id,
            title
          },
          manager {
            id,
            name,
            email
          },
          managingDepartment {
            id,
            title
          },
          countEmployees      
        },
        phoneNumber,
        birthday,
        dateOfEmployment,
        workDayEnd {
          hours,
          minutes
        },
        workDayStart{
          hours,
          minutes
        },
        lunchStart{
          hours,
          minutes
        },
        createdAt,
        updatedAt
      },
      employees {
        id,
        email,
        name,
        middleName,
        status,
        timeZone,
        lastName,
        firstName,
        skills {
          id, title
        },
        department {
          id,
          title,
          positions {
            id,
            title
          },
          manager {
            id,
            name,
            email
          },
          managingDepartment {
            id,
            title
          },
          countEmployees,
          positions {
            id,
            title,
            businessLoad,
          }  
        },
        phoneNumber,
        birthday,
        dateOfEmployment,
        workDayEnd {
          hours,
          minutes
        },
        workDayStart{
          hours,
          minutes
        },
        lunchStart{
          hours,
          minutes
        },
        createdAt,
        updatedAt,
        position {
          id,
          title,
          businessLoad,
        }
      },
      countEmployees
    }
  }
`;

const getPositions = gql`
  query Query(
    $search: String,
    $withBusinessLoad: Boolean = false,
    $sorting: PositionSorting = TITLE,
    $sortDirection: SortingDirection = INCREASE
  ) {
    positions(
      search:$search,
      withBusinessLoad:$withBusinessLoad,
      sorting:$sorting,
      sortDirection:$sortDirection
    ) {
      id,
      title,
      businessLoad,
      countEmployees
    }
  }
`;

export const signIn = gql`
  mutation signIn(
    $login:String!,
    $password:String!
  ) {
    signIn(login:$login, password:$password) {
      type,
      accessToken,
      refreshToken
    }
  }
`;

export const deleteEmployee = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

const withDeleteEmployee = graphql(deleteEmployee, {
  props: ({ mutate }) => ({
    deleteEmployee: (employee) => mutate({
      variables: employee,
      // refetchQueries: [{ query: getEmployess }],
    }),
  }),
});

const withSignIn = graphql(signIn, {
  props: ({ mutate }) => ({
    signIn: (data) => mutate({
      variables: data,
      // refetchQueries: [{ query: getEmployees }],
    }),
  }),
});

const getUserData = gql`
  query Query {
    selfInfo {
      id,
      email,
      name,
      middleName,
      status,
      timeZone,
      skills {
        id, title
      },
      department {
        id,
        title,
        positions {
          id,
          title
        },
        manager {
          id,
          name,
          email
        },
        managingDepartment {
          id,
          title
        },
        countEmployees      
      },
      phoneNumber,
      birthday,
      dateOfEmployment,
      workDayEnd {
        hours,
        minutes
      },
      workDayStart{
        hours,
        minutes
      },
      lunchStart{
        hours,
        minutes
      },
      createdAt,
      updatedAt
    }
  }
`;

export const initialResetPassword = gql`
  mutation initiateResetPasswordProcedure(
    $login: String!
  ) {
    initiateResetPasswordProcedure(
      login: $login
    )
  }
`;

const withInitialResetPassword = graphql(initialResetPassword, {
  props: ({ mutate }) => ({
    initialResetPassword: (data) => mutate({
      variables: data,
      // refetchQueries: [{ query: getEmployees }],
    }),
  }),
});

export const resetPassword = gql`
  mutation resetPassword(
    $token: String!,
    $newPassword: String!
  ) {
    resetPassword(token:$token, newPassword:$newPassword)
  }
`;

export const signOut = gql`
  mutation signOut {
    signOut
  }
`;

const withSignOut = graphql(signOut, {
  props: ({ mutate }) => ({
    signOut: (data) => mutate({
      variables: data,
      // refetchQueries: [{ query: getEmployees }],
    }),
  }),
});

const queryCalendar = gql`
  query calendar(
    $year: String = "2019"
  ) {
    calendar(
      year: $year
    ) {
      year,
      january,
      february,
      march,
      april,
      may,
      june,
      july,
      august,
      september,
      october,
      november,
      december
    }
  }
`;

export const createEmployee = gql`
  mutation addEmployee(
    $email: String!,
    $firstName: String!,
    $middleName: String!,
    $lastName: String!,
    $timeZone: Timezone = "UTC +3",
    $city: Int!,
    $phoneNumber: String!,
    $birthday: Time = "2019-08-12T00:00:00Z",
    $dateOfEmployment: Time = "2019-08-12T00:00:00Z",
    $positionId: ID
  ) {
    addEmployee(
      email: $email,
      firstName: $firstName,
      middleName: $middleName,
      lastName: $lastName,
      timeZone: $timeZone,
      city: $city,
      phoneNumber: $phoneNumber,
      birthday: $birthday,
      dateOfEmployment: $dateOfEmployment,
      positionId: $positionId
    ) {
      id,
      email
    }
  }
`;

export const getSpentTimeBounds = gql`
  query getSpentTimeBounds {
    getSpentTimeBounds {
      weeks,
      days,
      hours,
      minutes
    }
  }
`;

export const updateSpentTime = gql`
  mutation updateSpentTimeBounds(
    $weeks: Int,
    $days: Int,
    $hours: Int,
    $minutes: Int
  ) {
    updateSpentTimeBounds(
      weeks: $weeks,
      days: $days,
      hours: $hours,
      minutes: $minutes
    ) {
      weeks,
      days,
      hours,
      minutes
    }
  }
`;

export const getCities = gql`
  query cities($search:String) {
    cities(search: $search) {
      id,
      name,
      country,
    }
  }
`;

export {
  getEmployess,
  getDepartments,
  getPositions,
  withSignIn,
  withDeleteEmployee,
  getUserData,
  withSignOut,
  getEmployeeById,
  withUpdateEmployee,
  withInitialResetPassword,
  queryCalendar,
};
