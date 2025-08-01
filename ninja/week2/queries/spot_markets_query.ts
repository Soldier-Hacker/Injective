import { IndexerGrpcSpotApi } from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";

// Using testnet
export const NETWORK = Network.Testnet;
export const ENDPOINTS = getNetworkEndpoints(NETWORK);

// Initialize API clients
export const indexerSpotApi = new IndexerGrpcSpotApi(ENDPOINTS.indexer);

// Fetch spot markets
export const fetchSpotMarkets = async () => {
  return await indexerSpotApi.fetchMarkets();
};

const spotMarkets = await fetchSpotMarkets();

console.log("Spot Markets:", spotMarkets);

/*
Spot Markets: [
  {
    marketId: "0x0a8752f75b54d6c22067675174fe82532eab6fea2d7726e485ed423de2b86a10",
    marketStatus: "active",
    ticker: "TEST14/USDT",
    baseDenom: "factory/inj1mux0he68umjpcy8ltefeuxm9ha2ww3689rv2g4/TEST14",
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
    baseToken: {
      name: "factory/inj1mux0he68umjpcy8ltefeuxm9ha2ww3689rv2g4/TEST14",
      address: "factory/inj1mux0he68umjpcy8ltefeuxm9ha2ww3689rv2g4/TEST14",
      symbol: "TEST14",
      logo: "https://imagedelivery.net/lPzngbR8EltRfBOi_WYaXw/63a231c0-d1c3-4901-1e28-7c4410dfaa00/public",
      decimals: 6,
      updatedAt: "1751556682615",
      coinGeckoId: "",
      tokenType: "unknown",
    },
    makerFeeRate: "-0.0001",
    takerFeeRate: "0.001",
    serviceProviderFee: "0.4",
    minPriceTickSize: 100,
    minQuantityTickSize: 0.1,
    minNotional: 0,
  },
  ...
]
*/
