import { gql } from "@apollo/client";

const resgisterMutation = gql`
  mutation register($uid: String!, $name: String!) {
    createUser(createUserInput: { uid: $uid, name: $name }) {
      createdAt
    }
  }
`;

const addTaskMutation = gql`
  mutation createTodo(
    $title: String!
    $description: String!
    $dueDate: String!
    $piority: Int!
  ) {
    createTodo(
      createTodoInput: {
        title: $title
        description: $description
        dueDate: $dueDate
        piority: $piority
      }
    ) {
      createdAt
    }
  }
`;

const updateTaskMutation = gql`
  mutation updateTodo(
    $id: Int!
    $title: String!
    $description: String!
    $dueDate: String!
    $completed: Boolean!
    $piority: Int!
  ) {
    updateTodo(
      updateTodoInput: {
        id: $id
        title: $title
        description: $description
        dueDate: $dueDate
        completed: $completed
        piority: $piority
      }
    ) {
      updatedAt
    }
  }
`;

const deleteTaskMutation = gql`
  mutation removeTodos($ids: [Int!]!) {
    removeTodos(ids: $ids) {
      count
    }
  }
`;

export {
  resgisterMutation,
  addTaskMutation,
  updateTaskMutation,
  deleteTaskMutation,
};
