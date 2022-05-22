import AvailableRoutes from './bridge/AvailableRoutes'
import { mockRoutes } from './bridge/mockRoutes'
import { useState } from 'react'

export default function MockAvailableRoutes() {
  // const [transactionHash, setTransactionHash] = useState('');
  const [showRoutes, setShowRoutes] = useState(true)

  const myaddress = '0x3ECC53F7Ba45508483379bd76989A3003E6cbf09'
  const fromChain = 'eth'
  const toChain = 'polygon'
  const fromAmount = 1000000000000000000

  return (
    <div className="App">
      <AvailableRoutes
        showRoutes={showRoutes}
        showUnavailable={false}
        loading={false}
        to={myaddress}
        from={myaddress}
        toChain={toChain}
        fromChain={fromChain}
        fromAmount={fromAmount}
        handleChange={(e) => console.log(e)}
        routes={mockRoutes}
      />
    </div>
  )
}
