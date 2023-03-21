import { gql } from "@apollo/client";

const getTasks = gql`
  query searchTodo($keyWord: String!) {
    searchTodo(keyWord: $keyWord) {
      id
      title
      description
      dueDate
      piority
      completed
    }
  }
`;

export { getTasks };
