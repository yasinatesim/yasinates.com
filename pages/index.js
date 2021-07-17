/* eslint-disable no-shadow */
import PropTypes from 'prop-types';

// Components
import About from '@/universal/containers/about';
import Projects from '@/universal/containers/projects';
import Posts from '@/universal/containers/posts';

import { posts } from '../public/api/cache/posts.json';
import { repos } from '../public/api/cache/repos.json';

/**
 * This is homepage
 * @param {Array} posts - This is Medium and DEV posts
 * @param {Array} repos - Get the Github repos
 */
function Home({ posts, repos }) {
  return (
    <div>
      <About />
      <Projects repos={repos} />
      <Posts posts={posts} />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts,
      repos,
    },
  };
}

Home.propTypes = {
  posts: PropTypes.array,
  repos: PropTypes.array,
};

export default Home;
