import gql from "graphql-tag";

export const GetPhongBans = gql`
  query {
    GetPhongBans(first: 100, where: { deletedTime: { eq: null } }) {
      nodes {
        description
        id
        name
      }
    }
  }
`;
