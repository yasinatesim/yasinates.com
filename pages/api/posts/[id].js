import { posts as cachedPosts } from '../../../public/api/cache/posts.json';

function SinglePost({ query: { id } }, res) {
  const singlePost = cachedPosts.filter((p) => p.id === id.toString());

  if (singlePost.length > 0) {
    res.status(200).json(singlePost[0]);
  } else {
    res.status(404).json({ message: `Post with id: ${id} not found.` });
  }
}

export default SinglePost;
