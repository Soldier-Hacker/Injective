import { IndexerGrpcDerivativesApi } from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";

// Using testnet
export const NETWORK = Network.Testnet;
export const ENDPOINTS = getNetworkEndpoints(NETWORK);

// Initialize API clients
export const indexerDerivativesApi = new IndexerGrpcDerivativesApi(
  ENDPOINTS.indexer,
);

// Fetch derivative markets
export const fetchDerivativeMarkets = async () => {
  return await indexerDerivativesApi.fetchMarkets();
};

const derivativeMarkets = await fetchDerivativeMarkets();

console.log("Derivative Markets:", derivativeMarkets);

/*
Derivative Markets: [
  {
    oracleBase: "TIA",
    oracleQuote: "InjectiveLabs",
    oracleType: "provider",
    oracleScaleFactor: 6,
    initialMarginRatio: "0.195",
    maintenanceMarginRatio: "0.05",
    isPerpetual: true,
    marketId: "0xc90e8ea048b8fe5c3174d4d0386191765db699d2bf83d0cbaf07e15462115a15",
    marketStatus: "active",
    ticker: "TIA/USDT PERP",
    quoteDenom: "peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5",
    quoteToken: {
      name: "Tether",
      address: "0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5",
      symbol: "USDT",
      logo: "https://imagedelivery.net/lPzngbR8EltRfBOi_WYaXw/e46e1742-fb16-4393-cc40-83b20e875400/public",
      decimals: 6,
      updatedAt: "1751556762302",
      coinGeckoId: "",
      tokenType: "unknown",
    },
    makerFeeRate: "-0.0001",
    takerFeeRate: "0.001",
    serviceProviderFee: "0.4",
    minPriceTickSize: 1000,
    minQuantityTickSize: 0.1,
    minNotional: 0,
    perpetualMarketInfo: {
      hourlyFundingRateCap: "0.000625",
      hourlyInterestRate: "0.00000416666",
      nextFundingTimestamp: 1751396400,
      fundingInterval: 3600,
    },
    perpetualMarketFunding: {
      cumulativeFunding: "893799.50774272",
      cumulativePrice: "1289277.205711632226607375",
      lastTimestamp: 1744731425,
    },
    expiryFuturesMarketInfo: undefined,
  },
  ...
]
*/
