import PropTypes from 'prop-types';

// Components
import Title from '@/components/title';
import ProjectItem from '@/components/project-item';

/**
 * This is projects container
 ** This is main component include in the "pages"
 * @param {Array} repos - The array after the data is fetched
 */
function Projects({ repos }) {
  return (
    <div className="container">
      <Title title="Projelerim" subtitle="Open Source ❤️" />
      <div className="row">
        {repos.map((repo) => (
          <div className="col-md-3" key={repo.id}>
            <ProjectItem
              title={repo.full_name.replace('yasinatesim/', '')}
              link={`https://github.com/${repo.full_name}`}
              description={repo.description}
              fork={repo.fork}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Projects.propTypes = {
  repos: PropTypes.array,
};

export default Projects;
