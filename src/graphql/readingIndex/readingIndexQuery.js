import gql from "graphql-tag";

// TODO: all graphql for readingIndex

// 1. query SoDocChiSo
export const GetReadingIndexQuery = gql`
  query {
    GetSoDocChiSos(order: { createdTime: DESC }) {
      nodes {
        tenTuyenDoc
        tenSo
        chotSo
        hoaDon
        ngayChot
        tuyenDocId
        keyId
        trangThai
        trangThaiKhoaSo
      }
    }
  }
`;

// 2. query KiGhiChiSo

export const GetKyGhiChiSoQuery = gql`
  query {
    GetKyGhiChiSos(
      order: { createdTime: DESC }
      where: { deletedTime: { eq: null } }
    ) {
      nodes {
        id
        keyId
        moTa
      }
    }
  }
`;

// 3. query TuyenDoc

export const GetTuyenDocQuery = gql`
  query {
    GetTuyenDocs(
      where: { deletedTime: { eq: null } }
      order: { createdTime: DESC }
    ) {
      nodes {
        id
        tenTuyen
      }
    }
  }
`;

// 4. query KhuVuc

export const GetKhuVucQuery = gql`
  query {
    GetKhuVucs(
      where: { deletedTime: { eq: null }, isHide: { eq: false } }
      order: { createdTime: DESC }
    ) {
      nodes {
        id
        tenKhuVuc
      }
    }
  }
`;

// 5. query TuyenDoc

export const GetTuyenDocByNhaMayIdQuery = gql`
  query GetTuyenDocs($first: Int!, $after: String, $nhaMayId: [String]!) {
    GetTuyenDocs(
      first: $first
      after: $after
      where: {
        or: [{ nhaMayId: { in: $nhaMayId } }, { deletedTime: { eq: null } }]
      }
    ) {
      nodes {
        id
        tenTuyen
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

// 6. query tenSo

export const tenSoQuery = (inputData) => {
  console.log(inputData);
  const factoryIdString = inputData.factoryIdArr.map((factory) => {
    return `{ eq: "${factory.nhaMayId}" }`;
  });
  return gql`
  query {
    GetSoDocChiSos(first: 100, where: { 
      tenSo: { contains: "${inputData.tenSoField}" } 
      nhaMayId: {
      or: [${factoryIdString}]
    }}) {
      nodes {
        id
        tenSo
      }
    }
  }
  `;
};
