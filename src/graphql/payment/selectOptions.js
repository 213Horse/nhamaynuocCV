import { gql } from "@apollo/client";

export const billCollectorQuery = gql`
  query {
    GetUsers(first: 100, where: { phongBan: { name: { eq: "Cán bộ thu" } } }) {
      nodes {
        userName
        normalizedUserName
        id
        phongBan {
          id
          name
        }
      }
    }
  }
`;

export const meterReaderQuery = gql`
  query {
    GetUsers(first: 100, where: { phongBan: { name: { eq: "Cán bộ đọc" } } }) {
      nodes {
        userName
        id
        normalizedUserName
        phongBan {
          id
          name
        }
      }
    }
  }
`;

export const lineReadingQuery = (factoryId) => {
  const factoryIdString = factoryId.map((factory) => {
    return `{ eq: "${factory.nhaMayId}" }`;
  });
  return gql`
  query {
    GetTuyenDocs(
      first: 100,
      where: {
        nhaMayId: {
        or: [${factoryIdString}]
      }
      }
    ) {
      nodes {
        tenTuyen
        id
      }
      totalCount
    }
  }
  `;
};

export const customerNameQuery = (inputData) => {
  console.log(inputData);
  const factoryIdString = inputData.factoryIdArr.map((factory) => {
    return `{ eq: "${factory.nhaMayId}" }`;
  });
  return gql`
  query {
    GetKhachHangs(first: 100, where: { 
      tenKhachHang: { contains: "${inputData.customerNameField}" } 
      nhaMayId: {
      or: [${factoryIdString}]
    }}) {
      nodes {
        id
        tenKhachHang
        isHide
        nhaMayId
      }
    }
  }
  `;
};

export const phoneNumberQuery = (inputData) => {
  console.log(inputData);
  const factoryIdString = inputData.factoryIdArr.map((factory) => {
    return `{ eq: "${factory.nhaMayId}" }`;
  });
  return gql`
  query {
    GetKhachHangs(first: 100, where: { 
      dienThoai: { contains: "${inputData.phoneNumberField}" } 
      nhaMayId: {
      or: [${factoryIdString}]
    }}) {
      nodes {
        id
        isHide
        nhaMayId
        dienThoai
      }
    }
  }
  `;
};
