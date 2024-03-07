import { gql } from "@apollo/client";

export const GET_USER = gql `
query getUser {
    user {
      _id
      firstName
    }
  }
`;

export const GET_ITEM = gql `
  query getItem {
    item {
        _id
        name
        price
        description
    }
  }
`;

export const GET_ORDER = gql `
  query getOrder {
    order {
        products
        purchaseDate
    }
  }
`;

export const GET_CATEGORY = gql `
  query getCategory {
    category {
        name
        items
    }
  }
`