return {
    'akinsho/bufferline.nvim', version = "*",
    config = function()
        vim.opt.termguicolors = true
        require("bufferline").setup{}
    end,
    keys = {
        { "<leader>pb", "<cmd>BufferLineCyclePrev<cr>", desc = "Prev Buffer" },
        { "<C-n>", "<cmd>BufferLineCycleNext<cr>", desc = "Next Buffer" },
    },
    lazy = false
}
