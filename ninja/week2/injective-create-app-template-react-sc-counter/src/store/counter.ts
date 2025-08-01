import { create } from "zustand";
import { sleep } from "@injectivelabs/utils";
import { COUNTER_CONTRACT_ADDRESS } from "../app/utils/constants";
import { chainGrpcWasmApi, msgBroadcastClient } from "../app/services";
import {
  toBase64,
  fromBase64,
  MsgExecuteContractCompat,
} from "@injectivelabs/sdk-ts";
import { backupPromiseCall } from "../app/utils";
import { useWalletStore } from "./wallet";
import { Buffer } from "buffer";

type CounterState = {
  count: number;
  fetchCount: () => Promise<void>;
  incrementCount: () => Promise<void>;
  setCount: (count: number) => Promise<void>;
};

export const useCounterStore = create<CounterState>()((set, get) => ({
  count: 0,
  fetchCount: async () => {
    const response = await chainGrpcWasmApi.fetchSmartContractState(
      COUNTER_CONTRACT_ADDRESS,
      toBase64({ get_count: {} })
    );

    const { count } = fromBase64(
      Buffer.from(response.data).toString("base64")
    ) as { count: number };

    set({
      count,
    });
  },
  incrementCount: async () => {
    const address = useWalletStore.getState().injectiveAddress;

    if (!address) {
      throw new Error("No Wallet Connected");
    }

    const msg = MsgExecuteContractCompat.fromJSON({
      contractAddress: COUNTER_CONTRACT_ADDRESS,
      sender: address,
      msg: {
        increment: {},
      },
    });

    await msgBroadcastClient.broadcast({
      msgs: msg,
      injectiveAddress: address,
    });

    await sleep(3000);
    await backupPromiseCall(() => get().fetchCount());
  },
  setCount: async (count: number | string) => {
    const address = useWalletStore.getState().injectiveAddress;

    if (!address) {
      throw new Error("No Wallet Connected");
    }

    const msg = MsgExecuteContractCompat.fromJSON({
      contractAddress: COUNTER_CONTRACT_ADDRESS,
      sender: address,
      msg: {
        reset: {
          count: typeof count === "string" ? parseInt(count, 10) : count,
        },
      },
    });

    await msgBroadcastClient.broadcast({
      msgs: msg,
      injectiveAddress: address,
    });

    await sleep(3000);
    await backupPromiseCall(() => get().fetchCount());
  },
}));
