#!/usr/bin/env bash

# Broadcasting
forge create \
  src/Counter.sol:Counter \
  --rpc-url injectiveEvm \
  --private-key $PRIVKEY \
  --broadcast

SmartContractAddress=0xd381a9B498188FEDfe1B34A670271db2cC42AaF4

forge verify-contract \
  --rpc-url injectiveEvm \
  --verifier blockscout \
  --verifier-url 'https://testnet.blockscout-api.injective.network/api/' \
  ${SmartContractAddress} \
  src/Counter.sol:Counter

cast sig "function number() returns (uint256)"

cast call \
  --rpc-url injectiveEvm \
  ${SmartContractAddress} \
  0x8381f58a

cast sig "function increment()"

cast send \
  --rpc-url injectiveEvm \
  --private-key $PRIVKEY \
  ${SmartContractAddress} \
  0xd09de08a
