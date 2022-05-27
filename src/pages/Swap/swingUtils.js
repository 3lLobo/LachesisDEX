

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
