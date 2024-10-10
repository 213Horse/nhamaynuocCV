import { gql } from "@apollo/client";

const LOAD_TUYEN_DOC_BY_NHA_MAY_ID = gql`
  query GetTuyenDocs($first: Int!, $after: String, $nhaMayId: [String]) {
    GetTuyenDocs(
      first: $first
      after: $after
      where: {
        and: [{ nhaMayId: { in: $nhaMayId } }, { deletedTime: { eq: null } }]
      }
    ) {
      nodes {
        id
        keyId
        tenTuyen
        nhaMayId
        khuVuc {
          id
          keyId
          tenKhuVuc
        }
        nhanVienXem
        nhanVienSua
        nhanVienDocChiSoId
        nguoiQuanLyId
        nguoiThuTienId
        sdtNguoiThu
        diaChiThu
        thoiGianThu
        deletedTime
        isHide
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;
const LOAD_TUYEN_DOC = gql`
  query GetTuyenDocs($first: Int!, $after: String, $nhaMayId: String!) {
    GetTuyenDocs(
      where: { deletedTime: { eq: null } }
      order: [{ createdTime: DESC }]
    ) {
      nodes {
        id
        keyId
        tenTuyen
        nhaMayId
        khuVuc {
          id
          keyId
          tenKhuVuc
        }
        nhanVienXem
        nhanVienSua
        nhanVienDocChiSoId
        nguoiQuanLyId
        nguoiThuTienId
        sdtNguoiThu
        diaChiThu
        thoiGianThu
        deletedTime
        isHide
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;
export { LOAD_TUYEN_DOC_BY_NHA_MAY_ID, LOAD_TUYEN_DOC };
