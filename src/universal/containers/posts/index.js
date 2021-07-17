import React from 'react';
import PropTypes from 'prop-types';

// Components
import Title from '@/universal/components/title';
import PostItem from '@/universal/components/post-item';

// Styles
import styles from './index.module.scss';

/**
 * This is posts container
 ** This is main component include in the "pages"
 */
function Posts({ posts }) {
  return (
    <div className="container">
      <Title title="Blog" subtitle="Yazdığım Makaleler 😋" />
      <div className="row">
        {posts.map((post) => (
          <div className={`col-md-3 ${styles.wrapper}`} key={post.id}>
            <PostItem
              title={post.title}
              image={post.thumbnail}
              link={post.id}
              description={post.description}
              sourceWebsite={post.source_website}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.array,
};

export default Posts;
