set number
set wildmenu

set autoindent
set shiftwidth=4
set smartindent
set smarttab
set softtabstop=4

set hlsearch	
set smartcase	
set ignorecase	
set incsearch

call plug#begin()
Plug 'pangloss/vim-javascript'
Plug 'mxw/vim-jsx'
call plug#end()

let g:javascript_plugin_jsdoc = 1
let g:jsx_ext_required = 0

augroup reload_vimrc "{
    autocmd!
    autocmd BufWritePOST $HOME/.vimrc source $HOME/.vimrc
augroup END "}

