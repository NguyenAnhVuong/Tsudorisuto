import { gql } from "@apollo/client";

const resgisterMutation = gql`
  mutation register($uid: String!, $name: String!) {
    createUser(createUserInput: { uid: $uid, name: $name }) {
      createdAt
    }
  }
`;

export { resgisterMutation };
