export PATH="/usr/local/mysql/bin:$PATH"
eval "$(starship init zsh)"
export STARSHIP_CONFIG=~/.config/starship/starship.toml
export PATH="$HOME/.config/node_modules/.bin:$PATH"
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init - zsh)"
