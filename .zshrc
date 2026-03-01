eval "$(starship init zsh)"
export STARSHIP_CONFIG=~/.config/starship/starship.toml

# Add this to your ~/.zshrc
function activate_ssd_pyenv() {
    SSD_PATH="/Volumes/SN7100_500GB/Home_Directory/.pyenv"
    if [[ -d "$SSD_PATH" ]]; then
        export PYENV_ROOT="$SSD_PATH"
        [[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
        eval "$(pyenv init - zsh)"
        echo "pyenv from SSD activated!"
    else
        echo "SSD not connected or path does not exist."
    fi
}

export PATH="$HOME/.some-node-modules-to-use-globally/node_modules/.bin:$PATH"

source $HOMEBREW_PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh

#Keybindings
bindkey '^ ' autosuggest-accept
bindkey '^p' history-search-backward
bindkey '^n' history-search-forward

#History
HISTSIZE=5000
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

#Aliases
alias ls='ls --color'
