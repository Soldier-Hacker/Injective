import { ChainGrpcBankApi } from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";

// Using testnet
export const NETWORK = Network.Testnet;
export const ENDPOINTS = getNetworkEndpoints(NETWORK);

// Initialize API clients
export const chainBankApi = new ChainGrpcBankApi(ENDPOINTS.grpc);

// Fetch wallet balances
export const fetchBalances = async (injectiveAddress: string) => {
  try {
    console.log("Fetching balances for address:", injectiveAddress);
    console.log("Using endpoints:", ENDPOINTS);
    const result = await chainBankApi.fetchBalances(injectiveAddress);
    console.log("Balance result:", result);
    return result;
  } catch (error) {
    console.error("Error fetching balances:", error);
    throw error;
  }
};

await fetchBalances("inj1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqe2hm49");

/*
Fetching balances for address: inj1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqe2hm49
Using endpoints: {
  indexer: "https://testnet.sentry.exchange.grpc-web.injective.network",
  grpc: "https://testnet.sentry.chain.grpc-web.injective.network",
  rpc: "https://testnet.sentry.tm.injective.network",
  rest: "https://testnet.sentry.lcd.injective.network",
  chronos: "https://testnet.sentry.exchange.grpc-web.injective.network",
  explorer: "https://testnet.sentry.exchange.grpc-web.injective.network",
  cacheGrpc: "https://testnet.sentry.chain.grpc-web.injective.network",
  cacheRest: "https://testnet.sentry.exchange.grpc-web.injective.network",
  web3gw: "https://testnet.sentry.exchange.grpc-web.injective.network",
  chart: "https://k8s.testnet.chart.grpc-web.injective.network",
}
Balance result: {
  balances: [
    {
      denom: "inj",
      amount: "423000000000000030251",
    }, {
      denom: "peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5",
      amount: "1000000",
    }
  ],
  pagination: {
    total: 2,
    next: "",
  },
}
*/
