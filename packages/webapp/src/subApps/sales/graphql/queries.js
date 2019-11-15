import gql from 'graphql-tag';

const getEmployees = gql`
  query Query(
    $search: String
    $sorting: EmployeesSorting = FIRST_NAME
    $sortDirection: SortingDirection = INCREASE
  ){
    employees(
        search: $search
        sorting: $sorting
        sortDirection: $sortDirection
    ) {
      employees {
        id
        name
        email
        status
        timeZone
        position {
          id
          title
        }
        department {
          id
          title
        }
        skills { id, title } 
      }
    }
  }
`;

export const createDeal = gql`
  mutation createDeal(
    $title:String!,
    $stageId:ID!,
    $managerID:ID!,
    $client: String!,
    $sourceID: ID!,
    $channelID: ID!,
    $jobProposalURL: String = "",
    $jobPostingURL: String = "",
    $salesURL: String = "",
    $messagesURL: String = "",
  ) {
    createDeal(
      title: $title,
      stageId: $stageId,
      managerID: $managerID,
      client: $client,
      sourceID: $sourceID,
      channelID: $channelID,
      jobPostingURL: $jobPostingURL,
      jobProposalURL: $jobProposalURL,
      messagesURL: $messagesURL,
      salesURL: $salesURL,
    ) {
      id,
      title,
      createdAt,
      updatedAT,
      pipeline {
        id,
        title
        createdAt,
        updatedAT,
      }
      stage {
        id,
        title
        createdAt,
        updatedAT,
      }
      manager {
        id,
        name
      }

      source {
        id,
        title
      }

      jobProposalURL,
      jobPostingURL,
      
      channel {
        id, 
        title
      },

      client,

      salesURL,
      messagesURL,

      customFields {
        parameter {
            title,
        },
        value
      }
    }
  }
`;

export const updateDeal = gql`
  mutation updateDeal(
    $id: ID!,
    $stageId: ID,
    $title: String,
    $sourceID: ID,
    $jobPostingURL: String,
    $jobProposalURL: String,
    $salesURL: String,
    $messagesURL: String,
    $channelID: ID,
    $managerID: ID,
    $client: String
  ) {
    updateDeal(
      id: $id,
      stageId: $stageId,
      title: $title,
      sourceID: $sourceID,
      jobPostingURL: $jobPostingURL,
      jobProposalURL: $jobProposalURL,
      salesURL: $salesURL,
      messagesURL: $messagesURL,
      channelID: $channelID,
      managerID: $managerID
      client: $client
    ) {
      id,
      title,
      createdAt,
      updatedAT,
      pipeline {
        id,
        title
        createdAt,
        updatedAT,
      }
      stage {
        id,
        title
        createdAt,
        updatedAT,
      }
      manager {
        id,
        name
      }

      source {
        id,
        title
      }

      jobProposalURL,
      jobPostingURL,
      
      channel {
        id, 
        title
      },
      client,

      customFields {
        id,
        parameter {
          id,
          title,
        },
        value
      }

      salesURL,
      messagesURL,
    }
  }
`;

export const deleteDeal = gql`
  mutation deleteDeal($id: ID!) {
    deleteDeal(id: $id)
  }
`;

const getDeals = gql`
  query deals {
    deals {
      id,
      title,
      createdAt,
      updatedAT,
      pipeline {
        id,
        title
        createdAt,
        updatedAT,
      }
      stage {
        id,
        title
        createdAt,
        updatedAT,
      }
      manager {
        id,
        name
      }

      customFields {
        id,
        parameter {
          id,
          title,
        },
        value
      }

      source {
        id,
        title
      }

      jobProposalURL,
      jobPostingURL,

      salesURL,
      messagesURL,
      
      channel {
        id, 
        title
      },

      client
    }
  }
`;

const getDealById = gql`
  query deal($id:ID!) {
    deal(id: $id) {
      id,
      title,
      createdAt,
      updatedAT,
      pipeline {
        id,
        title
        createdAt,
        updatedAT,
      }
      stage {
        id,
        title
        createdAt,
        updatedAT,
      }

      manager {
        id,
        name
      }

      source {
        id,
        title
      }

      customFields {
        id,
        parameter {
          id,
          title,
        },
        value
      }

      jobProposalURL,
      jobPostingURL,

      salesURL,
      messagesURL,

      channel {
        id, 
        title
      },

      client
    }
  }
`;

