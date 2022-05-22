// import { Box, Text, AspectRatio, useStyleConfig, useColorModeValue, Heading } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import resflare from './flare.json'
import d3class from './d3class'
import { useQuery } from "@apollo/client"

import { swapQuery } from '../../graphQL/queries'

// let vis
export default function D3Card() {

  const cardWidth = 800
  const [data, setData] = useState(null)
  const { loading, error, data: gqlData } = useQuery(swapQuery,
    {
      variables: {
        "first": 311,
        "orderBy": "timestamp",
        "where": {
          "amountUSD_gt": 111
        },
        "orderDirection": "desc"
      },
      notifyOnNetworkStatusChange: true,
      pollInterval: 11000,
      onCompleted: (d) => mutateGraphData(d),
    }
  )


  function mutateGraphData(graphData) {
    const newData = graphData.swaps.map((d) => {
      return {
        'source': d.token0.symbol,
        'target': d.token1.symbol,
        'value': Math.round(d.amountUSD),
      }
    })
    console.log("🚀 ~ file: d3component.js ~ line 39 ~ newData ~ newData", newData)
    setData(newData)
  }

  const boxref = useRef()
  const paddingBox = 22
  const [svgWidth, setSvgWidth] = useState(cardWidth - 2 * paddingBox)
  const [vis, setVis] = useState()

  // useEffect(() => {
  //   async function fetchApi() {
  //     //   const resFlare = await (await fetch('/api/flareData')).json()
  //     //   setData(resFlare.flareData)
  //     setData(resflare)
  //   }
  //   fetchApi()
  //   // fetchData()
  // }, [])

  useEffect(() => {
    setSvgWidth(() => cardWidth - 2 * paddingBox)
  }, [cardWidth, paddingBox])

  const [active, setActive] = useState(null)
  const refElement = useRef(null)

  // useEffect(fetchData, [])
  useEffect(initVis, [data, svgWidth, vis])

  // useEffect(() => {
  //   console.log(svgFontColor)
  //   d3.selectAll('svg#sunburst').selectAll('text').style('fill', svgFontColor)
  // }, [svgFontColor])
  // useEffect(updateVisOnResize, [svgWidth, svgFontColor])

  // function fetchData() {
  //     Promise.resolve(fetch('/api/flareData')).then((res) => setData(res.json().flareData))
  //     console.log('fetchh')
  // }

  function onClick(e, p) {
    console.log('Click', p)
    // setActive(p.data.name + ': ' + p.value.toString())
  }

  function initVis() {
    if (svgWidth > 0) {
      if (data) {
        const d3Props = {
          data: data,
          width: svgWidth,
          height: svgWidth,
          onDatapointClick: onClick,
          fontColor: 'black',
        }
        if (!vis) {
          setVis(() => new d3class(refElement.current, d3Props))
        } else {
          vis.updateDatapoints(d3Props)
        }
      }
    }
  }

  return (
    <div
      // __css={styles}
      // display="flex"
      //   fontSize="xs"
      //   flexDirection="column"
      //   width="100%"
      //   position="relative"
      //   minWidth="0px"
      //   backgroundClip="border-box"
      //   boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
      //   borderRadius="15px"
      //   bg={svgBoxBg}
      //   p={paddingBox}
      ref={boxref}
    >
      <svg
        ref={refElement}
        style={{
          height: svgWidth,
          width: svgWidth,
          marginRight: '0px',
          marginLeft: '0px',
          fontWeight: 'lighter',
          fontColor: 'whitesmoke',
        }}
      >
        <g id="2" data-name="2"></g>
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  )
}
