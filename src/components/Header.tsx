import { useState, useEffect } from 'react';

interface HeaderProps {
  tokenCount: number;
}

export function Header({ tokenCount }: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const [blockNumber, setBlockNumber] = useState(18547892);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setBlockNumber((prev) => prev + Math.floor(Math.random() * 3));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-container">
          <div className="logo-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="16" r="3" fill="currentColor" />
              <line x1="16" y1="2" x2="16" y2="8" stroke="currentColor" strokeWidth="2" />
              <line x1="16" y1="24" x2="16" y2="30" stroke="currentColor" strokeWidth="2" />
              <line x1="2" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="2" />
              <line x1="24" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="logo-text">
            <h1>BOT SCREENER</h1>
            <span className="logo-subtitle">BASE NETWORK SCANNER</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="network-badge">
          <span className="network-dot" />
          <span>BASE MAINNET</span>
        </div>
      </div>

      <div className="header-right">
        <div className="stat-box">
          <span className="stat-label">TOKENS</span>
          <span className="stat-value">{tokenCount}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">BLOCK</span>
          <span className="stat-value">{blockNumber.toLocaleString()}</span>
        </div>
        <div className="stat-box time-box">
          <span className="stat-label">UTC</span>
          <span className="stat-value mono">
            {time.toUTCString().slice(17, 25)}
          </span>
        </div>
      </div>
    </header>
  );
}
