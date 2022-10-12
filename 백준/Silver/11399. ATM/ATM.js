const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const time = input[1].split(' ').map(v => +v).sort((elemA, elemB) => {
    return elemA <= elemB ? -1 : 1;
  });
  let answer = 0;
  let temp = 0;
    
  for (let i = 0; i < time.length; i++) {
    temp += time[i];
    answer += temp;
  }
  console.log(answer);
}

solution();