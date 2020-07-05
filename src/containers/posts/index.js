import React from 'react';
import PropTypes from 'prop-types';

// Components
import Title from '@/components/title';
import PostItem from '@/components/post-item';

import styles from './index.module.scss';

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
