import { gql } from "@apollo/client";

export const GetRoles = gql`
query {
   GetRoles {
     nodes {
       id,
       name,
       roleGroup
     }
   }
 }
`

export const GetUsers = gql`
  query GetUsers($first: Int, $after: String) {
    GetUsers(first: $first, after: $after, where: {deletedTime: {eq: null}}, order: { createdTime: DESC }) {
      nodes {
        id,
        userName,
        email, 
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;


export const GetUserRoles = gql`
  query GetUserRoles($first: Int, $after: String, $roleId: String) {
    GetUserRoles(first: $first, after: $after, where: {roleId: {eq: $roleId}}) {
      nodes {
        userId,
        roleId
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`