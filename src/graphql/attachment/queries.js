import gql from "graphql-tag";

// get by hopDongId -> list file đính kèm
const LOAD_ATTACHMENTS = gql`
  query GetHopDongById($first: Int!, $after: String, $hopDongId: String!) {
    GetHopDongs(
      first: $first
      after: $after
      where: { id: { eq: $hopDongId } }
    ) {
      nodes {
        id
        keyId
        nhaMayId
        khachHang {
          id
          keyId
          tenKhachHang
        }
        fileDinhKems(
          where: { deletedTime: { eq: null } }
          order: { createdTime: DESC }
        ) {
          id
          tenFileDinhKem
          duongdan
          deletedBy
          hopDongId
          duongdan
          trangThaiFile
          deletedTime
          createdTime
          lastUpdatedTime
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// get by id attachment
const LOAD_ATTACHMENT = gql`
  query GetFileDinhKems($id: String!) {
    GetFileDinhKems(where: { id: { eq: $id } }) {
      nodes {
        id
        tenFileDinhKem
        duongdan
        deletedBy
        hopDongId
        duongdan
        trangThaiFile
        deletedTime
        createdTime
        lastUpdatedTime
      }
    }
  }
`;

export { LOAD_ATTACHMENTS, LOAD_ATTACHMENT };
