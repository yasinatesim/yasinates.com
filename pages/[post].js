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

  return (
    <div className="container">
      {post ? (
        <>
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

  return { props: { post: firstPost } };
}

PostPage.propTypes = {
  post: PropTypes.object,
  githubGists: PropTypes.array,
};

export default PostPage;
