import { Token } from '../types';
import { formatNumber, formatPrice, formatTimeAgo, truncateAddress } from '../utils/format';

interface TokenTableProps {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
}

export function TokenTable({ tokens, onSelectToken }: TokenTableProps) {
  if (tokens.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15s1.5-2 4-2 4 2 4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <p>NO TOKENS MATCH YOUR FILTERS</p>
        <span className="empty-hint">Try adjusting your search or filter criteria</span>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="token-table">
        <thead>
          <tr>
            <th className="th-token">TOKEN</th>
            <th className="th-price">PRICE</th>
            <th className="th-change">24H</th>
            <th className="th-volume hide-mobile">VOLUME</th>
            <th className="th-liquidity hide-mobile">LIQUIDITY</th>
            <th className="th-mcap hide-tablet">MCAP</th>
            <th className="th-age">AGE</th>
            <th className="th-status hide-mobile">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr
              key={token.id}
              onClick={() => onSelectToken(token)}
              className="token-row"
              style={{ animationDelay: `${index * 0.02}s` }}
            >
              <td className="td-token">
                <div className="token-info">
                  <div className="token-avatar">
                    {token.symbol.slice(0, 2)}
                  </div>
                  <div className="token-names">
                    <span className="token-symbol">{token.symbol}</span>
                    <span className="token-name">{token.name}</span>
                    <span className="token-address hide-desktop">{truncateAddress(token.address)}</span>
                  </div>
                </div>
              </td>
              <td className="td-price">
                <span className="price-value">{formatPrice(token.price)}</span>
              </td>
              <td className={`td-change ${token.priceChange24h >= 0 ? 'positive' : 'negative'}`}>
                <span className="change-value">
                  {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                </span>
              </td>
              <td className="td-volume hide-mobile">
                <span className="volume-value">${formatNumber(token.volume24h)}</span>
              </td>
              <td className="td-liquidity hide-mobile">
                <span className="liquidity-value">${formatNumber(token.liquidity)}</span>
              </td>
              <td className="td-mcap hide-tablet">
                <span className="mcap-value">${formatNumber(token.marketCap)}</span>
              </td>
              <td className="td-age">
                <span className="age-value">{formatTimeAgo(token.launchTime)}</span>
              </td>
              <td className="td-status hide-mobile">
                <div className="status-badges">
                  {token.isVerified && (
                    <span className="badge badge-verified" title="Verified">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  )}
                  {token.isHoneypot && (
                    <span className="badge badge-danger" title="Honeypot Warning">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </span>
                  )}
                  {(token.buyTax > 5 || token.sellTax > 5) && (
                    <span className="badge badge-warning" title={`Tax: ${token.buyTax}/${token.sellTax}`}>
                      TAX
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
