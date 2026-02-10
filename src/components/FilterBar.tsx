import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search token name, symbol, or address..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="search-input"
          />
        </div>
      </div>

      <div className="filter-section filter-controls">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={filters.showNewOnly}
            onChange={(e) => onFilterChange({ ...filters, showNewOnly: e.target.checked })}
            className="toggle-input"
          />
          <span className="toggle-switch" />
          <span className="toggle-text">NEW LAUNCHES (24H)</span>
        </label>

        <div className="select-container">
          <label className="select-label">MIN LIQ</label>
          <select
            value={filters.minLiquidity}
            onChange={(e) => onFilterChange({ ...filters, minLiquidity: Number(e.target.value) })}
            className="filter-select"
          >
            <option value="0">ANY</option>
            <option value="1000">$1K+</option>
            <option value="5000">$5K+</option>
            <option value="10000">$10K+</option>
            <option value="50000">$50K+</option>
            <option value="100000">$100K+</option>
          </select>
        </div>

        <div className="select-container">
          <label className="select-label">SORT BY</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
            className="filter-select"
          >
            <option value="launchTime">LAUNCH TIME</option>
            <option value="price">PRICE</option>
            <option value="priceChange">24H CHANGE</option>
            <option value="volume">VOLUME</option>
            <option value="liquidity">LIQUIDITY</option>
            <option value="marketCap">MARKET CAP</option>
          </select>
        </div>

        <button
          onClick={() => onFilterChange({ ...filters, sortOrder: filters.sortOrder === 'desc' ? 'asc' : 'desc' })}
          className="sort-order-btn"
          title={filters.sortOrder === 'desc' ? 'Descending' : 'Ascending'}
        >
          {filters.sortOrder === 'desc' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
