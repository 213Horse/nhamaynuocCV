import { gql } from "@apollo/client";

export const GetRolesQuery = gql`
    query {
        GetRoles {
           nodes {
            id,
            name
           }  
        }
    }
`

export const GetPhongBansQuery = gql`
query{
  GetPhongBans(first: 100,  where: { deletedTime: { eq: null } }
      order: { createdTime: DESC }){
    nodes{
      id
       name
    }
  }
}
`