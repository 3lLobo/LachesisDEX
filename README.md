# Decentralized EXchange using Lachesis consensus algorithm

Submission project for HackTheMoney | ETHGlobal 2022

## About the app

We're building a decentralized exchange for cross chain swaps. This way users will be equipped to swap any token from any chain, in short - An Interchain DEX. We deployed the Uniswap factoryV3 on Fantom testnet to take advantage of Lachesis Consensus but the tokens haven't been confirmed yet. 

Polygon Mumbai offers deployed uniswap contract and verified token addresses. Thus we use this chain for demonstration purposes. 

## Why Lachesis ?

Lachesis is a break-through aBFT consensus algorithm developed by Fantom.

Below are the key properties of Lachesis algorithm:

```
Asynchronous: Participants have the freedom to process commands at different times.
Leaderless: No participant plays a “special” role.
Byzantine Fault-Tolerant: Functional in a presence of up to one-third of faulty nodes and 
malicious nodes.
Final: Lachesis's output can be used immediately. Transactions are confirmed within 1-2 seconds.
```

## Interchain swaps using Bridge

```
Swing API v0 enables cross-chain token transfers and token swaps through Multichain(Anyswap), Wormhole,
Celer Bridge, deBridge, Hop Bridge, Hyphen bridge, Connext(NXTP), Rainbow bridge, Synapse . 
```
Thus , we use SWING API to find us the best & the most optimal bridge in terms of fees. Combined with Uniswap it would allow to swap to another chain and to use a shared interchain liquidity pool.

## Data on Swaps & Liquidity 

A chart which displays the newest swaps above a certain threshold on the mainnet.
![image](https://user-images.githubusercontent.com/70228821/169710275-d396cb31-5e75-4475-80b4-b5ea4e82bcff.png)


## Roadmap

TheGraph offers us uniswap data.
  - Build a subgraph which tracks all interchain swaps and liquidity.
  - This allows to detect patterns and foresee pools running short in liquidity. 

Migrating to Fantom
  - Migrating uniswap liquidity pools to Fantom and bridge the swaped tokens.

## Fantom

Deploying Uniswap contracts to Fantom testnet.

UniswapV3Factory deployed to: `0x341EC1a1fc2480F400cf33fDc2aC5C95Bdaa3f37`


### Constructor Addresses

Fantom mainnet:
 - Weth: 0x74b23882a30290451A17c44f4F05243b6b58C76d


### Fantom links

[Fantom](https://www.fantom.foundation/lachesis-consensus-algorithm/) and [codeBase](https://github.com/Fantom-foundation/go-opera)

[Wallet](https://pwawallet.fantom.network/#/account/0x3ECC53F7Ba45508483379bd76989A3003E6cbf09/)

[Scan](https://ftmscan.com/address/0x660655EB385467fd95E19aE97a05188d9553B3Ea)

[Docs](https://docs.fantom.foundation/api/public-api-endpoints#mainnet)

[Faucets](https://faucet.fantom.network/)

## L2blockchains & SWING API

[PolygonZero](https://polygon.technology/solutions/polygon-zero/) and [codeBase](https://github.com/mir-protocol/plonky2)
[Swing](https://swing.xyz/developers)


## Hooks & TheGraph

[ETH-hooks](https://scaffold-eth.github.io/eth-hooks/)
[TheGraph](https://thegraph.com/docs/en/developer/quick-start/)

## Pretty Badges

[![Netlify Status](https://api.netlify.com/api/v1/badges/3e96c724-ddcd-4422-9728-3875f9f1fb81/deploy-status)](https://app.netlify.com/sites/lachesiswap/deploys)
