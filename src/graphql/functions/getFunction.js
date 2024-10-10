import gql from "graphql-tag";

export const queryFunction = gql`
    query {
        GetChucNangs {
            nodes {
                nguoiDungId,
                id,
                tenChucNang
            }
        }
    }
`