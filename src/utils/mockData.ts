import { Token } from '../types';

const tokenNames = [
  ['BaseBot', 'BBOT'],
  ['Degen Finance', 'DGEN'],
  ['Based Pepe', 'BPEPE'],
  ['Circuit Protocol', 'CRCT'],
  ['Neon Ape', 'NAPE'],
  ['CyberDog', 'CDOG'],
  ['Matrix Token', 'MTRX'],
  ['Pixel Punk', 'PXPK'],
  ['Quantum AI', 'QUAI'],
  ['Synth Wave', 'SYNW'],
  ['Turbo Moon', 'TRBO'],
  ['Velocity X', 'VELX'],
  ['Warp Drive', 'WARP'],
  ['Zero Gravity', 'ZGRV'],
  ['Alpha Strike', 'ALFA'],
  ['Beta Protocol', 'BETA'],
  ['Gamma Ray', 'GAMA'],
  ['Delta Force', 'DLTA'],
  ['Omega Prime', 'OMGA'],
  ['Sigma Labs', 'SGMA'],
  ['Hyper Base', 'HBAS'],
  ['Neural Net', 'NRAL'],
  ['Crypto Punk', 'CPNK'],
  ['Based Chad', 'CHAD'],
  ['Moon Rocket', 'MRKT'],
  ['Laser Eyes', 'LZRS'],
  ['Diamond Hands', 'DMND'],
  ['Ape Together', 'APET'],
  ['Wojak Token', 'WOJK'],
  ['Copium Max', 'COPM'],
  ['Hopium Labs', 'HOPM'],
  ['FOMO Protocol', 'FOMO'],
  ['WAGMI DAO', 'WGMI'],
  ['NGMI Token', 'NGMI'],
  ['Rug Pull Radar', 'RDAR'],
  ['Safe Ape', 'SAFE'],
  ['Based King', 'BKNG'],
  ['Cyber Whale', 'CWHL'],
  ['Neon Cat', 'NCAT'],
  ['Glitch Art', 'GLTC'],
  ['Retro Wave', 'RTRO'],
  ['Vaporwave', 'VAPR'],
  ['Synthia', 'SNTH'],
  ['Binary Bot', 'BNRY'],
  ['Hex Machine', 'HEXM'],
  ['Code Monkey', 'CODE'],
  ['Stack Overflow', 'STCK'],
  ['Git Push', 'GPSH'],
  ['Merge Conflict', 'MRGE'],
  ['Deploy Token', 'DPLY'],
];

function generateAddress(): string {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

export function generateMockTokens(count: number): Token[] {
  const tokens: Token[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const [name, symbol] = tokenNames[i % tokenNames.length];
    const launchOffset = Math.random() * 48 * 60 * 60 * 1000; // 0-48 hours ago
    const price = Math.random() < 0.3
      ? Math.random() * 0.0001
      : Math.random() < 0.6
        ? Math.random() * 0.01
        : Math.random() * 1;

    tokens.push({
      id: `token-${i}`,
      address: generateAddress(),
      name: i >= tokenNames.length ? `${name} ${Math.floor(i / tokenNames.length) + 1}` : name,
      symbol: i >= tokenNames.length ? `${symbol}${Math.floor(i / tokenNames.length) + 1}` : symbol,
      price,
      priceChange24h: (Math.random() - 0.4) * 200, // -80% to +120%
      volume24h: Math.random() * 500000,
      liquidity: Math.random() * 200000,
      marketCap: Math.random() * 2000000,
      launchTime: now - launchOffset,
      holders: Math.floor(Math.random() * 5000) + 10,
      txCount24h: Math.floor(Math.random() * 1000) + 5,
      isVerified: Math.random() > 0.7,
      isHoneypot: Math.random() > 0.9,
      buyTax: Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0,
      sellTax: Math.random() > 0.7 ? Math.floor(Math.random() * 15) : 0,
    });
  }

  return tokens;
}
