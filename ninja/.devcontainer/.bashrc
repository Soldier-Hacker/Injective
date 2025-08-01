export GITHUB_USER=tintinland
set -o vi

install_injective_release() {
  pushd "$(mktemp -d)"

  curl -#L https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v1.15.0-1748457819/linux-amd64.zip > linux-amd64.zip

  unzip linux-amd64.zip

  sudo install -m 755 injectived /usr/local/bin/
  sudo install -m 755 peggo /usr/local/bin/
  sudo install -m 644 libwasmvm.x86_64.so /usr/lib/
  sudo ldconfig

  popd
}

install_rust_and_targets() {
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable
  source "$HOME/.cargo/env"
  rustup target add wasm32-unknown-unknown
}

install_cosmwasm_tools() {
  # Optional: Uncomment these to install from source instead
  # cargo install cargo-generate --features vendored-openssl
  # cargo install cargo-run-script
  # cargo install cosmwasm-check

  curl -sL https://github.com/btwiuse/ninja/releases/download/cargo-bin/cargo-bin.tgz | tar xvzC ~
}

reload_dotfiles() {
  cp .devcontainer/.bash_history ~/.bash_history
  history -r
  source ~/.bashrc
}

install_foundry() {
  curl -L https://foundry.paradigm.xyz | bash -v
  source "$HOME/.bashrc"
  curl -sL https://raw.githubusercontent.com/foundry-rs/foundry/master/foundryup/foundryup | bash
}

install_yj() {
  sudo curl -L https://github.com/sclevine/yj/releases/latest/download/yj-linux-amd64 -o /usr/local/bin/yj
  sudo chmod +x /usr/local/bin/yj
}

install_all() {
  install_injective_release
  install_rust_and_targets
  install_cosmwasm_tools
  install_foundry
  install_yj
}

command -v injectived &>/dev/null && {
  . <(injectived completion bash)
} || true
