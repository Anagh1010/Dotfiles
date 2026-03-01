return {
  -- Configure Catppuccin
  {
    "catppuccin/nvim",
    name = "catppuccin",
    priority = 1000,

    opts = {
      flavour = "mocha", -- latte, frappe, macchiato, mocha
      transparent_background = false,

      highlight_overrides = {
        mocha = function(colors)
          return {
            -- Current line number (orange)
            CursorLineNr = {
              fg = colors.peach,
              bold = true,
            },
          }
        end,
      },
    },
  },

  -- Tell LazyVim to use Catppuccin
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "catppuccin",
    },
  },
}
