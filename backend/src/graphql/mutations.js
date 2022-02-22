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
      email
      image
      createdAt
      updatedAt
      owner
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
      email
      image
      createdAt
      updatedAt
      owner
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
      email
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
