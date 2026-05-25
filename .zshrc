# ==========================================
# 1. PATHS & ENVIRONMENT VARIABLES
# ==========================================

# Custom Starship Config Path
export STARSHIP_CONFIG=~/.config/starship/starship.toml

# Pyenv Config
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
activate_pyenv() {
  eval "$(pyenv init - zsh)"
}

# NPM Global Packages
export PATH="$HOME/.global-node-packages/node_modules/.bin:$PATH"


# ==========================================
# 2. SHELL OPTIONS & HISTORY
# ==========================================
HISTSIZE=1000
HISTFILE=~/.zsh_history
SAVEHIST=$HISTSIZE
HISTDUP=erase

setopt appendhistory
setopt sharehistory
setopt hist_ignore_space
setopt hist_ignore_all_dups
setopt hist_save_no_dups
setopt hist_ignore_dups
setopt hist_find_no_dups


# ==========================================
# 3. ALIASES & KEYBINDINGS
# ==========================================
alias ls='ls --color'

bindkey '^ ' autosuggest-accept
bindkey '^p' history-search-backward
bindkey '^n' history-search-forward


# ==========================================
# 4. PLUGINS & PROMPT (Must be absolute last)
# ==========================================

# Zsh-Autosuggestions (Must load before prompt, after keybindings)
source $HOMEBREW_PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# Starship Prompt (Always initialized dead last)
eval "$(starship init zsh)"
