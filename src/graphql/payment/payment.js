import { gql } from "@apollo/client";

export const payment = gql`
  query GetHoaDons($first: Int!) {
    GetHoaDons(first: $first) {
      nodes {
        thanhToans {
          soHoaDon
          trangThaiThanhToan
          nguoiThuTienId
          ghiChu
          tongTienTruocVat
          vat
          phiDtdn
          phiBvmt
          ngayThu
          ngayLapHD
          tongTienHoaDon
          tienDaThanhToan
          tieuThu
          hinhThucTT
          trangThai
          seriHoaDon
          hoaDonId
          id
          createdBy
          maKhachHang
          tenKhachHang
          diaChi
          dienThoai
          hinhThucTT
          soHoaDon
          seriHoaDon
          tieuThu
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;
