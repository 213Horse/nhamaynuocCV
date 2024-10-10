import { gql } from "@apollo/client";

export const GetWardQuery = gql`
  query GetPhuongXas($first: Int, $after: String) {
    GetPhuongXas(
      first: $first
      after: $after
      where: { deletedTime: { eq: null } }
      order: { createdTime: DESC }
    ) {
      nodes {
        id
        keyId
        ten
        codename
        quanHuyen {
          id
          ten
          tinhThanh {
            id
            ten
          }
        }
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

export const GetInfoToAddWardQuery = gql`
  query {
    GetTinhThanhs(
      first: 100
      where: { deletedTime: { eq: null } }
      order: { createdTime: DESC }
    ) {
      nodes {
        id
        ten
        quanHuyens {
          id
          ten
        }
      }
    }
  }
`;

// Get all tỉnh
export const GetAllTinh = gql`
  query GetTinhThanhs($first: Int!, $after: String) {
    GetTinhThanhs(
      first: $first
      after: $after
      where: { deletedTime: { eq: null } }
    ) {
      nodes {
        id
        keyId
        ten
        deletedTime
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

// Get all huyen
export const GetAllHuyen = gql`
  query {
    GetQuanHuyens(where: { deletedTime: { eq: null } }) {
      nodes {
        id
        keyId
        ten
        codename
        tinhThanhId
        deletedTime
      }
      totalCount
    }
  }
`;

// Get huyện từ tỉnh (tinhId)
export const GetHuyenTuTinh = gql`
  query GetQuanHuyens($first: Int!, $after: String, $tinhThanhId: String!) {
    GetQuanHuyens(
      first: $first
      after: $after
      where: {
        and: [
          { tinhThanhId: { eq: $tinhThanhId } }
          { deletedTime: { eq: null } }
        ]
      }
    ) {
      nodes {
        id
        keyId
        ten
        tinhThanhId
        deletedTime
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

// Get xã từ huyện (huyenId)
export const GetXaTuHuyen = gql`
  query GetPhuongXas($first: Int!, $after: String, $quanHuyenId: String!) {
    GetPhuongXas(
      first: $first
      after: $after
      where: {
        and: [
          { quanHuyenId: { eq: $quanHuyenId } }
          { deletedTime: { eq: null } }
        ]
      }
    ) {
      nodes {
        id
        keyId
        ten
        quanHuyenId
        deletedTime
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

//get Tinh and Huyen by XaId

export const GetTinhAndHuyenByXaId = gql`
  query GetPhuongXas($id: String!) {
    GetPhuongXas(
      first: 1
      where: { deletedTime: { eq: null }, id: { eq: $id } }
    ) {
      nodes {
        id
        ten
        quanHuyen {
          id
          ten
          tinhThanh {
            id
            ten
          }
        }
        deletedTime
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;
