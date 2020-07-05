import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
import Link from 'next/link';

// Styles
import styles from './index.module.scss';

function PostItem({ title, link, image, description, sourceWebsite }) {
  // const router = useRouter();
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   router.push(`/${link}`);
  // };

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
