import PropTypes from 'prop-types';

// Components
import Projects from '@/containers/projects';

import { repos } from '../public/api/cache/repos.json';

/**
 * This page contains github projects
 * @param {Array} repos - This is Github repos
 */
function GithubPage({ repos: repositories }) {
  return (
    <div>
      <Projects repos={repositories} />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      repos,
    },
  };
}

GithubPage.propTypes = {
  repos: PropTypes.array,
};

export default GithubPage;
