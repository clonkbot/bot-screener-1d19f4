import { useState, useEffect } from 'react';
import { TokenTable } from './components/TokenTable';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { TokenModal } from './components/TokenModal';
import { Token, FilterOptions } from './types';
import { generateMockTokens } from './utils/mockData';
import './styles.css';

function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'launchTime',
    sortOrder: 'desc',
    minLiquidity: 0,
    search: '',
    showNewOnly: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTokens(generateMockTokens(50));
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    let result = [...tokens];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(searchLower) ||
          t.symbol.toLowerCase().includes(searchLower) ||
          t.address.toLowerCase().includes(searchLower)
      );
    }

    // Liquidity filter
    if (filters.minLiquidity > 0) {
      result = result.filter((t) => t.liquidity >= filters.minLiquidity);
    }

    // New launches filter (last 24h)
    if (filters.showNewOnly) {
      const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
      result = result.filter((t) => t.launchTime > dayAgo);
    }

    // Sorting
    result.sort((a, b) => {
      const multiplier = filters.sortOrder === 'desc' ? -1 : 1;
      switch (filters.sortBy) {
        case 'launchTime':
          return (a.launchTime - b.launchTime) * multiplier;
        case 'price':
          return (a.price - b.price) * multiplier;
        case 'priceChange':
          return (a.priceChange24h - b.priceChange24h) * multiplier;
        case 'volume':
          return (a.volume24h - b.volume24h) * multiplier;
        case 'liquidity':
          return (a.liquidity - b.liquidity) * multiplier;
        case 'marketCap':
          return (a.marketCap - b.marketCap) * multiplier;
        default:
          return 0;
      }
    });

    setFilteredTokens(result);
  }, [tokens, filters]);

  // Simulate real-time updates
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setTokens((prev) =>
        prev.map((token) => ({
          ...token,
          price: token.price * (0.98 + Math.random() * 0.04),
          priceChange24h: token.priceChange24h + (Math.random() - 0.5) * 2,
          volume24h: token.volume24h * (0.95 + Math.random() * 0.1),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="app-container">
      <div className="scanlines" />
      <div className="noise" />

      <Header tokenCount={filteredTokens.length} />

      <main className="main-content">
        <FilterBar filters={filters} onFilterChange={setFilters} />

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p className="loading-text">SCANNING BASE NETWORK...</p>
            <div className="loading-bar">
              <div className="loading-bar-fill" />
            </div>
          </div>
        ) : (
          <TokenTable
            tokens={filteredTokens}
            onSelectToken={setSelectedToken}
          />
        )}
      </main>

      <footer className="footer">
        <span>Requested by @CryptoCosm91341 · Built by @clonkbot</span>
      </footer>

      {selectedToken && (
        <TokenModal token={selectedToken} onClose={() => setSelectedToken(null)} />
      )}
    </div>
  );
}

export default App;
