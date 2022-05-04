// Contact
// 실패
let input = require('fs').readFileSync("./example.txt").toString().trim().split("\n");
// let input = require('fs').readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input.shift().trim());
function solution(N) {
  for (let i = 0; i < N; i++) {
    const pattern = input.shift().trim();
    // console.log(pattern);
    const regExp = new RegExp(`(100+1+|01)+`, 'g');
    const matchResult = pattern.match(regExp);
    console.log(matchResult);

    if (matchResult === null) {
      console.log('NO');
    } else {
      console.log(matchResult.join("") === pattern ? 'YES' : 'NO');
    }

  }
}

solution(N);