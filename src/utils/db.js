import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

// My Posts API Cache
const posts = new FileSync(path.resolve('../../pages/api/cache/posts.json'));
const postsDB = low(posts);

// My Repos API Cache
const repos = new FileSync(path.resolve('../../pages/api/cache/repos.json'));
const reposDB = low(repos);

postsDB.defaults({ posts: [] }).write();
reposDB.defaults({ repos: [] }).write();

export { postsDB, reposDB };
