const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const [N, M] = input.shift().split(' ').map(v => +v);
  const people = {};

  for (let i = 0; i < N; i++) {
    people[input[i]] = 1;
  }

  for (let i = N; i < N + M; i++) {
    people[input[i]] = people[input[i]] ? people[input[i]] + 1 : 1;
  }

  const answer = [];
  for (const name in people) {
    if (people[name] === 2) {
      answer.push(name);
    }
  }
  answer.sort();
  console.log(answer.length);
  answer.forEach(name => console.log(name));
}

solution();