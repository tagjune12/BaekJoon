let fs = require('fs');
let input = fs.readFileSync('./example.txt').toString().split('\n');
const [n, k] = input.shift().split(" ");
let items = input.map(arr => arr.split(" ").map(x => +x));


// n = 물품수, k = 버틸 수 있는 무게
// item = [무게, 가치]

function compare(listA, listB) {
  const valueA = listA[1];
  const valueB = listB[1];

  return valueB - valueA;
}

items.sort(compare);
let total = [];

items.forEach((list, index) => {
  let totalWeight = list[0];
  let totalValue = list[1];

  for (let i = index + 1; i < n; i++) {
    if ((k - (totalWeight + items[i][0]) >= 0)) {
      totalWeight += items[i][0];
      totalValue += items[i][1];
    }
  }
  total.push([totalWeight, totalValue]);
});

let max = 0;

total.forEach(list => {
  if (max < list[1]) max = list[1];
});

console.log(max);