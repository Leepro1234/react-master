import { useQuery } from '@tanstack/react-query'
import {
  useParams,
  Outlet,
  Link,
  useLocation,
  useMatch,
} from 'react-router-dom'
import { styled } from 'styled-components'
import { fetchCoinInfo, fetchTickerInfo } from '../../api'
import { Container, Header, Title } from '../../components/Layout'
import { Helmet } from 'react-helmet'
import { isDarkAtom } from '../../atoms'
import { RecoilState, useSetRecoilState } from 'recoil'
const Loader = styled.span`
  text-align: center;
  display: block;
`
interface RouteState {
  state: { name: string }
}

export interface IInfoData {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
  logo: string
  description: string
  message: string
  open_source: boolean
  started_at: string
  development_status: string
  hardware_wallet: boolean
  proof_type: string
  org_structure: string
  hash_algorithm: string
  first_data_at: string
  last_data_at: string
}

export interface IPriceData {
  id: string
  name: string
  symbol: string
  rank: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: string
  last_updated: string
  quotes: {
    USD: {
      ath_date: string
      ath_price: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_1h: number
      percent_change_1y: number
      percent_change_6h: number
      percent_change_7d: number
      percent_change_12h: number
      percent_change_15m: number
      percent_change_24h: number
      percent_change_30d: number
      percent_change_30m: number
      percent_from_price_ath: number
      price: number
      volume_24h: number
      volume_24h_change_24h: number
    }
  }
}

type RouteParmas = {
  coinId: string
}

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.cardColor};
  padding: 10px 20px;
  border-radius: 10px;
`

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`

const Description = styled.p`
  margin: 20px 0px;
  background-color: ${props => props.theme.cardColor};
  border-radius: 10px;
  padding: 10px 5px;
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props => props.theme.cardColor};
  padding: 7px 0px;
  border-radius: 10px;
  a {
    color: ${props =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
    display: block;
  }
`

interface IRouterProps {
  toggleDark: () => void
  isDark: boolean
}

function Coin() {
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom(prev => !prev)
  const { coinId } = useParams<RouteParmas>()
  const { state } = useLocation() as RouteState
  const priceMatch = useMatch(`/coins/:coinId/price`)
  const chatMatch = useMatch(`/coins/:coinId/chart`)

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>({
    queryKey: ['info', coinId],
    queryFn: () => fetchCoinInfo(coinId!),
  })

  const { isLoading: tickerLoading, data: tickerData } = useQuery<IPriceData>({
    queryKey: ['tickers', coinId],
    queryFn: () => fetchTickerInfo(coinId!),
  })

  const loading = infoLoading || tickerLoading
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state?.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state?.name : loading ? 'Loading...' : infoData?.name}
        </Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickerData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chatMatch !== null}>
              <Link to={`/coins/${coinId}/chart`}>chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/coins/${coinId}/price`}>price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  )
}
export default Coin
function useSerRecoilState(isDarkAtom: RecoilState<boolean>) {
  throw new Error('Function not implemented.')
}
