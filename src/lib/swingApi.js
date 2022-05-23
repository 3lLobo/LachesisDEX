
export default {
    _baseUrl: 'https://api.swing.xyz',

    // getConfig: async function () {
    //     let result = null;

    //     fetch("https://swap.dev.swing.xyz/v0/transfer/config", {
    //         "method": "GET",
    //         "headers": {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => {
    //             console.log("SWING config: ", response);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 if (data) {
    //                     result = data;
    //                 }
    //             }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    //     return result;
    // },

    sendGet: async function (url, params = {}) {
        let result = null;

        try {
            const endpoint = new URL(`${this._baseUrl}/${url}`);
            Object.keys(params).forEach((key) =>
                endpoint.searchParams.append(key, params[key]),
            );
            console.log('URL=', endpoint);
            const response = await fetch(endpoint);

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    result = data;
                }
            }
        } catch (err) {
            console.log('Failed to get data from PathFinder.', err);
        }

        return result;
    },

    sendPost: async function (url, params) {
        let result = null;

        try {
            const response = await fetch(`${this._baseUrl}/${url}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    result = data;
                }
            }
        } catch (err) {
            console.log('Failed to get data from PathFinder.', err);
        }

        return result;
    },

    getQuote: async function (chainId, srcToken, destToken, srcAmount) {
        const priceData = await this.sendGet('quote', {
            chainId,
            srcToken,
            destToken,
            srcAmount,
        });

        return priceData;
    },

    getNewQuote: async function (fromUserAddress) {
        const priceData = await this.sendGet('v0/transfer/quote', {
            fromChain: 'ethereum',
            fromChainId: '1',
            fromTokenAddress: '0x0000000000000000000000000000000000000000',
            fromUserAddress,
            toChain: 'polygon',
            toChainId: '137',
            tokenAmount: 11,
            tokenSymbol: 'ETH'
        });

        return priceData;
    },

    getApprove: async function (userAddress, route, chainId, tokenAddress, amount) {
        const tx = await this.sendGet('approve', {
            route,
            chainId,
            tokenAddress,
            amount,
            userAddress,
        });
        const txHash = await this.sendTransaction(tx);

        return txHash;
    },

    getSwap: async function (userAddress, route, chainId, srcToken, destToken, srcAmount) {
        const tx = await this.sendPost('swap', {
            chainId,
            route,
            srcToken,
            destToken,
            srcAmount,
            userAddress,
        });
        const txHash = await this.sendTransaction(tx);

        return txHash;
    },

    sendTransaction: async function (txObject) {
        try {
            const txHash = window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [txObject],
            });
            return txHash;
        } catch (e) {
            console.log('Failed to send transaction:', e);
        }
    },

    waitTransaction: async function (txHash) {
        try {
            let txResult = null;
            while (!txResult) {
                txResult = await window.ethereum.request({
                    method: 'eth_getTransactionReceipt',
                    params: [txHash],
                });
            }
            return txResult;
        } catch (e) {
            console.log(e);
        }
    },

};