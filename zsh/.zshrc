# Paths & Env
export STARSHIP_CONFIG=~/.config/starship/starship-minimal-tokyonight.toml
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
activate_pyenv() { eval "$(pyenv init - zsh)"; }
export PATH="$HOME/.global-node-packages/node_modules/.bin:$PATH"

# History
HISTSIZE=1000; 
HISTFILE=~/.zsh_history; 
SAVEHIST=1000; 
HISTDUP=erase
setopt appendhistory
setopt sharehistory
setopt hist_ignore_space
setopt hist_ignore_all_dups
setopt hist_save_no_dups
setopt hist_ignore_dups
setopt hist_find_no_dups

# Aliases & Keybindings
alias ls='ls --color'
alias vim='nvim'
alias vi='nvim'
alias c='clear'
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias dotfiles-stow='(cd ~/dotfiles && stow --verbose --restow --no-folding */)'
bindkey '^ ' autosuggest-accept
bindkey '^p' history-search-backward
bindkey '^n' history-search-forward

# Plugins & Prompt
source $HOMEBREW_PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh
eval "$(starship init zsh)"

# Startup
fastfetch
