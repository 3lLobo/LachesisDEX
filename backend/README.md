# This is the backend

## Deploy Uniswap contracts

No need to clone the repo, compile the contracts. We can import them from the `@uniswap/v3-[core, periphery]` package as abi and bytecode.
These can be deployed as usual with hardhat.

Use the deploy scripts:

```bash
npx hardhat run scripts/deploy.js --network <yourNetwork>
```

## Peripheral contracts

Some of these contracts depend on other contracts addresses.

| Contract                           | Constructor                                         | Source Code                                                                                                                   |
| ---------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Multicall2                         |                                                     | https://etherscan.io/address/0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696#code                                                  |
| UniswapV3Factory                   |                                                     | https://github.com/Uniswap/uniswap-v3-core/blob/v1.0.0/contracts/UniswapV3Factory.sol                                         |
| ProxyAdmin                         |                                                     | https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/ProxyAdmin.sol                  |
| TickLens                           |                                                     | https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/TickLens.sol                                       |
| Quoter                             | address \_factory, address \_WETH9                  | https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/lens/Quoter.sol                                         |
| SwapRouter                         | address \_factory, address \_WETH9                  | https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/SwapRouter.sol                                          |
| NFTDescriptor                      |                                                     | https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/libraries/NFTDescriptor.sol                             |
| NonfungibleTokenPositionDescriptor | address \_WETH9, bytes32 \_nativeCurrencyLabelBytes | https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungibleTokenPositionDescriptor.sol                  |
| TransparentUpgradeableProxy        |                                                     | https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.1-solc-0.7-2/contracts/proxy/TransparentUpgradeableProxy.sol |
| NonfungiblePositionManager         | address \_factory,                                  |

        address _WETH9,
        address _tokenDescriptor_ |  https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/NonfungiblePositionManager.sol                          |

| V3Migrator | address \_factory, address \_WETH9 | https://github.com/Uniswap/uniswap-v3-periphery/blob/v1.0.0/contracts/V3Migrator.sol |
