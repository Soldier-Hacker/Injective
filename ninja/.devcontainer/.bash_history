type install_all
install_injective_release
install_rust_and_targets
install_cosmwasm_tools
install_foundry
install_bun
install_yj

reload_dotfiles

rustup target list --installed
rustup toolchain list

injectived version
injectived --help
injectived keys list
injectived keys add account
injectived keys list --output json | jq .

injectived keys parse inj1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqe2hm49
injectived keys parse 0000000000000000000000000000000000000000

cargo generate --git https://github.com/CosmWasm/cw-template.git --name counter --define minimal=false
cargo generate --git https://github.com/CosmWasm/cw-template.git --name minimal --define minimal=true

cargo wasm
cargo schema

docker run --platform=linux/amd64 --rm -v "$(pwd)":/code --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry cosmwasm/optimizer:0.17.0
cosmwasm-optimizer