import { CHAIN_INFO } from 'constants/chainInfo'
import { CHAIN_IDS_TO_NAMES, SupportedChainId } from 'constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import useParsedQueryString from 'hooks/useParsedQueryString'
import usePrevious from 'hooks/usePrevious'
import { ParsedQs } from 'qs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { addPopup, ApplicationModal } from 'state/application/reducer'
import { useAppDispatch } from 'state/hooks'
import styled from 'styled-components/macro'
import { ExternalLink, MEDIA_WIDTHS } from 'theme'
import { ArrowDownCircle, ChevronDown } from 'react-feather'
import { Trans } from '@lingui/macro'

const ActiveRowLinkList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  & > a {
    align-items: center;
    color: ${({ theme }) => theme.text2};
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 500;
    justify-content: space-between;
    padding: 8px 0 4px;
    text-decoration: none;
  }
  & > a:first-child {
    margin: 0;
    margin-top: 0px;
    padding-top: 10px;
  }
`
const ActiveRowWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  width: 100%;
`
const FlyoutHeader = styled.div`
  color: ${({ theme }) => theme.text2};
  font-weight: 400;
`
const FlyoutMenu = styled.div`
  position: absolute;
  top: 54px;
  width: 272px;
  z-index: 99;
  padding-top: 10px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    top: 40px;
  }
`
const FlyoutMenuContents = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg0};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  overflow: auto;
  padding: 16px;
  & > *:not(:last-child) {
    margin-bottom: 12px;
  }
