/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPersonalInfo = /* GraphQL */ `
  mutation CreatePersonalInfo(
    $input: CreatePersonalInfoInput!
    $condition: ModelPersonalInfoConditionInput
  ) {
    createPersonalInfo(input: $input, condition: $condition) {
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
export const updatePersonalInfo = /* GraphQL */ `
  mutation UpdatePersonalInfo(
    $input: UpdatePersonalInfoInput!
    $condition: ModelPersonalInfoConditionInput
  ) {
    updatePersonalInfo(input: $input, condition: $condition) {
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
export const deletePersonalInfo = /* GraphQL */ `
  mutation DeletePersonalInfo(
    $input: DeletePersonalInfoInput!
    $condition: ModelPersonalInfoConditionInput
  ) {
    deletePersonalInfo(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createPreference = /* GraphQL */ `
  mutation CreatePreference(
    $input: CreatePreferenceInput!
    $condition: ModelPreferenceConditionInput
  ) {
    createPreference(input: $input, condition: $condition) {
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
export const updatePreference = /* GraphQL */ `
  mutation UpdatePreference(
    $input: UpdatePreferenceInput!
    $condition: ModelPreferenceConditionInput
  ) {
    updatePreference(input: $input, condition: $condition) {
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
export const deletePreference = /* GraphQL */ `
  mutation DeletePreference(
    $input: DeletePreferenceInput!
    $condition: ModelPreferenceConditionInput
  ) {
    deletePreference(input: $input, condition: $condition) {
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
