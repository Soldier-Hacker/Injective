import 'dotenv/config';
import {
  ChainGrpcWasmApi,
  MsgBroadcasterWithPk,
  MsgExecuteContractCompat,
  PrivateKey,
} from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";

// Define network and endpoints
const NETWORK = Network.Testnet;
const ENDPOINTS = getNetworkEndpoints(NETWORK);

// Define your contract address and mnemonic
const CONTRACT_ADDRESS = "inj1t8rhq5vcxqgw68ldg0k2mjxjvzshuah6tnugvy";
const MNEMONIC = process.env.MNEMONIC;

async function executeContract() {
  // 1. Create wallet from mnemonic
  const privateKey = PrivateKey.fromMnemonic(MNEMONIC);
  const injectiveAddress = privateKey.toBech32();
  console.log({ injectiveAddress });

  // 2. Build execute message
  const msg = MsgExecuteContractCompat.fromJSON({
    sender: injectiveAddress,
    contractAddress: CONTRACT_ADDRESS,
    msg: { increment: {} }, // <-- this is the actual message to the smart contract },
  });

  // 3. Sign and Broadcast it
  const broadcaster = new MsgBroadcasterWithPk({
    network: NETWORK,
    privateKey,
  });

  console.log("broadcasting...");

  const response = await broadcaster.broadcast({
    msgs: msg,
  });

  console.log("Broadcast response:", response);
}

executeContract().catch(console.error);
