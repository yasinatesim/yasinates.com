/* eslint-disable */

// Utilities
import axios from 'axios';
import Comparer from '@/universal/utils/diff';
import { Fetch, Commit } from '@/universal/utils/fetch';

// Data
import { posts as cachedPosts } from '../../../public/api/cache/posts.json';

/**
 * This function is fetch posts and return the manipulated data
 * @param {Object} req - This is request object
 * @param {Object} res - This is response object
 */
async function allPosts(req, res) {
  /**
   * Fetch Medium and DEV posts
   */
  const mediumPostsAll = await Fetch(`${process.env.NEXT_PUBLIC_MEDIUM_URL}`);
  const devPostsAll = await Fetch(`${process.env.NEXT_PUBLIC_DEV_URL}${process.env.NEXT_PUBLIC_DEV_USERNAME}`);

  /**
   * Manipulate the Medium posts
   */
  const mediumPosts = mediumPostsAll.map(async (postItem) => {
    const { guid, title, thumbnail, description } = postItem;

    let id = guid.split('/');
    id = id[id.length - 1];

    let content = description.replace(/<img(.*?)(width=\"1\")(.*?)>/, '');
    const mediaUrls = [...new Set(content.match(/https:\/\/medium\.com\/media\/(.*?)\/href/g))];
    const mediaIds = mediaUrls.map((url) => {
      const {
        groups: { mediaId },
      } = /https:\/\/medium\.com\/media\/(?<mediaId>[a-z0-9]+)\/href/g.exec(url);
      return mediaId;
    });

    const githubGists = await Promise.all(
      mediaIds.map(async (mediaIdItem) => {
        const { data } = await axios.get(`https://medium.com/media/${mediaIdItem}/href`);

        const {
          groups: { gistId, file },
        } = /https:\/\/gist\.github.com\/yasinatesim\/(?<gistId>[a-z0-9]+)\?file=(?<file>[a-z0-9.]+)/g.exec(data);

        return {
          id: mediaIdItem,
          regex: `<a href=\"https:\/\/medium\.com\/media\/${mediaIdItem}\/href\">https:\/\/medium\.com\/media\/${mediaIdItem}\/href<\/a>`,
          gist: `https://gist.github.com/yasinatesim/${gistId}.js?file=${file}`,
        };
      })
    );

    content = githubGists.map(({ regex, gist }) => {
      const re = new RegExp(regex, 'gm');
      return content.replace(re, `<script src="${gist}"></script>`);
    }).toString();
    console.log('content:', content)

    return {
      id,
      title,
      thumbnail,
      description: description.match(/<(p)>(.*?)<\/p>/)[0].replace(/(<([^>]+)>)/gi, ''),
      content,
      source_website: 'medium',
    };
  });

  /**
   * Manipulate the DEV posts
   */
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

  // Merge the Medium posts and DEV posts
  let posts = [...mediumPosts, ...devPosts];

  // Compare to new posts and old posts
  const post = posts.filter(Comparer(cachedPosts, 'id'));

  /**
   * If there is a new post
   ** Add to top of other posts
   */
  if (post.length > 0) {
    posts = [...post, ...cachedPosts];

    /**
     * Connect with Github API
     */
    await Commit({
      file: 'posts',
      content: posts,
      message: 'build(autocommit): add new post on github',
    });

    return res.status(200).json({ posts });
  } else {
    /**
     *  If there is not new post
     ** If the process is an "update process"
     ** Update the specified data
     */
    posts.forEach((m) => {
      const item = cachedPosts.find((n) => n.id === m.id);
      if (item) {
        return Object.assign(item, m);
      }
    });

    /**
     * Connect with Github API
     */
    await Commit({
      file: 'posts',
      content: cachedPosts,
      message: 'build(autocommit): update the post on github',
    });

    return res.status(200).json({ posts: cachedPosts });
  }
}

export default allPosts;
