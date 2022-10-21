function flatAndFormat(arr1: Array<any>) {
  return arr1.reduce(
    (acc, val) =>
      Array.isArray(val)
        ? acc.concat(flatAndFormat(val))
        : acc.concat(parseInt(val)),
    []
  );
}

const modArray = (arr1: Array<any>): Array<number> => {
  let treatedArr: Array<number> = flatAndFormat(arr1);
  let multArr: Array<number> = [];
  console.log(treatedArr.length);
  for (let i = 1; i < treatedArr.length + 1; i++) {
    multArr[i] = treatedArr
      .filter((n: number) => {
        return n !== i;
      })
      .reduce((acc, n) => acc * n);
  }
  return multArr.splice(1);
};
console.log(modArray([1, 2, 3,1,2]));
