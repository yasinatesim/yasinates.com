/* eslint-disable */
import axios from 'axios';

/**
 * This function is makes a request and returns the data
 * @param {String} url - Request URL
 */
export async function Fetch(url) {
  const { data } = await axios.get(url);

  let arr = [];
  if (url.search('medium') !== -1) {
    arr = [...data.items];
  } else {
    if (Array.isArray(data)) {
      arr = [...data];
    }
    return data;
  }

  return arr;
}

/**
 * This function is commit on github repository and update the cache files
 * @param {String} file     - This is cached file name
 * @param {String} content  - This is new file content
 * @param {String} message  - This is commit message for Git
 */
export async function Commit({ file, content, message }) {
  /**
   * Get file content
   */
  const fileContent = JSON.stringify({ [file]: content });

  /**
   * Convert file content to "base64" format for Git
   */
  const encodedContent = Buffer.from(fileContent).toString('base64');

  /**
   * Connect to Github API
   */
  const auth = {
    username: process.env.NEXT_PUBLIC_GH_USERNAME,
    password: process.env.NEXT_PUBLIC_GH_TOKEN,
  };

  const { data: fileSHAs } = await axios.get(`${process.env.NEXT_PUBLIC_GH_REPOSITORY}/contents/public/api/cache`, {
    auth,
  });

  const { sha } = fileSHAs.find((f) => f.path.includes(file));

  /**
   * Update the specified file on Github
   */
  await axios.put(
    `${process.env.NEXT_PUBLIC_GH_REPOSITORY}/contents/public/api/cache/${file}.json`,
    {
      path: `public/api/cache/${file}.json`,
      message,
      content: encodedContent,
      sha,
    },
    {
      auth,
    }
  );
}
