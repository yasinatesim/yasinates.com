import PropTypes from 'prop-types';

// Components
import Post from '@/containers/post';

import { posts } from '../public/api/cache/posts.json';

/**
 * This is post detail page
 * @param {Object} post - This is single post data
 */
function PostPage({ post }) {
  const content = post ? post.content : null;
  // const content = post && typeof post.content === 'string' ? post.content.replace(/\r?\n|\r|\\"/g, '') : null;

  return (
    <div className="container">
      {post ? (
        <Post sourceWebsite={post.source_website} thumbnail={post.thumbnail} title={post.title} content={content} />
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

  return { props: { post: post[0] } };
}

PostPage.propTypes = {
  post: PropTypes.object,
};

export default PostPage;
