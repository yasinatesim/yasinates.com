import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// Components
import Projects from '@/universal/containers/projects';

import { repos } from '../public/api/cache/repos.json';

/**
 * This page contains github projects
 * @param {Array} repos - This is Github repos
 */
function GithubPage({ repos: repositories }) {
  return (
    <div>
      <Helmet>
        <title>Github | Yasin ATEŞ - Frontend Developer</title>
        <meta name="description" content="Open source projelerime Github sayfamdan ulaşabilirsiniz." />

        <meta property="og:title" content="Github | Yasin ATEŞ - Frontend Developer" />
        <meta property="og:description" content="Open source projelerime Github sayfamdan ulaşabilirsiniz." />
      </Helmet>
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
