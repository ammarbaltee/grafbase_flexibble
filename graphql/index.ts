export const getUserQuery = `
  query GetUser($input: UserInput!) {
    user(input: $input) {
      id
      name
      email
      avatarUrl
      description
      githubUrl
      linkedInUrl
    }
  }
`;

export const createUserMutation = `
  mutation CreateUser($input: UserCreateInput!) {
    userCreate(input: $input) {
      user {
        id
        name
        email
        avatarUrl
        description
        githubUrl
        linkedInUrl
      }
    }
  }
`;
