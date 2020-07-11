/* eslint-disable */
import { reposDB } from '@/utils/db';
import Comparer from '@/utils/diff';

import { Fetch, Commit } from '@/utils/fetch';

async function Repos(req, res) {
  const githubRepos = await Fetch(`${process.env.NEXT_PUBLIC_GITHUB_URL}`);

  let repos = [...githubRepos];

  // reposDB
  //   .get('repos')
  //   .push(...repos)
  //   .write();

  const cachedRepos = reposDB.get('repos').value();
  const repo = repos.filter(Comparer(cachedRepos, 'id'));

  if (repo.length > 0) {
    repos = [...repo, ...cachedRepos];

    await Promise.all(Commit({ file: 'repos', content: repos, message: 'build(autocommit): add new repository on github' }));

    res.status(200).json({ repos });
  } else {
    repos.forEach((m) => {
      const item = cachedRepos.find((n) => n.id === m.id);
      if (item) {
        return Object.assign(item, m);
      }
    });

    await Promise.all(Commit({ file: 'repos', content: cachedRepos, message: 'build(autocommit): update the repository on github' }));

    res.status(200).json({ repos: cachedRepos });
  }
}

export default Repos;
