/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getPersonalInfo = /* GraphQL */ `
  query GetPersonalInfo($id: ID!) {
    getPersonalInfo(id: $id) {
      id
      name
      owner
      image
      createdAt
      updatedAt
      email
    }
  }
`;
export const listPersonalInfos = /* GraphQL */ `
  query ListPersonalInfos(
    $filter: ModelPersonalInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonalInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner
        image
        createdAt
        updatedAt
        email
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      instantNotification
      biWeeklyNotification
      biWeeklyDigest
      newsLetter
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        instantNotification
        biWeeklyNotification
        biWeeklyDigest
        newsLetter
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getPreference = /* GraphQL */ `
  query GetPreference($id: ID!) {
    getPreference(id: $id) {
      id
      publicDevice
      shareDiveNotes
      shareMyData
      scientificDiveNotes
      language
      unitSystemMetricC
      unitSystemMetricF
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPreferences = /* GraphQL */ `
  query ListPreferences(
    $filter: ModelPreferenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPreferences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        publicDevice
        shareDiveNotes
        shareMyData
        scientificDiveNotes
        language
        unitSystemMetricC
        unitSystemMetricF
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
