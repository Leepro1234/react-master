import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  useParams,
  Outlet,
  Link,
  useSearchParams,
  useOutletContext,
} from 'react-router-dom'
import styled from 'styled-components'
import { fetchCoins } from '../../api'
import { Helmet } from 'react-helmet'

const CoinsList = styled.ul``

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    height: auto;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`

const Loader = styled.span`
  text-align: center;
  display: block;
`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

export interface ICoin {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}
interface coinParams {
  coinId?: string
}

interface IRouterProps {
  toggleDark: () => void
  isDark: boolean
}
function Coins() {
  const { coinId } = useParams()
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ['allCoins'],
    queryFn: fetchCoins,
  })
  return (
    <div>
      <Helmet>
        <title>코인</title>
      </Helmet>
      {!coinId ? (
        isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinsList>
            {data?.map(coin => (
              <Coin key={coin.id}>
                <Link to={{ pathname: coin.id }} state={{ name: coin.name }}>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )
      ) : (
        <Outlet context={{}}></Outlet>
      )}
    </div>
  )
}
export default Coins
