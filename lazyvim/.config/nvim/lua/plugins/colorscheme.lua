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
  -- Configure Tokyonight
  {
    "folke/tokyonight.nvim",
    lazy = true,
    opts = {
      style = "night",
    },
  },

  -- Tell LazyVim which theme to use
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "tokyonight",
    },
  },
}
