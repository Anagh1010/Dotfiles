# My Dotfiles

Configurations for my macOS system, managed using [GNU Stow](https://www.gnu.org/software/stow/).

## 📦 What's Included

| Package | Description |
|---------|-------------|
| `fastfetch` | System info display config |
| `ghostty` | [Ghostty](https://ghostty.org/) terminal config |
| `git` | Global Git configuration |
| `lazyvim` | [LazyVim](https://www.lazyvim.org/) Neovim distribution (`nvim`) |
| `neovim` | Custom Neovim config (`nvim-my`) |
| `random` | Miscellaneous files (`.imp-notes`) |
| `starship` | [Starship](https://starship.rs/) prompt themes |
| `zed` | [Zed](https://zed.dev/) editor settings, keymaps & themes |
| `zsh` | Zsh shell config (`.zshrc`, `.zprofile`) |
| `website` | Personal website *(not stowed — standalone project)* |

## 🛠️ Prerequisites

Install via [Homebrew](https://brew.sh/):

```bash
brew install git stow neovim starship fastfetch pyenv zsh-autosuggestions
```

## 🚀 Installation

1. **Clone** into your home directory:

    ```bash
    git clone https://github.com/Anagh1010/dotfiles.git ~/dotfiles
    cd ~/dotfiles
    ```

2. **Stow** all packages:

    ```bash
    stow --verbose --restow --no-folding */
    ```

    Or use the built-in alias after sourcing `.zshrc`:

    ```bash
    dotfiles-stow
    ```

> [!NOTE]
> The `website` package is automatically excluded — its `.stow-local-ignore` ignores all files. New packages added to the repo are auto-included by the `*/` glob.

## 📁 Repository Structure

```
~/dotfiles/
├── fastfetch/      → .config/fastfetch/
├── ghostty/        → .config/ghostty/
├── git/            → .gitconfig
├── lazyvim/        → .config/nvim/
├── neovim/         → .config/nvim-my/
├── random/         → .imp-notes
├── starship/       → .config/starship/
├── zed/            → .config/zed/
├── zsh/            → .zshrc, .zprofile
└── website/        → (not stowed)
```

## ⚙️ Stow Ignore Files

- **`.stow-local-ignore`** (repo root) — ignores repo-level files (`.git`, `README.md`, `.DS_Store`, etc.) from being symlinked
- **`random/.stow-local-ignore`** — ignores `.secrets` within the `random` package
- **`website/.stow-local-ignore`** — ignores all files (`.+`), effectively excluding the package from stowing

> [!IMPORTANT]
> `.stow-local-ignore` uses **Perl regex** (not globs). Escape dots: `\.DS_Store`, not `.DS_Store`. Patterns in the root ignore file apply to the stow directory, not inside packages — use per-package ignore files for package-level filtering.

> [!TIP]
> To exclude a new package from stowing, add a `.stow-local-ignore` file containing `.+` inside its directory.

## 🌐 Running the Website Locally

```bash
cd ~/dotfiles/website
npm install
npm run build
npm start
```
