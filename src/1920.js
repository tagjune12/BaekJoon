const input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const n = input.shift();
const A = input.shift().split(" ").map(x => +x);
const m = input.shift();
const target = input.shift().split(" ").map(x => +x);

// const answer = target.map(value => A.includes(value) ? 1 : 0);// 시간초과
function compare(a, b) {
  return a - b;
}

function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    // 찾은경우
    if (target == arr[middle]) return 1;
    // 못찾은 경우
    else if (target > arr[middle]) { // 타겟이 중간값보다 큰경우
      start = middle + 1;
    }
    else { // 타겟이 중간값보다 작은 경우
      end = middle - 1;
    }
  }
  return 0;
}

A.sort(compare);

const answer = target.map(value => binarySearch(A, value));
console.log(answer.join('\n'));