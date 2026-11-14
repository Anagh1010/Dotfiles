# Paths & Env
export STARSHIP_CONFIG=~/.config/starship/starship.toml
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
activate_pyenv() { eval "$(pyenv init - zsh)"; }
export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"
export JAVA_HOME="/opt/homebrew/opt/openjdk"

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
alias c='clear'
alias dotfiles-stow='(cd ~/dotfiles && find . -name ".DS_Store" -delete && stow --verbose --restow */)'
alias cdp='cd ~/projects'
alias ls='eza -lhF --icons=auto'
alias update='brew update && brew upgrade && brew cleanup --prune=all && brew missing && brew doctor; echo "----System deep cleaned and updated----"'
alias gs='git status'
alias gcm='git commit -m'
alias gcam='git commit -a -m'
bindkey '^ ' autosuggest-accept
bindkey '^p' history-search-backward
bindkey '^n' history-search-forward

# Plugins & Prompt
source $HOMEBREW_PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source $HOMEBREW_PREFIX/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
eval "$(starship init zsh)"

# Startup
#fastfetch
