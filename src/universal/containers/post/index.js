import PropTypes from 'prop-types';

// Styles
import styles from './index.module.scss';

/**
 * This is post detail component
 ** Include the [post] file
 * @param {String} title         - This is detail page title
 * @param {String} thumbnail     - This is thumbnail photo
 * @param {String} sourceWebsite - This value for "medium" or "dev" condition
 */
function Post({ title, thumbnail, content, sourceWebsite }) {
  return (
    <div className={styles.container}>
      {thumbnail && sourceWebsite === 'dev' && (
        <figure>
          {/* Image */}
          <img src={thumbnail} alt={title} />
        </figure>
      )}

      {/* Content */}
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
