import {
  getInjectiveAddress,
  MsgExecuteContractCompat,
} from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";
import { Wallet } from "@injectivelabs/wallet-base";
import { BaseWalletStrategy, MsgBroadcaster } from "@injectivelabs/wallet-core";
import { CosmosWalletStrategy } from "@injectivelabs/wallet-cosmos";
import { EvmWalletStrategy } from "@injectivelabs/wallet-evm";
import { ChainId, EthereumChainId } from "@injectivelabs/ts-types";

const NETWORK = Network.Testnet;
const CONTRACT_ADDRESS = "inj1t8rhq5vcxqgw68ldg0k2mjxjvzshuah6tnugvy";
const chainId = ChainId.Testnet;
const output = document.getElementById("output");

function log(message) {
  output.textContent += message + "\n";
}

async function connectEvm() {
  const walletStrategy = new BaseWalletStrategy({
    chainId,
    wallet: Wallet.Metamask,
    strategies: {
      [Wallet.Metamask]: new EvmWalletStrategy({
        chainId,
        wallet: Wallet.Metamask,
        ethereumOptions: {
          ethereumChainId: EthereumChainId.Testnet,
        },
      }),
    },
  });

  await broadcast(walletStrategy);
}

async function connectKeplr() {
  const walletStrategy = new BaseWalletStrategy({
    chainId,
    strategies: {
      [Wallet.Keplr]: new CosmosWalletStrategy({
        chainId,
        wallet: Wallet.Keplr,
      }),
    },
  });

  await broadcast(walletStrategy);
}

async function broadcast(walletStrategy: BaseWalletStrategy) {
  const [address] = await walletStrategy.getAddresses();
  let injectiveAddress;
  if (address.startsWith("0x")) {
    injectiveAddress = getInjectiveAddress(address);
  } else {
    injectiveAddress = address;
  }
  log("Connected address: " + injectiveAddress);

  const msg = MsgExecuteContractCompat.fromJSON({
    sender: injectiveAddress,
    contractAddress: CONTRACT_ADDRESS,
    msg: { increment: {} },
  });

  const broadcaster = new MsgBroadcaster({
    walletStrategy,
    network: NETWORK,
  });

  log("Signing and Broadcasting...");
  const result = await broadcaster.broadcast({
    msgs: msg,
    injectiveAddress,
  });

  log("Broadcast result:");
  log(JSON.stringify(result, null, 2));
}

document.getElementById("connectKeplr").addEventListener("click", () => {
  connectKeplr().catch((err) => {
    console.error(err);
    log("Error: " + err.message);
  });
});

document.getElementById("connectEvm").addEventListener("click", () => {
  connectEvm().catch((err) => {
    console.error(err);
    log("Error: " + err.message);
  });
});
