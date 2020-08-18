/* eslint-disable */

// Utilities
import Comparer from '@/utils/diff';
import { Fetch, Commit } from '@/utils/fetch';

// Data
import { repos as cachedRepos } from '../../public/api/cache/repos.json';

/**
 * Fetch Github repos function
 * @param {Object} req - This is request object
 * @param {Object} res - This is response object
 */
async function Repos(req, res) {
  /**
   * Fetch Github repos
   */
  const githubRepos = await Fetch(`${process.env.NEXT_PUBLIC_GITHUB_URL}`);

  let repos = [...githubRepos];

  // Compare to new repos and old repos
  const repo = repos.filter(Comparer(cachedRepos, 'id'));

  /**
   * If there is a new repo
   ** Add to top of other repos
   */
  if (repo.length > 0) {
    repos = [...repo, ...cachedRepos];

    /**
     * Connect with Github API
     */
    await Commit({
      file: 'repos',
      content: repos,
      message: 'build(autocommit): add new repository on github',
    });

    res.status(200).json({ repos });
  } else {
    /**
     *  If there is not new repo
     ** If the process is an "update process"
     ** Update the specified data
     */
    repos.forEach((m) => {
      const item = cachedRepos.find((n) => n.id === m.id);
      if (item) {
        return Object.assign(item, m);
      }
    });

    /**
     * Connect with Github API
     */
    await Commit({
      file: 'repos',
      content: cachedRepos,
      message: 'build(autocommit): update the repository on github',
    });

    res.status(200).json({ repos: cachedRepos });
  }
}

export default Repos;
