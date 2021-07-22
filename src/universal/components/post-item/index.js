import PropTypes from 'prop-types';
import Link from 'next/link';

// Styles
import styles from './index.module.scss';

/**
 * This is posts item component
 * @param {String} title          - This is post title
 * @param {String} link           - This is post link
 * @param {String} image          - This is post image
 * @param {String} description    - This is post description
 * @param {String} sourceWebsite  - This value for "medium" or "dev" condition
 */
function PostItem({ title, link, image, description, sourceWebsite }) {
  return (
    <Link href={`/${link}`}>
      <a className={styles.item}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={image} alt={title} />
            <span>{sourceWebsite}</span>
          </div>
          <span className={styles.title}>{title}</span>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: `<p>${description}</p>` }} />
        </div>
        <div className={styles.button}>Devamını oku</div>
      </a>
    </Link>
  );
}

PostItem.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  sourceWebsite: PropTypes.string,
};

export default PostItem;
