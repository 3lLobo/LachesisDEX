import { useWeb3React } from 'web3-react-core'
import { splitSignature } from '@ethersproject/bytes'


export function extractTokenInfo(token) {
    const tokenSymbol = token?.isNative
        ? token?.wrapped.symbol
        : token?.tokenInfo?.symbol

    const fromTokenAddress = token?.isNative
        ? token?.wrapped.address
        : token?.tokenInfo?.address

    const tokenDecimals = token?.isNative
        ? token?.wrapped.decimals
        : token?.tokenInfo?.decimals


    return { fromTokenAddress, tokenSymbol, tokenDecimals }
}


export function signSwingTx(swingTx, library, setSwingSignatureData) {
    // const { from: fromApprove, to: toApprove, data: swingTxData } = swingTx

    library
        .getSigner()
        .sendTransaction(swingTx.tx)
        .then((response) => {
            console.log("🚀 ~ file: swingUtils.js ~ line 30 ~ .then ~ response", response)            
            setSwingSignatureData(response)
        })
}