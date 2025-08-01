#!/usr/bin/env bash

set -exo pipefail

install_dotfiles() {
  cp .devcontainer/.bash_history ~/.bash_history
  echo "source $PWD/.devcontainer/.bashrc" >> ~/.bashrc
  source ~/.bashrc
}

install_dotfiles

if [[ -n "$CI" ]]; then
  source .devcontainer/.bashrc
  install_all
else
  install_dotfiles
  echo "To install dependencies manually, run install_* commands";
fi
