import gql from "graphql-tag";

export const GetTuyenDocs = gql`
  query GetTuyenDocs($first: Int, $nhaMayId: [String]) {
    GetTuyenDocs(
      first: $first
      order: { createdTime: DESC }
      where: {
        deletedTime: { eq: null }
        isHide: { eq: false }
        nhaMayId: { in: $nhaMayId }
      }
    ) {
      nodes {
        id
        keyId
        nhaMayId
        nguoiQuanLyId
        tenTuyen
        nguoiThuTienId
        sdtNguoiThu
        diaChiThu
        thoiGianThu
        sdtHoaDon
        sdtSuaChua
        kyGhiChiSoId
        nhanVienXem
        nhanVienSua
        nhanVienDocChiSoId
        ngayGhiCSTu
        ngayGhiCSDen
        khuVucId
        khuVuc {
          id
          keyId
          tenKhuVuc
        }
        createdTime
      }
    }
  }
`;

export const GetTuyenDocsByNhaMay = gql`
  query GetTuyenDocs($first: Int, $nhaMayId: [String]) {
    GetTuyenDocs(
      first: $first
      order: { createdTime: DESC }
      where: { deletedTime: { eq: null }, nhaMayId: { in: $nhaMayId } }
    ) {
      nodes {
        id
        keyId
        nhaMayId
        nguoiQuanLyId
        tenTuyen
        nguoiThuTienId
        sdtNguoiThu
        diaChiThu
        thoiGianThu
        sdtHoaDon
        sdtSuaChua
        kyGhiChiSoId
        nhanVienXem
        nhanVienSua
        nhanVienDocChiSoId
        ngayGhiCSTu
        ngayGhiCSDen
        khuVucId
        khuVuc {
          id
          keyId
          tenKhuVuc
        }
        createdTime
      }
    }
  }
`;
