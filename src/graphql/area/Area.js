import gql from 'graphql-tag'

export const getArea = gql`
query {
    GetKhuVucs {
      nodes {
        id
        tenKhuVuc
      }
    }
  }  
`