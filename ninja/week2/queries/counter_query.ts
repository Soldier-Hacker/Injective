import { getNetworkEndpoints, Network } from "@injectivelabs/networks";
import { ChainGrpcWasmApi, fromBase64, toBase64 } from "@injectivelabs/sdk-ts";

export const NETWORK: Network = Network.Testnet;
export const ENDPOINTS = getNetworkEndpoints(NETWORK);
export const chainGrpcWasmApi = new ChainGrpcWasmApi(ENDPOINTS.grpc);

async function queryContract() {
  const contractAddress = "inj1t8rhq5vcxqgw68ldg0k2mjxjvzshuah6tnugvy";
  const query = { get_count: {} };

  const result = await chainGrpcWasmApi.fetchSmartContractState(
    contractAddress,
    toBase64(query),
  );

  const decodedResult = JSON.parse(new TextDecoder().decode(result.data));

  console.log("Query result:", decodedResult);
}

queryContract().catch(console.error);
