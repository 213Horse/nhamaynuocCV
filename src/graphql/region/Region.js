import gql from 'graphql-tag'

export const getRegion = gql`
query{
    GetVungs{
      nodes{
        id
        tenVung
      }
    }
  }
`