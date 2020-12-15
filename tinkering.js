let arr = [1, 2, 3, 4, 55, 656, 856, 3, 2, 55];

let unique = [];
arr.forEach((element) => {
  if (!unique.includes(element)) {
    unique.push(element);
  }
});

console.log(unique);
