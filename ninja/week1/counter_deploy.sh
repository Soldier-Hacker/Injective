#!/usr/bin/env bash

cd "$(dirname $(realpath $0))"

set -eu

# https://testnet.explorer.injective.network/account/inj12cgw6fuu6aw34j7qx22l620awtctftlqm9zfgu/transactions/
ADDRESS=inj12cgw6fuu6aw34j7qx22l620awtctftlqm9zfgu

pk(){
cat <<EOF
-----BEGIN TENDERMINT PRIVATE KEY-----
kdf: argon2
salt: 9525DF03818AE3105B1BDC2FED00341E
type: eth_secp256k1

9w/BPDJ2YZOHxbaP1zK+uZad6EZEjYIkmVNUPnEA7mtxPK1/lYX6td3zPovIui5V
k4o89FU=
=WJit
-----END TENDERMINT PRIVATE KEY-----
EOF
}

yes injective | ( injectived keys import account <(pk) || true ) &>/dev/null
yes injective | injectived keys list --output json | jq .

# upload wasm blob
TXHASH=$(
  yes injective | injectived tx wasm store ./counter/artifacts/counter.wasm \
  --log-format=json \
  --from=$ADDRESS \
  --chain-id="injective-888" \
  --yes --fees=1000000000000000inj --gas=2000000 \
  --node=https://testnet.sentry.tm.injective.network:443 \
  | yj -yj | jq -r .txhash
)
sleep 3

echo "txhash: $TXHASH"

# query code id
CODE_ID=$(
  injectived query tx $TXHASH --node=https://testnet.sentry.tm.injective.network:443 \
  | yj -yj | jq .events[] -c | jq .attributes[] -c \
  | grep code_id | jq -r .value | head -n1
)

echo "code_id: $CODE_ID"

# instantiate contract
INIT='{"count":99}'
echo "instantiate: ${INIT}"
TXHASH=$(
  yes injective | injectived tx wasm instantiate $CODE_ID $INIT \
  --label="CounterTestInstance" \
  --from=$ADDRESS \
  --chain-id="injective-888" \
  --yes --fees=1000000000000000inj \
  --gas=2000000 \
  --no-admin \
  --node=https://testnet.sentry.tm.injective.network:443 | yj -yj | jq -r .txhash
)
sleep 3

echo "txhash: $TXHASH"

# get contract address
CONTRACT=$(
  injectived query tx $TXHASH --node=https://testnet.sentry.tm.injective.network:443 \
  | yj -yj | jq .events[] -c | jq .attributes[] -c \
  | grep contract_address | jq -r .value | head -n1
)

echo "contract: $CONTRACT"

# query counter
GET_COUNT_QUERY='{"get_count":{}}'
echo "query: ${GET_COUNT_QUERY}"
injectived query wasm contract-state smart $CONTRACT "$GET_COUNT_QUERY" \
  --node=https://testnet.sentry.tm.injective.network:443 \
  --output json | jq .

# increment counter
INCREMENT='{"increment":{}}'
echo "execute: ${INCREMENT}"
TXHASH=$(
  yes injective | injectived tx wasm execute $CONTRACT "$INCREMENT" --from=$ADDRESS \
  --chain-id="injective-888" \
  --yes --fees=1000000000000000inj --gas=2000000 \
  --node=https://testnet.sentry.tm.injective.network:443 \
  --output json | jq -r .txhash
)
sleep 3

echo "txhash: $TXHASH"

# query counter again
GET_COUNT_QUERY='{"get_count":{}}'
echo "query: ${GET_COUNT_QUERY}"
injectived query wasm contract-state smart $CONTRACT "$GET_COUNT_QUERY" \
  --node=https://testnet.sentry.tm.injective.network:443 \
  --output json | jq .
