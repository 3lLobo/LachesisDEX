import AvailableRoutes from './bridge/AvailableRoutes'
import { mockRoutes } from './bridge/mockRoutes'
import { useState } from 'react'

export default function MockAvailableRoutes({toAddress, fromAddress, toChain, fromChain}) {

  // const [transactionHash, setTransactionHash] = useState('');
  const [showRoutes, setShowRoutes] = useState(true)

  // const myaddress = '0x3ECC53F7Ba45508483379bd76989A3003E6cbf09'
  // const fromChain = 'eth'
  // const toChain = 'polygon'
  const fromAmount = 11

  return (
    <div className="App">
      <AvailableRoutes
        showRoutes={showRoutes}
        showUnavailable={false}
        loading={false}
        to={toAddress}
        from={fromAddress}
        toChain={toChain}
        fromChain={fromChain}
        fromAmount={fromAmount}
        handleChange={(e) => console.log(e)}
        routes={mockRoutes}
      />
    </div>
  )
}
