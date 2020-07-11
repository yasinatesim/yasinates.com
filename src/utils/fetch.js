/* eslint-disable */
import axios from 'axios';

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

export async function Commit({ file, content, message }) {
  const fileContent = JSON.stringify({[file]: content});
  const encodedContent = Buffer.from(fileContent).toString('base64');

  const auth = {
    username: process.env.NEXT_PUBLIC_GH_USERNAME,
    password: process.env.NEXT_PUBLIC_GH_TOKEN,
  };

  const { data: fileSHAs } = await axios.get(`${process.env.NEXT_PUBLIC_GH_REPOSITORY}/contents/pages/api/cache`, {
    auth,
  });

  const { sha } = fileSHAs.find((f) => f.path.includes(file));

  await axios.put(
    `${process.env.NEXT_PUBLIC_GH_REPOSITORY}/contents/pages/api/cache/${file}.json`,
    {
      path: `pages/api/cache/${file}.json`,
      message,
      content: encodedContent,
      sha,
    },
    {
      auth,
    }
  );
}
