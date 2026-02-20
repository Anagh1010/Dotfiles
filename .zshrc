export PATH="/usr/local/mysql/bin:$PATH"
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

