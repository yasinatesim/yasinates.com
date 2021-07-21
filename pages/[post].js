import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// Components
import Post from '@/universal/containers/post';

import { posts } from '../public/api/cache/posts.json';

/**
 * This is post detail page
 * @param {Object} post - This is single post data
 */
function PostPage({ post }) {
  const content = post ? post.content : null;

  return (
    <div className="container">
      {post ? (
        <>
          <Helmet>
            <title>{post.title} | Yasin ATEŞ - Frontend Developer</title>
            <meta name="description" content={post.description} />

            <meta property="og:title" content={`${post.title} | Yasin ATEŞ - Frontend Developer`} />
            <meta property="og:description" content={post.description} />
          </Helmet>
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
};

export default PostPage;
