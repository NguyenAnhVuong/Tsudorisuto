import { gql } from "@apollo/client";

const testQuery = gql`
  query test {
    todo(id: 1) {
      id
      title
    }
  }
`;

export { testQuery };
