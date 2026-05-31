document.addEventListener('DOMContentLoaded', () => {
  let appData = null;
  let activeFile = null;

  // DOM Elements
  const initialLoader = document.getElementById('initial-loader');
  const themeToggle = document.getElementById('theme-toggle');
  const treeContainer = document.getElementById('tree-container');
  const fileSearch = document.getElementById('file-search');
  const searchClear = document.getElementById('search-clear');
  
  const welcomeDashboard = document.getElementById('welcome-dashboard');
  const codeViewport = document.getElementById('code-viewport');
  const activeFilePath = document.getElementById('active-file-path');
  const codeBlock = document.getElementById('code-block');
  
  const btnCopy = document.getElementById('btn-copy');
  const btnDownload = document.getElementById('btn-download');
  
  const commitCard = document.getElementById('commit-card');
  const commitHash = document.getElementById('commit-hash');
  const commitMessage = document.getElementById('commit-message');
  const commitAuthor = document.getElementById('commit-author');
  const commitDate = document.getElementById('commit-date');

  // ==========================================================================
  // Theme Toggle Logic
  // ==========================================================================
  const savedTheme = localStorage.getItem('theme-preference') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add('light-theme');
      themeToggle.innerHTML = '<i class="ri-sun-line"></i>';
      localStorage.setItem('theme-preference', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
      themeToggle.innerHTML = '<i class="ri-moon-line"></i>';
      localStorage.setItem('theme-preference', 'dark');
    }
  }

  // ==========================================================================
  // Data Fetching and Initialization
  // ==========================================================================
  fetch('data.json')
    .then(res => {
      if (!res.ok) throw new Error('Data not found');
      return res.json();
    })
    .then(data => {
      appData = data;
      // satisfied and premium brief pause
      setTimeout(() => {
        initialLoader.classList.add('loaded');
      }, 700);
      
      renderTree(appData.files);
    })
    .catch(err => {
      console.error('Error fetching configuration database:', err);
      treeContainer.innerHTML = `
        <div class="tree-loading" style="color: var(--colors-red);">
          <i class="ri-error-warning-line" style="font-size: 32px;"></i>
          <span>Failed to load configuration list. Make sure to build first!</span>
        </div>
      `;
      initialLoader.classList.add('loaded');
    });

  // ==========================================================================
  // Path Extension to Prism Language Map
  // ==========================================================================
  function getPrismLanguageClass(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    
    if (filename.startsWith('.zsh') || filename.startsWith('.zprofile') || filename.startsWith('.bash') || filename === '.aliases') {
      return 'language-bash';
    }
    if (filename === '.vimrc' || filename.endsWith('.vim')) {
      return 'language-vim';
    }
    if (filename === '.gitignore' || filename.endsWith('.gitconfig')) {
      return 'language-git';
    }

    const extMap = {
      'lua': 'language-lua',
      'json': 'language-json',
      'jsonc': 'language-json',
      'toml': 'language-toml',
      'yaml': 'language-yaml',
      'yml': 'language-yaml',
      'md': 'language-markdown',
      'sh': 'language-bash',
      'js': 'language-javascript',
      'conf': 'language-nginx',
      'ghostty': 'language-ini'
    };

    return extMap[ext] || 'language-plaintext';
  }

  // ==========================================================================
  // Tree Construction and Rendering
  // ==========================================================================
  
  function buildTreeObject(files) {
    const root = { name: 'root', type: 'directory', children: {} };
    
    files.forEach(file => {
      const parts = file.path.split('/');
      let current = root;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLast = i === parts.length - 1;
        
        if (isLast) {
          current.children[part] = {
            name: part,
            type: 'file',
            path: file.path,
            data: file
          };
        } else {
          if (!current.children[part]) {
            current.children[part] = {
              name: part,
              type: 'directory',
              children: {}
            };
          }
          current = current.children[part];
        }
      }
    });
    
    return root;
  }

  function renderTree(files) {
    const treeData = buildTreeObject(files);
    treeContainer.innerHTML = '';
    
    const rootElement = document.createElement('div');
    rootElement.className = 'tree-root';
    
    const sortedKeys = Object.keys(treeData.children).sort((a, b) => {
      const typeA = treeData.children[a].type;
      const typeB = treeData.children[b].type;
      if (typeA !== typeB) {
        return typeA === 'directory' ? -1 : 1;
      }
      return a.localeCompare(b);
    });

    sortedKeys.forEach(key => {
      rootElement.appendChild(createNodeElement(treeData.children[key], 0));
    });
    
    treeContainer.appendChild(rootElement);
  }

  function createNodeElement(node, depth) {
    const container = document.createElement('div');
    
    if (node.type === 'directory') {
      container.className = 'tree-folder-group';
      
      const nodeEl = document.createElement('div');
      nodeEl.className = 'tree-node folder-node';
      nodeEl.style.paddingLeft = `${depth * 14 + 12}px`;
      
      // Let's use clean Remix Icons as in our first high-fidelity design!
      nodeEl.innerHTML = `
        <span class="tree-chevron"><i class="ri-arrow-right-s-fill"></i></span>
        <span class="tree-node-icon"><i class="ri-folder-3-fill"></i></span>
        <span class="tree-node-name">${node.name}</span>
      `;
      
      const childrenEl = document.createElement('div');
      childrenEl.className = 'tree-folder-children';
      childrenEl.style.display = 'none';
      
      const sortedKeys = Object.keys(node.children).sort((a, b) => {
        const typeA = node.children[a].type;
        const typeB = node.children[b].type;
        if (typeA !== typeB) {
          return typeA === 'directory' ? -1 : 1;
        }
        return a.localeCompare(b);
      });

      sortedKeys.forEach(key => {
        childrenEl.appendChild(createNodeElement(node.children[key], depth + 1));
      });
      
      nodeEl.addEventListener('click', () => {
        const isOpen = childrenEl.style.display !== 'none';
        childrenEl.style.display = isOpen ? 'none' : 'flex';
        childrenEl.style.flexDirection = 'column';
        
        const chevron = nodeEl.querySelector('.tree-chevron');
        const folderIcon = nodeEl.querySelector('.tree-node-icon i');
        
        if (isOpen) {
          chevron.classList.remove('open');
          folderIcon.className = 'ri-folder-3-fill';
        } else {
          chevron.classList.add('open');
          folderIcon.className = 'ri-folder-open-fill';
        }
      });
      
      container.appendChild(nodeEl);
      container.appendChild(childrenEl);
      
    } else {
      // File Node
      const nodeEl = document.createElement('div');
      nodeEl.className = 'tree-node file-node';
      nodeEl.style.paddingLeft = `${depth * 14 + 12 + 16}px`;
      
      let fileIconClass = 'ri-file-code-line';
      const nameLower = node.name.toLowerCase();
      if (nameLower.endsWith('.lua')) fileIconClass = 'ri-code-line';
      else if (nameLower.endsWith('.json') || nameLower.endsWith('.jsonc')) fileIconClass = 'ri-braces-line';
      else if (nameLower.endsWith('.toml')) fileIconClass = 'ri-settings-5-line';
      else if (nameLower.endsWith('.md')) fileIconClass = 'ri-markdown-line';
      else if (nameLower.startsWith('.zsh') || nameLower.startsWith('.bash') || nameLower.endsWith('.sh') || nameLower === '.aliases') fileIconClass = 'ri-terminal-box-line';
      
      nodeEl.innerHTML = `
        <span class="tree-node-icon"><i class="${fileIconClass}"></i></span>
        <span class="tree-node-name">${node.name}</span>
      `;
      
      nodeEl.addEventListener('click', () => {
        document.querySelectorAll('.file-node').forEach(el => el.classList.remove('active'));
        nodeEl.classList.add('active');
        
        loadFile(node.data);
      });
      
      container.appendChild(nodeEl);
    }
    
    return container;
  }

  // ==========================================================================
  // File Viewport Rendering
  // ==========================================================================
  function loadFile(file) {
    activeFile = file;
    
    welcomeDashboard.style.display = 'none';
    codeViewport.style.display = 'flex';
    
    activeFilePath.textContent = file.gitPath || file.path;
    
    codeBlock.className = '';
    const langClass = getPrismLanguageClass(file.name);
    codeBlock.classList.add(langClass);
    
    codeBlock.textContent = file.content;
    
    Prism.highlightElement(codeBlock);
    
    if (file.commit) {
      commitCard.style.display = 'flex';
      commitHash.textContent = file.commit.hash;
      commitMessage.textContent = `"${file.commit.message}"`;
      commitAuthor.textContent = file.commit.author;
      commitDate.textContent = file.commit.date;
    } else {
      commitCard.style.display = 'flex';
      commitHash.textContent = 'Staged';
      commitMessage.textContent = 'This file has untracked modifications or hasn\'t been committed yet.';
      commitAuthor.textContent = 'You';
      commitDate.textContent = 'Local Changes';
    }
  }

  // ==========================================================================
  // Action Buttons: Copy & Download
  // ==========================================================================
  btnCopy.addEventListener('click', () => {
    if (!activeFile) return;
    
    navigator.clipboard.writeText(activeFile.content)
      .then(() => {
        btnCopy.classList.add('success');
        btnCopy.innerHTML = '<i class="ri-check-line"></i> <span>Copied!</span>';
        
        setTimeout(() => {
          btnCopy.classList.remove('success');
          btnCopy.innerHTML = '<i class="ri-file-copy-line"></i> <span>Copy</span>';
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy to clipboard:', err);
      });
  });

  btnDownload.addEventListener('click', () => {
    if (!activeFile) return;
    
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // ==========================================================================
  // Search / Filters Logic
  // ==========================================================================
  fileSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query) {
      searchClear.style.display = 'block';
      const filtered = appData.files.filter(file => 
        file.name.toLowerCase().includes(query) || 
        file.path.toLowerCase().includes(query) ||
        (file.gitPath && file.gitPath.toLowerCase().includes(query))
      );
      renderSearchList(filtered);
    } else {
      searchClear.style.display = 'none';
      renderTree(appData.files);
    }
  });

  searchClear.addEventListener('click', () => {
    fileSearch.value = '';
    searchClear.style.display = 'none';
    renderTree(appData.files);
  });

  function renderSearchList(files) {
    treeContainer.innerHTML = '';
    
    if (files.length === 0) {
      treeContainer.innerHTML = `
        <div class="tree-loading">
          <i class="ri-question-mark" style="font-size: 24px; opacity: 0.5;"></i>
          <span>No configurations match your search</span>
        </div>
      `;
      return;
    }
    
    const listEl = document.createElement('div');
    listEl.className = 'search-results-list';
    listEl.style.display = 'flex';
    listEl.style.flexDirection = 'column';
    listEl.style.gap = '4px';
    
    files.forEach(file => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'tree-node file-node';
      nodeEl.style.paddingLeft = '12px';
      
      let fileIconClass = 'ri-file-code-line';
      const nameLower = file.name.toLowerCase();
      if (nameLower.endsWith('.lua')) fileIconClass = 'ri-code-line';
      else if (nameLower.endsWith('.json') || nameLower.endsWith('.jsonc')) fileIconClass = 'ri-braces-line';
      else if (nameLower.endsWith('.toml')) fileIconClass = 'ri-settings-5-line';
      else if (nameLower.endsWith('.md')) fileIconClass = 'ri-markdown-line';
      else if (nameLower.startsWith('.zsh') || nameLower.startsWith('.bash') || nameLower.endsWith('.sh') || nameLower === '.aliases') fileIconClass = 'ri-terminal-box-line';
      
      nodeEl.innerHTML = `
        <span class="tree-node-icon"><i class="${fileIconClass}"></i></span>
        <div class="tree-node-search-meta" style="display:flex; flex-direction:column; overflow:hidden;">
          <span class="tree-node-name" style="font-weight:500;">${file.name}</span>
          <span class="tree-node-path" style="font-size:10px; color:var(--colors-secondary); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${file.gitPath || file.path}</span>
        </div>
      `;
      
      if (activeFile && activeFile.path === file.path) {
        nodeEl.classList.add('active');
      }
      
      nodeEl.addEventListener('click', () => {
        document.querySelectorAll('.file-node').forEach(el => el.classList.remove('active'));
        nodeEl.classList.add('active');
        loadFile(file);
      });
      
      listEl.appendChild(nodeEl);
    });
    
    treeContainer.appendChild(listEl);
  }
});
