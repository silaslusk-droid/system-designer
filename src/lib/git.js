import git from 'isomorphic-git';
import http from 'isomorphic-git/http/web';
import LightningFS from '@isomorphic-git/lightning-fs';

// Initialize the filesystem
const fs = new LightningFS('design-system-fs');

// CORS proxy for GitHub operations
const corsProxy = 'https://cors.isomorphic-git.org';

const dir = '/design-systems';

/**
 * Initialize git repository
 */
export async function initRepo() {
  try {
    await git.init({ fs, dir });
    console.log('Git repository initialized');
    return { success: true };
  } catch (error) {
    console.error('Error initializing repo:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Add files to staging
 */
export async function addFiles(filepath = '.') {
  try {
    await git.add({ fs, dir, filepath });
    return { success: true };
  } catch (error) {
    console.error('Error adding files:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Create a commit
 */
export async function commit(message, author = { name: 'Designer', email: 'designer@local' }) {
  try {
    const sha = await git.commit({
      fs,
      dir,
      message,
      author,
    });
    return { success: true, sha };
  } catch (error) {
    console.error('Error committing:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get commit log
 */
export async function getLog(depth = 10) {
  try {
    const commits = await git.log({ fs, dir, depth });
    return { success: true, commits };
  } catch (error) {
    console.error('Error getting log:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Write a file to the git filesystem
 */
export async function writeFile(filepath, content) {
  try {
    const fullPath = `${dir}/${filepath}`;
    await fs.promises.writeFile(fullPath, content, 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Error writing file:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Read a file from the git filesystem
 */
export async function readFile(filepath) {
  try {
    const fullPath = `${dir}/${filepath}`;
    const content = await fs.promises.readFile(fullPath, 'utf8');
    return { success: true, content };
  } catch (error) {
    console.error('Error reading file:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Push to remote GitHub repository
 */
export async function pushToGitHub(token, remoteUrl, branch = 'main') {
  try {
    // Set remote if not already set
    await git.addRemote({
      fs,
      dir,
      remote: 'origin',
      url: remoteUrl,
      force: true,
    });

    // Push to GitHub using CORS proxy
    const result = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: branch,
      corsProxy,
      onAuth: () => ({ username: token }),
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error pushing to GitHub:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Clone a repository (for importing existing design systems)
 */
export async function cloneRepo(url, token = null) {
  try {
    const onAuth = token ? () => ({ username: token }) : undefined;

    await git.clone({
      fs,
      http,
      dir,
      url,
      corsProxy,
      onAuth,
      singleBranch: true,
      depth: 1,
    });

    return { success: true };
  } catch (error) {
    console.error('Error cloning repo:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get current branch
 */
export async function currentBranch() {
  try {
    const branch = await git.currentBranch({ fs, dir });
    return { success: true, branch };
  } catch (error) {
    console.error('Error getting current branch:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Create and checkout a new branch
 */
export async function createBranch(branchName) {
  try {
    await git.branch({ fs, dir, ref: branchName });
    await git.checkout({ fs, dir, ref: branchName });
    return { success: true };
  } catch (error) {
    console.error('Error creating branch:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Save design system as a JSON file and commit
 */
export async function saveDesignSystem(designSystem, commitMessage = null) {
  try {
    // Ensure repo is initialized
    await initRepo();

    // Write design system to file
    const filename = `${designSystem.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    await writeFile(filename, JSON.stringify(designSystem, null, 2));

    // Stage the file
    await addFiles(filename);

    // Commit
    const message = commitMessage || `Update design system: ${designSystem.name}`;
    const result = await commit(message);

    return result;
  } catch (error) {
    console.error('Error saving design system:', error);
    return { success: false, error: error.message };
  }
}

export { fs, dir };
