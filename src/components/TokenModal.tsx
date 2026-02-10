import { Token } from '../types';
import { formatNumber, formatPrice, formatTimeAgo, truncateAddress } from '../utils/format';

interface TokenModalProps {
  token: Token;
  onClose: () => void;
}

export function TokenModal({ token, onClose }: TokenModalProps) {
  const copyAddress = () => {
    navigator.clipboard.writeText(token.address);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-token-avatar">
            {token.symbol.slice(0, 2)}
          </div>
          <div className="modal-token-info">
            <h2>{token.name}</h2>
            <span className="modal-symbol">${token.symbol}</span>
          </div>
          <div className="modal-price-section">
            <span className="modal-price">{formatPrice(token.price)}</span>
            <span className={`modal-change ${token.priceChange24h >= 0 ? 'positive' : 'negative'}`}>
              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="modal-address">
          <span className="address-label">CONTRACT</span>
          <div className="address-row">
            <code>{truncateAddress(token.address, 12)}</code>
            <button className="copy-btn" onClick={copyAddress} title="Copy address">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>
        </div>

        <div className="modal-stats-grid">
          <div className="modal-stat">
            <span className="modal-stat-label">MARKET CAP</span>
            <span className="modal-stat-value">${formatNumber(token.marketCap)}</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">LIQUIDITY</span>
            <span className="modal-stat-value">${formatNumber(token.liquidity)}</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">24H VOLUME</span>
            <span className="modal-stat-value">${formatNumber(token.volume24h)}</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">HOLDERS</span>
            <span className="modal-stat-value">{token.holders.toLocaleString()}</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">24H TXS</span>
            <span className="modal-stat-value">{token.txCount24h.toLocaleString()}</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">LAUNCHED</span>
            <span className="modal-stat-value">{formatTimeAgo(token.launchTime)}</span>
          </div>
        </div>

        <div className="modal-security">
          <h3>SECURITY SCAN</h3>
          <div className="security-grid">
            <div className={`security-item ${token.isVerified ? 'safe' : 'neutral'}`}>
              <span className="security-icon">
                {token.isVerified ? '✓' : '?'}
              </span>
              <span>Contract Verified</span>
            </div>
            <div className={`security-item ${token.isHoneypot ? 'danger' : 'safe'}`}>
              <span className="security-icon">
                {token.isHoneypot ? '!' : '✓'}
              </span>
              <span>Honeypot Check</span>
            </div>
            <div className={`security-item ${token.buyTax > 5 ? 'warning' : 'safe'}`}>
              <span className="security-icon">
                {token.buyTax > 5 ? '!' : '✓'}
              </span>
              <span>Buy Tax: {token.buyTax}%</span>
            </div>
            <div className={`security-item ${token.sellTax > 5 ? 'warning' : 'safe'}`}>
              <span className="security-icon">
                {token.sellTax > 5 ? '!' : '✓'}
              </span>
              <span>Sell Tax: {token.sellTax}%</span>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <a
            href={`https://basescan.org/token/${token.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            BASESCAN
          </a>
          <a
            href={`https://app.uniswap.org/swap?chain=base&outputCurrency=${token.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn secondary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
            SWAP
          </a>
        </div>
      </div>
    </div>
  );
}
