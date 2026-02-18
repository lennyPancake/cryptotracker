export interface Root {
  coins: SearchCoin[]
  exchanges: Exchange[]
  icos: any[]
  categories: Category[]
  nfts: Nft[]
}
export interface Exchange {
  id: string
  name: string
  market_type: string
  thumb: string
  large: string
}

export interface Category {
  id: number
  name: string
}

export interface Nft {
  id: string
  name: string
  symbol: string
  thumb: string
}

export interface SearchCoin {
  id: string
  name: string
  api_symbol: string
  symbol: string
  market_cap_rank?: number
  thumb: string
  large: string
}