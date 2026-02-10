export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

export function formatPrice(price: number): string {
  if (price < 0.00001) {
    return '$' + price.toExponential(2);
  }
  if (price < 0.01) {
    return '$' + price.toFixed(6);
  }
  if (price < 1) {
    return '$' + price.toFixed(4);
  }
  return '$' + price.toFixed(2);
}

export function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function truncateAddress(address: string, chars: number = 6): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
