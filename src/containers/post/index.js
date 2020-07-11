import PropTypes from 'prop-types';

// Styles
import styles from './index.module.scss';

function Post({ title, thumbnail, content, sourceWebsite }) {
  return (
    <div className={styles.container}>
      {thumbnail && sourceWebsite === 'dev' && (
        <figure>
          <img src={thumbnail} alt={title} />
        </figure>
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
}

Post.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  sourceWebsite: PropTypes.string,
};

export default Post;
