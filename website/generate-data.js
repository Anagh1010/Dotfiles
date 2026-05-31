const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(__dirname, 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('🔍 Scanning Git repository for tracked files...');

try {
  // Get tracked files from Git
  const lsFilesOutput = execSync('git ls-files', { cwd: rootDir, encoding: 'utf8' });
  const rawFiles = lsFilesOutput.split('\n').map(f => f.trim()).filter(Boolean);

  const configFiles = [];

  function getMappedPath(gitPath) {
    const ignoredFiles = [
      '.stow-local-ignore',
      '.vimrc',
      '.imp-notes',
      'README.md',
      'LICENSE',
      'lazy-lock.json',
      '.gitignore',
      'accent in zed.png'
    ];

    const filename = path.basename(gitPath);

    if (
      ignoredFiles.includes(filename) || 
      ignoredFiles.includes(gitPath) ||
      gitPath.includes('/.gitignore') ||
      gitPath.includes('/LICENSE') ||
      gitPath.includes('/README.md')
    ) {
      return null;
    }

    if (gitPath.startsWith('.config/zed/')) {
      return gitPath.replace('.config/zed/', 'zed/');
    }
    if (gitPath.startsWith('.config/nvim/')) {
      return gitPath.replace('.config/nvim/', 'neovim/');
    }
    if (gitPath.startsWith('.config/nvim-my/')) {
      return gitPath.replace('.config/nvim-my/', 'neovim-custom/');
    }
    if (gitPath.startsWith('.config/ghostty/')) {
      return gitPath.replace('.config/ghostty/', 'ghostty/');
    }
    if (gitPath.startsWith('.config/starship/')) {
      return gitPath.replace('.config/starship/', 'starship/');
    }
    if (gitPath.startsWith('.config/fastfetch/')) {
      return gitPath.replace('.config/fastfetch/', 'fastfetch/');
    }
    if (gitPath === '.zshrc' || gitPath === '.zprofile') {
      return `shell/${gitPath}`;
    }
    if (gitPath === '.gitconfig') {
      return `git/.gitconfig`;
    }

    return null;
  }

  for (const relativeFile of rawFiles) {
    // Skip any files inside the website/ directory
    if (relativeFile.startsWith('website/') || relativeFile === 'website') {
      continue;
    }

    // Skip git system files or binary/temp files we definitely don't want to show
    if (
      relativeFile.startsWith('.git/') || 
      relativeFile.endsWith('.DS_Store') ||
      relativeFile.endsWith('.png') ||
      relativeFile.endsWith('.jpg') ||
      relativeFile.endsWith('.jpeg') ||
      relativeFile.endsWith('.webp') ||
      relativeFile.endsWith('.ico')
    ) {
      continue;
    }

    // Run mapping function and skip if file is ignored/not config
    const mappedPath = getMappedPath(relativeFile);
    if (!mappedPath) {
      continue;
    }

    console.log(`📄 Processing: ${relativeFile} -> ${mappedPath}`);

    // 1. Get committed content (HEAD state)
    let content = '';
    let isCommitted = true;
    try {
      content = execSync(`git show "HEAD:${relativeFile}"`, { cwd: rootDir, encoding: 'utf8' });
    } catch (err) {
      // Fallback: if not committed yet (e.g. newly staged), read from local filesystem
      isCommitted = false;
      const fullPath = path.join(rootDir, relativeFile);
      if (fs.existsSync(fullPath)) {
        content = fs.readFileSync(fullPath, 'utf8');
      } else {
        continue; // File doesn't exist
      }
    }

    // 2. Get last commit details
    let commit = null;
    try {
      const logOutput = execSync(`git log -1 --format="%H|%an|%ar|%s" -- "${relativeFile}"`, { cwd: rootDir, encoding: 'utf8' }).trim();
      if (logOutput) {
        const [hash, author, date, message] = logOutput.split('|');
        commit = {
          hash: hash.substring(0, 7),
          fullHash: hash,
          author,
          date,
          message
        };
      }
    } catch (err) {
      // No commits for this file yet
    }

    // Add file structure with mapped path and git path
    configFiles.push({
      path: mappedPath,
      gitPath: relativeFile,
      name: path.basename(mappedPath),
      content,
      isCommitted,
      commit
    });
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    repoName: 'Anagh1010/Dotfiles',
    files: configFiles
  };

  fs.writeFileSync(
    path.join(publicDir, 'data.json'),
    JSON.stringify(payload, null, 2),
    'utf8'
  );

  console.log(`\n✅ Successfully generated data.json with ${configFiles.length} configuration files!`);
} catch (error) {
  console.error('❌ Error generating data:', error.message);
  process.exit(1);
}
