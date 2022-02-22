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
      email
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePersonalInfo = /* GraphQL */ `
  subscription OnUpdatePersonalInfo($email: String) {
    onUpdatePersonalInfo(email: $email) {
      id
      name
      email
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePersonalInfo = /* GraphQL */ `
  subscription OnDeletePersonalInfo($email: String) {
    onDeletePersonalInfo(email: $email) {
      id
      name
      email
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
