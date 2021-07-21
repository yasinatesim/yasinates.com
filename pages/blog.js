import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// Components
import Posts from '@/universal/containers/posts';

import { posts } from '../public/api/cache/posts.json';

/**
 * This is posts page
 * @param {Array} posts - This is Medium and DEV posts
 */
function AboutPage({ posts: articles }) {
  return (
    <div>
      <Helmet>
        <title>Blog | Yasin ATEŞ - Frontend Developer</title>
        <meta
          name="description"
          content="Yazdığım makalelere blog sayfamdan ulaşabilirsiniz."
        />

        <meta property="og:title" content="Blog | Yasin ATEŞ - Frontend Developer" />
        <meta
          property="og:description"
          content="Yazdığım makalelere blog sayfamdan ulaşabilirsiniz."
        />
      </Helmet>

      <Posts posts={articles} />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts,
    },
  };
}

AboutPage.propTypes = {
  posts: PropTypes.array,
};

export default AboutPage;
