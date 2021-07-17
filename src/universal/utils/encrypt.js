import md5 from 'md5';
/**
 * This is a basic encryption function
 * @param {String} text - Encrypted text
 */
function Encrypt(text) {
  return md5(md5(md5(md5(md5(text)))));
}

export default Encrypt;
