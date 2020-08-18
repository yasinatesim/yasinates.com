/**
 * Compare array based on given "key"
 * @param {Array} otherArray  - Array to compare
 * @param {String} key        - Key to compare
 */
export function Comparer(otherArray, key) {
  return (current) => otherArray.filter((other) => other[key] === current[key]).length === 0;
}

export default Comparer;
