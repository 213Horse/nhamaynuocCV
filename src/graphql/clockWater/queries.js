import { gql } from "@apollo/client";

const LOAD_CLOCK_WATER_BY_KEY_ID = gql`
  query GetDongHoNuocs($keyId: String!) {
    GetDongHoNuocs(where: { keyId: { eq: $keyId } }) {
      nodes {
        id
        keyId
        trangThaiSuDung
        seriDongHo
        ngaySuDung
        donViHC
        loaiDongHo
        loaiDongHoId
        nguoiQuanLyId
        tuyenDocId
        dongHoChaId
        soThuTu
        chiSoDau
        chiSoCuoi
        seriChi
        diaChi
        toaDo
        kinhDo
        viDo
        nuocSX
        hangSX
        kieuDongHo
        duongKinh
        hopBaoVe
        viTriLapDat
        ngayKiemDinh
        hieuLucKD
        lyDoKiemDinh
        vanMotChieu
        trangThaiDHLap
        soTem
        soPhieuThay
        lyDoThay
        lyDoHuy
        maDHThay
        nguoiThay
        khuyenMai
        ongDan
        daiKhoiThuy
        hopDongId
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
        deletedTime
      }
      totalCount
    }
  }
`;
const LOAD_CLOCK_WATER = gql`
  query {
    GetDongHoNuocs(
      where: {
        deletedTime: { eq: null }
        trangThaiSuDung: { eq: DANG_SU_DUNG }
        loaiDongHoId: { eq: BLOCK }
      }
      order: [{ createdTime: DESC }]
    ) {
      totalCount
      nodes {
        tuyenDocId
        tenDongHo
        tuyenDoc {
          tenTuyen
        }
        keyId
        trangThaiSuDung
        dongHoChaId
        kinhDo
        viDo
        loaiDongHo
        loaiDongHoId
        thatThoats {
          soLuong
        }
        id
        hopDong {
          keyId
          khachHang {
            keyId
            tenKhachHang
            nguoiDaiDien
          }
        }
        dongHoChaId
        soTem
        diaChi
      }
    }
  }
`;
export { LOAD_CLOCK_WATER_BY_KEY_ID, LOAD_CLOCK_WATER };
