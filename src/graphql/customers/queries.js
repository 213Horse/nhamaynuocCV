import { gql } from "@apollo/client";

// Get all list customer
const LOAD_CUSTOMERS = gql`
  query GetHopDongs($first: Int!, $after: String, $nhaMayId: [String]) {
    GetHopDongs(
      first: $first
      after: $after
      where: {
        and: [
          { deletedTime: { eq: null } }
          { isHide: { eq: false } }
          { nhaMayId: { in: $nhaMayId } }
        ]
      }
      order: { createdTime: DESC }
    ) {
      nodes {
        id
        keyId
        nhaMayId
        khachHang {
          id
          keyId
          deletedTime
          isHide
          loaiKhachHang
          tenKhachHang
          dienThoai
          email
          maSoThue
          soHo
          soKhau
        }
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

// const LOAD_CUSTOMERS = gql`
//   query GetKhachHangs($first: Int!, $after: String) {
//     GetKhachHangs(
//       first: $first
//       after: $after
//       where: {
//         and: [
//           { deletedTime: { eq: null } }
//           { isHide: { eq: false } }
//           #{ hopDongs: { some: { deletedTime: { eq: null } } } }
//         ]
//       }
//       order: { createdTime: DESC }
//     ) {
//       nodes {
//         id
//         keyId
//         diaChi
//         dienThoai
//         doiTuong
//         email
//         ghiChu
//         loaiKhachHang
//         maSoThue
//         ngayCapCmnd
//         nguoiDaiDien
//         nguonNuoc
//         nhaMayId
//         noiCapCmnd
//         soCmnd
//         soHo
//         soKhau
//         tenKhachHang
//         tenThuongGoi
//         createdBy
//         createdTime
//         deletedTime
//         deletedBy
//         isHide
//         hopDongs(where: { isHide: { eq: false } }) {
//           id
//           keyId
//           isHide
//         }
//       }
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//       totalCount
//     }
//   }
// `;

// Get by nhaMayId -> list customer

const LOAD_CUSTOMERS_BY_NHA_MAY_ID = gql`
  query GetHopDongs($first: Int!, $after: String, $nhaMayId: String!) {
    GetHopDongs(
      first: $first
      after: $after
      where: {
        and: [
          { nhaMayId: { eq: $nhaMayId } }
          { deletedTime: { eq: null } }
          { isHide: { eq: false } }
        ]
      }
      order: { createdTime: DESC }
    ) {
      nodes {
        id
        keyId
        nhaMayId
        khachHang {
          id
          keyId
          deletedTime
          isHide
          loaiKhachHang
          tenKhachHang
          dienThoai
          email
          maSoThue
          soHo
          soKhau
        }
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

// const LOAD_CUSTOMERS_BY_NHA_MAY_ID = gql`
//   query GetKhachHangs($first: Int!, $after: String, $nhaMayId: String!) {
//     GetKhachHangs(
//       first: $first
//       after: $after
//       where: {
//         and: [
//           { deletedTime: { eq: null } }
//           { isHide: { eq: false } }
//           { nhaMayId: { eq: $nhaMayId } }
//           #{ hopDongs: { some: { deletedTime: { eq: null } } } }
//         ]
//       }
//       order: { createdTime: DESC }
//     ) {
//       nodes {
//         id
//         keyId
//         diaChi
//         dienThoai
//         doiTuong
//         email
//         ghiChu
//         loaiKhachHang
//         maSoThue
//         ngayCapCmnd
//         nguoiDaiDien
//         nguonNuoc
//         nhaMayId
//         noiCapCmnd
//         soCmnd
//         soHo
//         soKhau
//         tenKhachHang
//         tenThuongGoi
//         createdBy
//         createdTime
//         deletedTime
//         deletedBy
//         isHide
//         hopDongs(where: { isHide: { eq: false } }) {
//           id
//           keyId
//           isHide
//         }
//       }
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//       totalCount
//     }
//   }
// `;

// Get by customer id

const LOAD_CUSTOMER_GET_BY_ID = gql`
  query GetKhachHangs($keyId: String!) {
    GetKhachHangs(
      where: {
        and: [
          { keyId: { eq: $keyId } }
          { isHide: { eq: false } }
          { deletedTime: { eq: null } }
        ]
      }
    ) {
      nodes {
        id
        keyId
        nhaMayId
        tenKhachHang
        loaiKhachHang
        soCmnd
        ngayCapCmnd
        noiCapCmnd
        maSoThue
        ghiChu
        doiTuong
        dienThoai
        soKhau
        nguoiDaiDien
        soKhau
        soHo
        nguonNuoc
        diaChi
        email
        tenThuongGoi
        deletedTime
        isHide
        hopDongs(
          where: { isHide: { eq: false } }
          order: { deletedTime: ASC }
        ) {
          id
          keyId
          camKetSuDungNuoc
          chungTu
          diachi
          doiTuongGiaId
          dongHoNuocs(
            where: { deletedTime: { eq: null } }
            order: { trangThaiSuDung: ASC }
          ) {
            id
            keyId
            chiSoCuoi
            chiSoDau
            daiKhoiThuy
            diaChi
            donViHC
            dongHoChaId
            duongKinh
            hangSXId
            hieuLucKD
            hopDongId
            khuyenMai
            kieuDongHoId
            kinhDo
            #hopBaoVe
            #loaiDiemId
            #lyDoKiemDinh
            loaiDongHo
            #loaiDongHoId
            lyDoHuy
            lyDoThay
            maDHThay
            ngayKetThuc
            ngayKiemDinh
            ngayLapDat
            ngaySuDung
            nguoiQuanLyId
            nguoiThayId # nguoiThayId -> nguoiThay.
            nuocSXId
            ongDan
            seriChi
            seriDongHo
            soPhieuThay
            soTem
            soThuTu
            toaDo
            trangThaiDHLap
            trangThaiSuDung
            tuyenDocId
            tuyenDoc {
              id
              keyId
              tenTuyen
              khuVuc {
                id
                keyId
                tenKhuVuc
                vung {
                  id
                  keyId
                  tenVung
                  deletedTime
                }
                deletedTime
              }
              deletedTime
            }
            vanMotChieu
            viDo
            viTriLapDat
            deletedTime
          }
          ghiChu
          giamTruTheo
          hinhThucThanhToan
          khachHangId
          khoiLuongCamKet
          khuVucThanhToan
          kinhDo
          maVach
          mucDichSuDung
          ngayCoHieuLuc
          ngayDatCoc
          ngayKyHopDong
          ngayLapDat
          ngayNopTien
          nguoiLapDatId
          nguoiNop
          nhaMayId
          phuongThucThanhToan {
            id
            keyId
            moTaPhuongThuc
            deletedTime
          }
          phuongThucThanhToanId
          soTien
          tienDatCoc
          tienLapDat
          viDo
          deletedTime
          isHide
        }
      }
      totalCount
    }
  }
`;

