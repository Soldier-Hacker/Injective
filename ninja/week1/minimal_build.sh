#!/usr/bin/env bash

cd "$(dirname $(realpath $0))"

set -e

rustup show

DIR=minimal

[[ -d $DIR ]] || {
  cargo generate --git https://github.com/CosmWasm/cw-template.git --name $DIR --define minimal=true
}

pushd $DIR
cargo wasm
cargo schema

command -v cosmwasm-optimizer && cosmwasm-optimizer || {
  docker run --platform=linux/amd64 --rm -v "$(pwd)":/code \
    --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
    --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
    cosmwasm/optimizer:0.17.0
}

# for macOS with apple silicon
# container run --rm -v "$(pwd)":/code cosmwasm/optimizer-arm64:0.17.0

popd
