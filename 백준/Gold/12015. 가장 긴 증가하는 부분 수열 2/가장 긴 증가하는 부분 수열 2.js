const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  input.shift();
  const numbers = input.shift().split(' ').map(v => +v);
  const answer = [numbers[0]];

  const binarySearch = (number) => {
    let left = 0;
    let right = answer.length - 1;
    let mid;
    let target = answer.length;
      
    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (answer[mid] >= number) {
        if (target > mid) {
          target = mid;
        }
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    answer[target] = number;
  };

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > answer.at(-1)) {
      answer.push(numbers[i]);
    } else {
      binarySearch(numbers[i]);
    }

  }

  console.log(answer.length);
}

solution();