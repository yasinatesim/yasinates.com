import PropTypes from 'prop-types';

// Components
import Posts from '@/containers/posts';

import { posts } from '../public/api/cache/posts.json';

/**
 * This is posts page
 * @param {Array} posts - This is Medium and DEV posts
 */
function AboutPage({ posts: articles }) {
  return (
    <div>
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
