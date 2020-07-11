import PropTypes from 'prop-types';

// Components
import Projects from '@/containers/projects';

import { repos } from '../public/api/cache/repos.json';

function AboutPage({ repos: repositories }) {
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

AboutPage.propTypes = {
  repos: PropTypes.array,
};

export default AboutPage;
