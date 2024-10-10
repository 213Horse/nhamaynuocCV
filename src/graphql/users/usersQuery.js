import { gql } from "@apollo/client";

export const GetUserQuery = gql`
  query GetUsers($first: Int) {
    GetUsers(
      first: $first
      where: { deletedTime: { eq: null } }
      order: { createdTime: DESC }
    ) {
      nodes {
        email
        id
        userName
        phongBan {
          name
        }
      }
    }
  }
`;

export const GetPhongBanQuery = gql`
  query GetUsers($idUser: String!) {
    GetUsers(where: { id: { eq: $idUser } }) {
      nodes {
        phongBanId
      }
    }
  }
`;

// Get all -> cán bộ đọc
const LOAD_ALL_CAN_BO_DOC = gql`
  query GetUsers($first: Int!, $roleCanBo: String!) {
    GetUsers(
      first: $first
      where: {
        deletedTime: { eq: null }
        phongBan: { name: { eq: $roleCanBo } }
      }
    ) {
      nodes {
        id
        userName
        normalizedUserName
        phongBan {
          id
          name
        }
        normalizedUserName
      }
      totalCount
    }
  }
`;

export { LOAD_ALL_CAN_BO_DOC };
