/* eslint-disable */
import Comparer from '@/utils/diff';

import { Fetch, Commit } from '@/utils/fetch';

import { posts as cachedPosts } from '../../../public/api/cache/posts.json';

async function allPosts(req, res) {
  const mediumPostsAll = await Fetch(`${process.env.NEXT_PUBLIC_MEDIUM_URL}`);
  const devPostsAll = await Fetch(`${process.env.NEXT_PUBLIC_DEV_URL}${process.env.NEXT_PUBLIC_DEV_USERNAME}`);

  const mediumPosts = mediumPostsAll.map((item) => {
    const { guid, title, thumbnail, description } = item;

    let id = guid.split('/');
    id = id[id.length - 1];

    return {
      id,
      title,
      thumbnail,
      description: description.match(/<(p)>(.*?)<\/p>/)[0].replace(/(<([^>]+)>)/gi, ''),
      content: description.replace(/<img(.*?)(width=\"1\")(.*?)>/, ''),
      source_website: 'medium',
    };
  });

  const devPosts = await Promise.all(
    devPostsAll.map(async (item) => {
      const { id } = item;
      const devPost = await Fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/${id}`);
      const { title, description, cover_image, body_html } = devPost;

      return {
        id: id.toString(),
        title,
        thumbnail: cover_image,
        description,
        content: body_html,
        source_website: 'dev',
      };
    })
  );

  // Check the API call
  let posts = [...mediumPosts, ...devPosts];

  const post = posts.filter(Comparer(cachedPosts, 'id'));

  if (post.length > 0) {
    posts = [...post, ...cachedPosts];

    await Commit({ file: 'posts', content: posts, message: 'build(autocommit): add new post on github' });

    res.status(200).json({ posts });
  } else {
    posts.forEach((m) => {
      const item = cachedPosts.find((n) => n.id === m.id);
      if (item) {
        return Object.assign(item, m);
      }
    });

    await Commit({ file: 'posts', content: cachedPosts, message: 'build(autocommit): update the post on github' });

    res.status(200).json({ posts: cachedPosts });
  }
}

export default allPosts;
