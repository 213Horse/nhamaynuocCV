import { gql } from '@apollo/client'

export const GetUserAccount = gql`
query{
  GetUsers(first: 100 where: { deletedTime: { eq: null } }
    order: { createdTime: DESC }){
    nodes{
      id
      userName
      normalizedUserName
      email
    }
  }
}
`