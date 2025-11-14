vim.cmd("set number")
vim.cmd("set relativenumber")
vim.cmd("set tabstop=4")
vim.cmd("set shiftwidth=4")
vim.cmd("set expandtab")
vim.cmd("set softtabstop=4")
vim.opt.guicursor = {
  "n-v-c:block-blinkon500-blinkoff500-blinkwait500",
  "i-ci:ver25-blinkon500-blinkoff500-blinkwait500"
}
vim.opt.cursorline = true
vim.opt.cursorlineopt = "number"
vim.api.nvim_create_autocmd("ColorScheme", {
  pattern = "*",
  callback = function()
    vim.cmd("highlight CursorLineNr cterm=bold term=bold gui=bold")
    -- Example with specific colors (uncomment and adjust as needed)
    -- vim.cmd("highlight CursorLineNr guifg=#FFA500 guibg=NONE") -- Orange foreground, no background
  end,
})

require("config.lazy")
