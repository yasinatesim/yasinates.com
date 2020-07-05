export function Comparer(otherArray, key) {
  return (current) => otherArray.filter((other) => other[key] === current[key]).length === 0;
}

export default Comparer;
