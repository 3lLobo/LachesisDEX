export const realRoutes = [
  {
    routes: [
      {
        duration: 'low',
        gas: '',
        quote: {
          bridgeFee: '0',
          destinationTxFee: '0',
          amount: '111089707702126620892',
          decimals: 18,
        },
        route: [
          {
            bridge: 'hop',
            bridgeTokenAddress: '0x0000000000000000000000000000000000000000',
            name: 'USDC',
            part: 100,
          },
        ],
      },
      {
        duration: 'low',
        gas: '',
        quote: {
          bridgeFee: '111000000000000000',
          destinationTxFee: '0',
          amount: '110889000000000000000',
          decimals: 18,
        },
        route: [
          {
            bridge: 'debridge',
            bridgeTokenAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
            name: 'USDC',
            part: 100,
            bridgeFeeInNativeToken: '10000000000000000',
          },
        ],
      },
      {
        duration: 'low',
        gas: '0',
        quote: {
          bridgeFee: '44397101718689919',
          destinationTxFee: '322759879003278',
          amount: '110948034435127106291',
          decimals: 18,
        },
        route: [
          {
            bridge: 'celer',
            bridgeTokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            name: 'USDC',
            part: 100,
            maxSlippage: 5467,
          },
        ],
      },
    ],
    fromToken: { symbol: 'WETH', name: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
    fromChain: {
      chainId: 1,
      name: 'Ethereum',
      slug: 'ethereum',
    },
    toToken: { symbol: 'WETH', name: 'WETH' },
    toChain: { chainId: 137, name: 'Polygon', slug: 'polygon' },
  },
]

export const mockRoutes = [
  {
    destinationTxFee: '4000',
    bridgeFee: '3000',
    duration: 'low',
    gas: '4000000000',
    quote: '10000000',
    route: [
      {
        bridge: 'celer',
        bridgeTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        name: 'USDC',
        part: 100,
      },
    ],
  },
  {
    destinationTxFee: '4000',
    bridgeFee: '3000',
    duration: 'low',
    gas: '4000000000',
    quote: '10000000',
    route: [
      {
        bridge: 'hop',
        bridgeTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        name: 'USDC',
        part: 100,
      },
    ],
  },
  {
    destinationTxFee: '5000',
    bridgeFee: '3400',
    duration: 'low',
    gas: '90000000000',
    quote: '10000000',
    route: [
      {
        bridge: 'celer',
        bridgeTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        name: 'USDC',
        part: 60,
      },
      {
        bridge: 'hop',
        bridgeTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        name: 'USDC',
        part: 40,
      },
    ],
  },
]