const getDealComments = gql`
  query dealComments($dealId:ID!, $limit:Int!, $offset: Int!) {
    dealComments(dealId: $dealId, limit: $limit, offset: $offset) {
      content,
      id,
      user {
        id , name,
        email, status,
        skills {
          id,
          title
        }
      }
      createdAt
    }
  }
`;

export const addDealComment = gql`
  mutation addDealComment($dealId:ID!, $content:String!) {
    addDealComment(dealId: $dealId, content: $content) {
      content,
      id,
      user {
        id , name,
        email, status,
        skills {
          id,
          title
        }
      }
      createdAt
    }
  }
`;

export const deleteDealComment = gql`
  mutation deleteDealComment($id: ID!) {
    deleteDealComment(id: $id)
  }
`;

export const updateDealComment = gql`
  mutation updateComment($id:ID!, $content: String!) {
    updateDealComment(id: $id, content: $content) {
      content,
      id,
      user {
        id , name,
        email, status,
        skills {
          id,
          title
        }
      }
      createdAt
    }
  }
`;


const getDealCustomFields = gql`
  query dealCustomFields($dealId:ID!) {
    dealCustomFields(dealId: $dealId) {
      id,
      parameter {
        title
      },
      value
    }
  }
`;

export const addDealCustomField = gql`
  mutation addDealCustomField(
    $dealId:ID!, 
    $parameterId: ID!, 
    $value: String!
  ) {
  addDealCustomField(dealId:$dealId, parameterId: $parameterId, value: $value) {
      id,
      parameter {
        id,
        title
      },
      value
    }
  }
`;

export const deleteCustomField = gql`
  mutation deleteCustomField($id: ID!) {
    deleteDealCustomField(id: $id)
  }
`;

const getColumns = gql`
  query pipelines {
    columnsData: pipelines(limit: 1, offset: 0) {
      id,
      title,
      stages{
        id, 
        title,
        displayed
      }
    }
  }
`;

export const updateCustomField = gql`
  mutation updateCustomField(
    $id: ID!,
    $value: String!
  ) {
    updateCustomField(
      id: $id,
      value: $value
    ) {
      id,
      parameter {
        id,
        title
      },
      value
    }
  }
`;

const getDealParametrs = gql`
  query params {
    dealParameters {
      id,
      title
    }
  }
`;


const getChannels = gql`
  query dealChannels {
    dealChannels {
      id, title
    }
  }
`;

const getSources = gql`
  query dealSources {
    dealSources{
      id, title
    }
  }
`;

const filterDeals = gql`
  query deals(
      $stageID: ID, 
      $managerID: ID, 
      $client: String = "", 
      $title: String = "", 
      $createdBefore: Time, 
      $createdAfter: Time,
      $limit: Int!,
      $offset: Int!
    ) {
    deals(
      stageID: $stageID,
      managerID: $managerID,
      client: $client,
      title: $title,
      createdBefore: $createdBefore,
      createdAfter: $createdAfter,
      limit: $limit,
      offset: $offset
    ) {
      id,
      title,
      createdAt,
      updatedAT,
      pipeline {
        id,
        title
        createdAt,
        updatedAT,
      }
      stage {
        id,
        title
        createdAt,
        updatedAT,
      }

      manager {
        id,
        name
      }

      source {
        id,
        title
      }

      customFields {
        id,
        parameter {
          id,
          title,
        },
        value
      }

      jobProposalURL,
      jobPostingURL,

      salesURL,
      messagesURL,

      channel {
        id, 
        title
      },

      client
    }
  }
`;

const getSelfInfo = gql`
  query selfInfo {
    selfInfo {
      id, name, email
    }
  }
`;

export const getDealTasksType = gql`
  query dealTaskTypes {
    dealTaskTypes(limit: 10, offset:0) {
      id,
      title,
      createdAt,
      updatedAt,
    }
  }
`;

export const getDealTaskTypeId = gql`
  query dealTaskType {
    dealTaskType(id: ID!) {
      id,
      title,
      createdAt,
      updatedAt,
    }
  }
`;

export const getDealTasks = gql`
  query dealTasks {
    dealTasks(dealID: ID!) {
      id,
      type {
        id, 
        title,
      },
      deal {
        id,
        title,
      },
      description,
      startDate,
      endDate,
      resolved,
      resolvedComment,
    }
  }
`;

export {
  getEmployees,
  getDeals,
  getDealById,
  getDealComments,
  getDealCustomFields,
  getColumns,
  getDealParametrs,
  getChannels,
  getSources,
  filterDeals,
  getSelfInfo,
};
