import md5 from 'md5';

function Encrypt(text) {
  return md5(md5(md5(md5(md5(text)))));
}

export default Encrypt;
