export const mockRoutes = [
    {
      "destinationTxFee": "4000",
      "bridgeFee": "3000",
      "duration": "low",
      "gas": "4000000000",
      "quote": "10000000",
      "route": [
        {
          "bridge": "celer",
          "bridgeTokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "name": "USDC",
          "part": 100
        }
      ]
    },
    {
      "destinationTxFee": "4000",
      "bridgeFee": "3000",
      "duration": "low",
      "gas": "4000000000",
      "quote": "10000000",
      "route": [
        {
          "bridge": "hop",
          "bridgeTokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "name": "USDC",
          "part": 100
        }
      ]
    },
    {
      "destinationTxFee": "5000",
      "bridgeFee": "3400",
      "duration": "low",
      "gas": "90000000000",
      "quote": "10000000",
      "route": [
        {
          "bridge": "celer",
          "bridgeTokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "name": "USDC",
          "part": 60
        },
        {
          "bridge": "hop",
          "bridgeTokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "name": "USDC",
          "part": 40
        }
      ]
    }
  ]