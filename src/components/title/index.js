import PropTypes from 'prop-types';

// Styles
import styles from './index.module.scss';

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
