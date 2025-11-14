return {
    'nvim-treesitter/nvim-treesitter',
    lazy = false,
    branch = 'main',
    build = ':TSUpdate',
    config = function()
        require("nvim-treesitter").setup({
            highlight = { enable = true },
            indent = { enable = true },
            install_dir = vim.fn.stdpath('data') .. '/site'
        })

        local ensure_installed = {
            "c",
            "cpp",
            "python",
            "javascript",
            "html"
        }
        require('nvim-treesitter').install(ensure_installed)
    end
}
