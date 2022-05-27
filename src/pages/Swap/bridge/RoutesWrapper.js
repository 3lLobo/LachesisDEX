import AvailableRoutes from './AvailableRoutes'
import { useState } from 'react'

export default function RoutesWrapper({ swingQuote, typedValue }) {

    const handleChange = (e) => {
        const routeIndex = e.target.value;
        if (swingQuote !== undefined) {
            const chosenRoute = swingQuote.routes[routeIndex];
            console.log("🚀 ~ file: RoutesWrapper.js ~ line 10 ~ handleChange ~ chosenRoute", chosenRoute.route[0])
        }
    }
    return (
        <div className="App">
            {swingQuote !== undefined && <AvailableRoutes
                {...swingQuote} fromAmount={typedValue}
                handleChange={handleChange}
            />}
        </div>
    )
}
