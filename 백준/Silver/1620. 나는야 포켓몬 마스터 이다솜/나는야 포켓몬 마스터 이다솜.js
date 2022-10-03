let input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

function solution() {
  const [N, M] = input.shift().split(' ').map(v => +v);
  const dict = new Map();

  for (let i = 0; i < N; i++) {
    dict.set(input[i], (i + 1).toString());
    dict.set((i + 1).toString(), input[i]);
  }

  const quiz = input.slice(N);
  quiz.forEach(q => {
    if (dict.has(q)) {
      console.log(dict.get(q));
    }
  });

}

solution();