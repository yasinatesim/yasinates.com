import PropTypes from 'prop-types';

// Styles
import styles from './index.module.scss';

/**
 * This is section title component
 * @param {String} title    - This is title text
 * @param {String} subtitle - This is subtitle text
 */
function Title({ title, subtitle }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div>{subtitle}</div>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Title;
