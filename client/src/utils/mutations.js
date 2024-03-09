import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    user {
      _id
      firstName
      lastName
      email
    }
    token
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        email
       
      }
      token
    }
  }
`;

export const ADD_ITEM = gql`
mutation Mutation($description: String!, $name: String!, $price: Int) {
  addItem(description: $description, name: $name, price: $price) {
    name
    price
    description
  }
}
`;
export const REMOVE_ITEM = gql`
mutation RemoveItem($userId: ID!, $itemId: ID!) {
  removeItem(userId: $userId, itemId: $itemId) {
    success
    message
  }
}
`
export const ADD_ORDER = gql`
mutation Mutation($userId: [ID]!, $items: [ID]!) {
  addOrder(userId: $userId, items: $items) {
    items {
      description
      name
      price
      _id
    }
    _id
  }
}
`