// Filter customer
const FILTER_LOAD_CUSTOMERS = gql`
  query GetHopDongs(
    $first: Int!
    $after: String
    $khachHangKeyId: String!
    $tenKhachHang: String!
    $soHo: Int!
    $hopDongKeyId: String!
    $seriDongHo: String!
    $tuyenDocKeyId: String!
    $nhaMayId: String!
    $canBoDocId: String!
  ) {
    GetHopDongs(
      first: $first
      after: $after
      where: {
        and: [
          { keyId: { contains: $hopDongKeyId } }
          { deletedTime: { eq: null } }
          { isHide: { eq: false } }
          # Khách hàng
          { khachHang: { keyId: { contains: $khachHangKeyId } } }
          { khachHang: { tenKhachHang: { contains: $tenKhachHang } } }
          { khachHang: { soHo: { gte: $soHo } } }
          { khachHang: { isHide: { eq: false } } }
          { khachHang: { deletedTime: { eq: null } } }
          { khachHang: { nhaMayId: { eq: $nhaMayId } } }
        ]
      }
      order: { createdTime: DESC }
    ) {
      nodes {
        id
        keyId
        isHide
        deletedTime
        khachHang {
          id
          keyId
          tenKhachHang
          loaiKhachHang
          dienThoai
          email
          soHo
          nhaMayId
          isHide
          deletedTime
        }
        dongHoNuocs(
          where: {
            and: [
              { seriDongHo: { contains: $seriDongHo } }
              { tuyenDoc: { keyId: { contains: $tuyenDocKeyId } } }
              { tuyenDoc: { nguoiQuanLyId: { contains: $canBoDocId } } }
            ]
          }
        ) {
          id
          keyId
          seriDongHo
          tuyenDoc {
            id
            keyId
            nhanVienXem
            nhanVienSua
            khuVuc {
              id
              keyId
              tenKhuVuc
              vung {
                id
                keyId
                tenVung
                khuVucs {
                  id
                  keyId
                  tenKhuVuc
                }
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;

// Filter customer (Modal info customer )
const FILTER_MODAL_INFO_CUSTOMERS = gql`
  query GetHopDongs(
    $hopDongKeyId: String!
    $ngayKyHopDongTu: DateTime!
    $ngayKyHopDongDen: DateTime!
    $nguoiLapDat: String!
    $ngayLapDatTu: DateTime!
    $ngayLapDatDen: DateTime!
  ) {
    GetHopDongs(
      where: {
        and: [
          { keyId: { contains: $hopDongKeyId } }
          { ngayKyHopDong: { gte: $ngayKyHopDongTu, lte: $ngayKyHopDongDen } }
          { nguoiLapDat: { contains: $nguoiLapDat } }
          { ngayLapDat: { gte: $ngayLapDatTu, lte: $ngayLapDatDen } }
          { isHide: { eq: false } }
          { deletedTime: { eq: null } }
          # Khách hàng
          { khachHang: { isHide: { eq: false } } }
          { khachHang: { deletedTime: { eq: null } } }
        ]
      }
    ) {
      nodes {
        id
        keyId
        ngayKyHopDong
        nguoiLapDat
        ngayLapDat
        isHide
        deletedTime
        khachHang {
          id
          keyId
          diaChi
          dienThoai
          doiTuong
          email
          ghiChu
          loaiKhachHang
          maSoThue
          ngayCapCmnd
          nguoiDaiDien
          nguonNuoc
          nhaMayId
          noiCapCmnd
          soCmnd
          soHo
          soKhau
          tenKhachHang
          tenThuongGoi
          createdBy
          createdTime
          deletedTime
          deletedBy
          isHide
        }
        dongHoNuocs {
          id
          keyId
          seriDongHo
          tuyenDoc {
            id
            keyId
            nhanVienXem
            nhanVienSua
            khuVuc {
              id
              keyId
              tenKhuVuc
              vung {
                id
                keyId
                tenVung
                khuVucs {
                  id
                  keyId
                  tenKhuVuc
                }
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;

export {
  LOAD_CUSTOMERS,
  LOAD_CUSTOMERS_BY_NHA_MAY_ID,
  LOAD_CUSTOMER_GET_BY_ID,
  FILTER_LOAD_CUSTOMERS,
  FILTER_MODAL_INFO_CUSTOMERS,
};
