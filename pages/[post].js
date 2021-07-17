import PropTypes from 'prop-types';

// Utils
import axios from 'axios';

// Components
import Post from '@/universal/containers/post';

import { posts } from '../public/api/cache/posts.json';

/**
 * This is post detail page
 * @param {Object} post - This is single post data
 */
function PostPage({ post, githubGists }) {
  const content = post ? post.content : null;


  const deneme = Object.values(githubGists);
  console.log('deneme:', deneme)

  return (
    <div className="container">
      {post ? (
        <>
          <>
            {/* <script src="https://gist.github.com/yasinatesim/489040a2973d6e15bb2ddee2933dc970.js?file=index.pug" /> */}
          </>
          <Post sourceWebsite={post.source_website} thumbnail={post.thumbnail} title={post.title} content={content} />
        </>
      ) : (
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await posts.map((item) => ({
    params: { post: item.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await posts.filter((p) => p.id === params.post);
  const firstPost = post[0];

  const gistUrls = firstPost.content.match(/https:\/\/medium\.com\/media\/(.*?)\/href/g);
  const sameGistUrls = gistUrls.filter((item, index) => gistUrls.indexOf(item) === index);

  const githubGists = await Promise.all(
    sameGistUrls.map(async (item) => {
      const result = await axios.get(item, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const gistUrl = result.data
        .match(/https:\/\/gist\.github.com\/yasinatesim\/(.*?)\?file=([a-zA-Z0-9.]+)/g)[0]
        .split('?');

      return {
        [item]: `${gistUrl[0]}.js?${gistUrl[1]}`,
      };
    }),
  );

  return { props: { post: firstPost, githubGists } };
}

PostPage.propTypes = {
  post: PropTypes.object,
  githubGists: PropTypes.array,
};

export default PostPage;
