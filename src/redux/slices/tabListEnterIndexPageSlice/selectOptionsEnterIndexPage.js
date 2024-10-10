import { gql } from "@apollo/client";

export const readingNameQuery = (inputData) => {
  console.log(inputData);
  const factoryIdString = inputData.factoryIdArr.map((factory) => {
    return `{ eq: "${factory.nhaMayId}" }`;
  });
  return gql`
    query {
        GetSoDocChiSos ( first: 50,  where: { 
          deletedTime: {eq: null}, 
          tenSo: {contains: "${inputData.readingNameField}"}, 
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

export const contractKeyIdQuery = (inputData) => {
  console.log(inputData);
  const factoryIdString = inputData.factoryIdArr.map((factory) => {
    return `{ eq: "${factory.nhaMayId}" }`;
  });
  return gql`
      query {
        GetHopDongs ( first: 50,  where: { 
          deletedTime: {eq: null}, 
          keyId: {contains: "${inputData.contractKeyIdField}"}, 
          nhaMayId: {
            or: [${factoryIdString}]
        }}) {
          nodes {
            id
            keyId
          }
        }
      }
    `;
};

export const nameOrKeyIdOfCustomerQuery = (inputData) => {
  console.log(inputData);
  const factoryIdString = inputData.factoryIdArr.map((factory) => {
    return `{ eq: "${factory.nhaMayId}" }`;
  });
  return gql`
      query {
        GetKhachHangs (  where: { 
          deletedTime: {eq: null}, 
          nhaMayId: {
            or: [${factoryIdString}]
        }
          or : [
            { tenKhachHang: { contains: "${inputData.nameOrKeyIdOfCustomerField}" } },
            { keyId: { contains: "${inputData.nameOrKeyIdOfCustomerField}" } }
          ]
          }) {
          nodes {
            id
            keyId
            tenKhachHang
          }
        }
      }
    `;
};
