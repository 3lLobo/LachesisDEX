// import { Box, Text, AspectRatio, useStyleConfig, useColorModeValue, Heading } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import d3class from './d3class'
import { useQuery } from '@apollo/client'
import styled, { keyframes } from 'styled-components/macro'
import { swapQuery } from '../../graphQL/queries'


const StyledLink = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

export const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  padding: 0 20px 20px 20px;
`

const BodyText = styled.div`
  color: rgba(130, 71, 229);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 8px;
  font-size: 14px;
`
const RootWrapper = styled.div`
  position: relative;
  margin-top: 16px;
`
const ContentWrapper = styled.div`
  background: radial-gradient(100% 93.36% at 0% 6.64%, rgba(160, 108, 247, 0.1) 0%, rgba(82, 32, 166, 0.1) 100%);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  width: 100%;

  :before {
    background-repeat: no-repeat;
    background-size: 300px;
    content: '';
    height: 300px;
    opacity: 0.1;
    position: absolute;
    transform: rotate(25deg) translate(-90px, -40px);
    width: 300px;
    z-index: -1;
  }
`
const Header = styled.h2`
  font-weight: 600;
  font-size: 16px;
  margin: 0;
`

// let vis
export default function D3Card() {
  const cardWidth = 800
  const [data, setData] = useState(null)
  const {
    loading,
    error,
    data: gqlData,
  } = useQuery(swapQuery, {
    variables: {
      first: 311,
      orderBy: 'timestamp',
      where: {
        amountUSD_gt: 111,
      },
      orderDirection: 'desc',
    },
    notifyOnNetworkStatusChange: true,
    pollInterval: 11000,
    onCompleted: (d) => mutateGraphData(d),
  })

  function mutateGraphData(graphData) {
    const newData = graphData.swaps.map((d) => {
      return {
        source: d.token0.symbol,
        target: d.token1.symbol,
        value: Math.round(d.amountUSD),
      }
    })
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

  function onClick(p) {
    // console.log('Click', p)
    setActive(p)
  }

  function initVis() {
    if (svgWidth > 0) {
      if (data) {
        const d3Props = {
          data: data,
          width: svgWidth,
          height: svgWidth,
          onDatapointClick: onClick,
          fontColor: 'whitesmoke',
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
      <RootWrapper>
        <ContentWrapper>
          {/* <LinkOutToBridge href={bridge}> */}
          <BodyText >
            {/* <L2Icon src={logoUrl} /> */}
            {/* <AutoRow> */}
            {/* <Header>
                <Trans>{label} token bridge</Trans>
              </Header> */}
            {/* <HideSmall> */}
            <div>{active}</div>
            {/* </HideSmall> */}
            {/* </AutoRow>   */}
          </BodyText>
          {/* <StyledArrowUpRight color={textColor} /> */}
          {/* </LinkOutToBridge> */}
        </ContentWrapper>
      </RootWrapper>
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
