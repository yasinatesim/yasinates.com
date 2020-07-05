/* eslint-disable no-shadow */
import PropTypes from 'prop-types';

// Components
import About from '@/containers/about';
import Projects from '@/containers/projects';
import Posts from '@/containers/posts';

import { posts } from './api/cache/posts.json';
import { repos } from './api/cache/repos.json';

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
