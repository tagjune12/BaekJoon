function solution() {
  const input = require('fs').readFileSync('src/example.txt').toString().trim().split('\n');
  input.shift();
  const MAX = Math.max(...input);
  const fib = [[1, 0], [0, 1]];

  for (let i = 2; i <= MAX; i++) {
    fib[i] = [fib[i - 1][0] + fib[i - 2][0], fib[i - 1][1] + fib[i - 2][1]];
  }

  let answer = '';

  input.forEach(n => {
    const idx = +n;
    answer += `${fib[idx][0]} ${fib[idx][1]}\n`;
  });
  console.log(answer.trim());
}

solution();