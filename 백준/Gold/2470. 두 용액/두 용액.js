const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  input.shift();
  const liquid = input.shift().split(' ').map(v => +v);
  liquid.sort((a, b) => a - b);

  let min = 0;
  let max = liquid.length - 1;
  let answer = [-1000000000, 1000000000];

  while (min < max) {
    const sum = liquid[min] + liquid[max];

    if (sum > 0) {
      answer = Math.abs(liquid[answer[0]] + liquid[answer[1]]) < Math.abs(liquid[min] + liquid[max]) ? answer : [min, max];
      max--;
    } else if (sum < 0) {
      answer = Math.abs(liquid[answer[0]] + liquid[answer[1]]) < Math.abs(liquid[min] + liquid[max]) ? answer : [min, max];
      min++;
    } else {
      answer = [min, max];
      break;
    }
  }

  console.log(`${liquid[answer[0]]} ${liquid[answer[1]]}`);
}

solution();