# My Dotfiles

This repository contains the dotfiles and configurations for my macOS system, managed using [GNU Stow](https://www.gnu.org/software/stow/).

## 📦 What's Included

- **Shell:** Zsh with [Starship](https://starship.rs/) prompt and Zsh-Autosuggestions
- **Terminal:** [Ghostty](https://ghostty.org/)
- **Editors:** Neovim (`nvim` & `nvim-my`), Vim, and Zed
- **Development Tools:** Git, Pyenv, Node
- **System Info:** Fastfetch

## 🛠️ Prerequisites

Ensure you have the following installed on your system:

- [Git](https://git-scm.com/)
- [GNU Stow](https://www.gnu.org/software/stow/)

On macOS, you can install these via [Homebrew](https://brew.sh/):

```bash
brew install git stow
```

*(You may also want to install the tools configured in this repo, such as `neovim`, `starship`, `fastfetch`, `pyenv`, etc.)*

## 🚀 Installation

1. Clone the repository into your `$HOME` directory:

```bash
git clone https://github.com/Anagh1010/dotfiles.git ~/dotfiles
cd ~/dotfiles
```

2. Use GNU Stow to create symlinks to your home directory:

```bash
stow .
```

*Note: The `.stow-local-ignore` file ensures that repo-specific files like this `README.md` and `.git` are not symlinked.*

## 📁 Repository Structure

- `.config/`: Configurations for `fastfetch`, `ghostty`, `nvim`, `starship`, and `zed`
- `.zshrc` / `.zprofile`: Zsh shell configurations, environment variables, and aliases
- `.gitconfig`: Global Git configuration
- `.vimrc`: Vim text editor settings
- `website/`: Personal website generator/server files

### Running the Website Locally

To run the local website server, navigate to the `website/` directory and execute the following commands:

```bash
npm run build
npm start
```
