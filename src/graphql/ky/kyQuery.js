import gql from 'graphql-tag'

export const GetKyGhiChiSos = gql`
   query {
      GetKyGhiChiSos {
         nodes {
            id,
            keyId,
            moTa,
            ngaySuDungTu,
            ngaySuDungDen,
            ngayHoaDon,
            nhaMayId
         }
      }
   }
`