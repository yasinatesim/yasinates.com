import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

// My Posts API Cache
const posts = new FileSync('pages/api/cache/posts.json');
const postsDB = low(posts);

// My Repos API Cache
const repos = new FileSync('pages/api/cache/repos.json');
const reposDB = low(repos);

postsDB.defaults({ posts: [] }).write();
reposDB.defaults({ repos: [] }).write();

export { postsDB, reposDB };
