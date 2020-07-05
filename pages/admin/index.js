import React, { useState } from 'react';

// Utilities
import Encrypt from '@/utils/encrypt';
import { Fetch } from '@/utils/fetch';

function Admin() {
  const [value, setValue] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleFormSubmit = () => {
    if (Encrypt(value) === password) {
      setIsLoggedIn(true);
    }
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleFormSubmit();
    }
  };

  const handleRequest = async (type) => {
    if (type === 'posts') {
      await Fetch(`${process.env.NEXT_PUBLIC_POSTS_API_URL}`);
    }
    if (type === 'repos') {
      await Fetch(`${process.env.NEXT_PUBLIC_REPOS_API_URL}`);
    }
  };

  return (
    <div className="center">
      {!isLoggedIn ? (
        <div className="field">
          <input
            type="password"
            required
            autoComplete="off"
            id="password"
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
          />
          <label htmlFor="password" title="Şifrenizi girin" data-title="Şifre" />
          <button type="button" onClick={handleFormSubmit} className="form-btn">
            Gönder
          </button>
        </div>
      ) : (
        <div>
          <button type="button" onClick={() => handleRequest('posts')} className="form-btn">
            Posts
          </button>

          <button type="button" onClick={() => handleRequest('repos')} className="form-btn">
            Gihtub
          </button>
        </div>
      )}
    </div>
  );
}

export default Admin;
