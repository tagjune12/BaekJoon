let input = require('fs').readFileSync('src/example.txt').toString().trim();
function solution() {
  const square = +input;
  let answer = 0;

  for (let vertical = 1; vertical <= square; vertical++) {
    for (let horizontal = vertical; horizontal * vertical <= square; horizontal++) {
      // console.log(`(${vertical},${horizontal})`);
      answer++;
    }
  }
  console.log(answer);
}

solution();