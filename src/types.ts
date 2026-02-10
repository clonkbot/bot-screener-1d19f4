export interface Token {
  id: string;
  address: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  launchTime: number;
  holders: number;
  txCount24h: number;
  isVerified: boolean;
  isHoneypot: boolean;
  buyTax: number;
  sellTax: number;
}

export interface FilterOptions {
  sortBy: 'launchTime' | 'price' | 'priceChange' | 'volume' | 'liquidity' | 'marketCap';
  sortOrder: 'asc' | 'desc';
  minLiquidity: number;
  search: string;
  showNewOnly: boolean;
}
