import gql from "graphql-tag";

export const GET_ALL_INVOICE = gql`
query GetKhachHangs($first: Int, $name: String) {
  GetKhachHangs(first: $first, where: { tenKhachHang: { contains: $name } }) {
    nodes {
      id
      tenKhachHang
      isHide
    }
  }
}`;