/* eslint-disable */
import { reposDB } from '@/utils/db';
import Comparer from '@/utils/diff';

import { Fetch, Commit } from '@/utils/fetch';

export async function Repos() {
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

    const content = reposDB.set('repos', repos).write();

    await Commit({ file: 'repos', content, message: 'build(autocommit): add new repository on github' });
  } else {
    repos.forEach((m) => {
      const item = cachedRepos.find((n) => n.id === m.id);
      if (item) {
        return Object.assign(item, m);
      }
    });

    const content = reposDB.set('repos', cachedRepos).write();

    await Commit({ file: 'repos', content, message: 'build(autocommit): update the repository on github' });
  }
}

export default Repos;
