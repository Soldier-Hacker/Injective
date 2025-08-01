import { MsgBroadcaster } from "@injectivelabs/wallet-core";
import { walletStrategy } from "./services/wallet";
import { ChainGrpcWasmApi } from "@injectivelabs/sdk-ts";
import { ENDPOINTS, NETWORK } from "./utils/constants";

export const chainGrpcWasmApi = new ChainGrpcWasmApi(ENDPOINTS.grpc);

export const msgBroadcastClient = new MsgBroadcaster({
  walletStrategy,
  network: NETWORK,
});
