import { gql } from "@apollo/client";

const LOAD_ACTIONLOG = gql`
query {
  GetAuditLogs(
    first: 100
    where: { deletedTime:{ eq: null } userName:{neq:null}  }
    order: { createdTime: DESC }
  ) {
    nodes {
      remoteHost
      claims
      id
      deletedTime
      createdTime
      lastUpdatedTime
      httpURL
      localAddress
      headers
      form
      responseStatusCode
      resQuestBody
      responseBody
      userId
      userName
    }
  }
}
`;
export { LOAD_ACTIONLOG };
