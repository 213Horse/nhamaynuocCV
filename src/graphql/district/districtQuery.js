import gql from 'graphql-tag'

export const GetQuanHuyens = gql`
	query GetQuanHuyens($first: Int, $after: String) {
		GetQuanHuyens(first: $first, after: $after, where: {deletedTime: {eq: null}}, order: { createdTime: DESC }) {
			nodes {
				keyId,
				ten,
				code,
				codename,
				cap,
				shortCodename,
				tinhThanhId,
				tinhThanh {
					id,
					keyId,
					ten,
					code,
					codeName,
					cap,
					phoneCode
				},
				deletedTime
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			totalCount
		}
	}
`