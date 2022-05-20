import { gql } from '@apollo/client'

export const swapQuery = gql`
query Query($first: Int, $orderBy: Swap_orderBy, $where: Swap_filter, $orderDirection: OrderDirection) {
  swaps(first: $first, orderBy: $orderBy, where: $where, orderDirection: $orderDirection) {
    token0 {
        symbol
        name
    }
    token1 {
        symbol
        name
    }
    amount0
    amount1
    amountUSD
    timestamp
  }
}
`
// {
//     "first": 11,
//     "orderBy": "timestamp",
//     "where": {
//       "amountUSD_gt": 111
//     },
//     "orderDirection": "desc"
//   }