`
const FlyoutRow = styled.div<{ active: boolean }>`
  align-items: center;
  background-color: ${({ active, theme }) => (active ? theme.bg1 : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
  text-align: left;
  width: 100%;
`
const FlyoutRowActiveIndicator = styled.div`
  background-color: ${({ theme }) => theme.green1};
  border-radius: 50%;
  height: 9px;
  width: 9px;
`
const LinkOutCircle = styled(ArrowDownCircle)`
  transform: rotate(230deg);
  width: 16px;
  height: 16px;
`
const Logo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`
const NetworkLabel = styled.div`
  flex: 1 1 auto;
`
const SelectorLabel = styled(NetworkLabel)`
  display: none;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
    margin-right: 8px;
  }
`
const SelectorControls = styled.div<{ interactive: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.bg0};
  border: 2px solid ${({ theme }) => theme.bg0};
  border-radius: 16px;
  color: ${({ theme }) => theme.text1};
  cursor: ${({ interactive }) => (interactive ? 'pointer' : 'auto')};
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
`
const SelectorLogo = styled(Logo)<{ interactive?: boolean }>`
  margin-right: ${({ interactive }) => (interactive ? 8 : 0)}px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-right: 8px;
  }
`
const SelectorWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    position: relative;
  }
`
const StyledChevronDown = styled(ChevronDown)`
  width: 16px;
`
const BridgeLabel = ({ chainId }: { chainId: SupportedChainId }) => {
  switch (chainId) {
    case SupportedChainId.ARBITRUM_ONE:
    case SupportedChainId.ARBITRUM_RINKEBY:
      return <Trans>Arbitrum Bridge</Trans>
    case SupportedChainId.FANTOM:
      return <Trans>Fantom Bridge</Trans>
    case SupportedChainId.FANTOM_TESTNET:
      return <Trans>Fantom TestNet Bridge</Trans>
    case SupportedChainId.OPTIMISM:
    case SupportedChainId.OPTIMISTIC_KOVAN:
      return <Trans>Optimism Bridge</Trans>
    case SupportedChainId.POLYGON:
    case SupportedChainId.POLYGON_MUMBAI:
      return <Trans>Polygon Bridge</Trans>
    default:
      return <Trans>Bridge</Trans>
  }
}
const ExplorerLabel = ({ chainId }: { chainId: SupportedChainId }) => {
  switch (chainId) {
    case SupportedChainId.ARBITRUM_ONE:
    case SupportedChainId.ARBITRUM_RINKEBY:
      return <Trans>Arbiscan</Trans>
    case SupportedChainId.OPTIMISM:
    case SupportedChainId.OPTIMISTIC_KOVAN:
      return <Trans>Optimistic Etherscan</Trans>
    case SupportedChainId.POLYGON:
    case SupportedChainId.POLYGON_MUMBAI:
      return <Trans>Polygonscan</Trans>
    case SupportedChainId.FANTOM:
      return <Trans>Fantom Explorer</Trans>
    case SupportedChainId.FANTOM_TESTNET:
      return <Trans>Fantom TestNet Explorer</Trans>
    default:
      return <Trans>Etherscan</Trans>
  }
}
function Row({
  targetChain,
  currentReceiverChainId,
  onSelectChain,
}: {
  targetChain: SupportedChainId
  currentReceiverChainId: number | undefined
  onSelectChain: (targetChain: number) => void
}) {
  const active = currentReceiverChainId === targetChain
  const { helpCenterUrl, explorer, bridge, label, logoUrl } = CHAIN_INFO[targetChain]

  const rowContent = (
    <FlyoutRow onClick={() => onSelectChain(targetChain)} active={active}>
      <Logo src={logoUrl} />
      <NetworkLabel>{label}</NetworkLabel>
      {currentReceiverChainId === targetChain && <FlyoutRowActiveIndicator />}
    </FlyoutRow>
  )

  if (active) {
    return (
      <ActiveRowWrapper>
        {rowContent}
        <ActiveRowLinkList>
          {bridge ? (
            <ExternalLink href={bridge}>
              <BridgeLabel chainId={currentReceiverChainId} /> <LinkOutCircle />
            </ExternalLink>
          ) : null}
          {explorer ? (
            <ExternalLink href={explorer}>
              <ExplorerLabel chainId={currentReceiverChainId} /> <LinkOutCircle />
            </ExternalLink>
          ) : null}
          {helpCenterUrl ? (
            <ExternalLink href={helpCenterUrl}>
              <Trans>Help Center</Trans> <LinkOutCircle />
            </ExternalLink>
          ) : null}
        </ActiveRowLinkList>
      </ActiveRowWrapper>
    )
  }
  return rowContent
}

const getParsedChainId = (parsedQs?: ParsedQs) => {
  const chain = parsedQs?.chain
  if (!chain || typeof chain !== 'string') return { urlChain: undefined, urlChainId: undefined }

  return { urlChain: chain.toLowerCase(), urlChainId: getChainIdFromName(chain) }
}

const getChainIdFromName = (name: string) => {
  const entry = Object.entries(CHAIN_IDS_TO_NAMES).find(([_, n]) => n === name)
  const chainId = entry?.[0]
  return chainId ? parseInt(chainId) : undefined
}

const getChainNameFromId = (id: string | number) => {
  // casting here may not be right but fine to return undefined if it's not a supported chain ID
  return CHAIN_IDS_TO_NAMES[id as SupportedChainId] || ''
}

export default function ReceiverNetworkSelector() {
  const { chainId, library } = useActiveWeb3React()
  const parsedQs = useParsedQueryString()
  const { urlChain, urlChainId } = getParsedChainId(parsedQs)
  const prevChainId = usePrevious(chainId)
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.SWAP_RECEIVER_NETWORK_SELECTOR)
  const toggle = useToggleModal(ApplicationModal.SWAP_RECEIVER_NETWORK_SELECTOR)
  useOnClickOutside(node, open ? toggle : undefined)

  const history = useHistory()

  //let info = chainId ? CHAIN_INFO[chainId] : undefined
  const [info, setInfo] = useState(chainId ? CHAIN_INFO[chainId] : undefined)
  const [receiverChaindId, setReceiverChaindId] = useState(chainId ? chainId : undefined)

  const dispatch = useAppDispatch()

  const handleChainSwitch = useCallback(
    (targetChain: number, skipToggle?: boolean) => {
      if (!library?.provider) return
      if (!skipToggle) {
        toggle()
      }
      if (targetChain == chainId) {
        dispatch(addPopup({ content: { failedSwitchNetwork: targetChain }, key: `failed-network-switch` }))
      }
      setInfo(targetChain ? CHAIN_INFO[targetChain] : undefined)
      setReceiverChaindId(targetChain)
    },
    [dispatch, library, toggle, chainId]
  )

  useEffect(() => {
    if (!chainId || !prevChainId) return

    // when network change originates from wallet or dropdown selector, just update URL
    if (chainId !== prevChainId) {
      //
      // otherwise assume network change originates from URL
    } else if (urlChainId && urlChainId !== chainId) {
      handleChainSwitch(urlChainId, true)
    }
    if (!info || !receiverChaindId) {
      setInfo(chainId ? CHAIN_INFO[chainId] : undefined)
      setReceiverChaindId(chainId ? chainId : undefined)
    }
  }, [chainId, urlChainId, prevChainId, handleChainSwitch])

  // set chain parameter on initial load if not there
  useEffect(() => {
    if (chainId && !urlChainId) {
      if (!info || !receiverChaindId) {
        setInfo(chainId ? CHAIN_INFO[chainId] : undefined)
        setReceiverChaindId(chainId ? chainId : undefined)
      }
    }
  }, [chainId, history, urlChainId, urlChain])

  if (!chainId || !info || !library) {
    return null
  }

  return (
    <SelectorWrapper ref={node as any} onMouseEnter={toggle} onMouseLeave={toggle}>
      <SelectorControls interactive>
        <SelectorLogo interactive src={info.logoUrl} />
        <SelectorLabel>{info.label}</SelectorLabel>
        <StyledChevronDown />
      </SelectorControls>
      {open && (
        <FlyoutMenu>
          <FlyoutMenuContents>
            <FlyoutHeader>
              <Trans>Select a network</Trans>
            </FlyoutHeader>
            <Row
              onSelectChain={handleChainSwitch}
              currentReceiverChainId={receiverChaindId}
              targetChain={SupportedChainId.MAINNET}
            />
            <Row
              onSelectChain={handleChainSwitch}
              currentReceiverChainId={receiverChaindId}
              targetChain={SupportedChainId.POLYGON}
            />
            <Row
              onSelectChain={handleChainSwitch}
              currentReceiverChainId={receiverChaindId}
              targetChain={SupportedChainId.OPTIMISM}
            />
            <Row
              onSelectChain={handleChainSwitch}
              currentReceiverChainId={receiverChaindId}
              targetChain={SupportedChainId.ARBITRUM_ONE}
            />
            <Row
              onSelectChain={handleChainSwitch}
              currentReceiverChainId={receiverChaindId}
              targetChain={SupportedChainId.FANTOM_TESTNET}
            />
          </FlyoutMenuContents>
        </FlyoutMenu>
      )}
    </SelectorWrapper>
  )
}
