/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
      id
      title
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreatePersonalInfo = /* GraphQL */ `
  subscription OnCreatePersonalInfo($email: String) {
    onCreatePersonalInfo(email: $email) {
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
export const onUpdatePersonalInfo = /* GraphQL */ `
  subscription OnUpdatePersonalInfo($email: String) {
    onUpdatePersonalInfo(email: $email) {
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
export const onDeletePersonalInfo = /* GraphQL */ `
  subscription OnDeletePersonalInfo($email: String) {
    onDeletePersonalInfo(email: $email) {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($owner: String) {
    onCreateNotification(owner: $owner) {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification($owner: String) {
    onUpdateNotification(owner: $owner) {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification($owner: String) {
    onDeleteNotification(owner: $owner) {
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
export const onCreatePreference = /* GraphQL */ `
  subscription OnCreatePreference($owner: String) {
    onCreatePreference(owner: $owner) {
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
export const onUpdatePreference = /* GraphQL */ `
  subscription OnUpdatePreference($owner: String) {
    onUpdatePreference(owner: $owner) {
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
export const onDeletePreference = /* GraphQL */ `
  subscription OnDeletePreference($owner: String) {
    onDeletePreference(owner: $owner) {
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
