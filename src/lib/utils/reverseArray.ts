const reverseArray = (x: any) => {
  const result = [];
  for (let i = 0; i < x.length; i++) {
    result.push(x[x.length - i - 1]);
  }
  return result;
};

export default reverseArray;
