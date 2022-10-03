const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const [N, M] = input.shift().split(' ').map(v => +v);
  const neverSeen = new Set();
  const neverHeard = new Set();

  for (let i = 0; i < N; i++) {
    neverHeard.add(input[i]);
  }

  for (let i = N; i < N + M; i++) {
    neverSeen.add(input[i]);
  }

  const interSection = new Set();

  for (const elem of neverHeard) {
    if (neverSeen.has(elem)) {
      interSection.add(elem);
    }
  }

  console.log(interSection.size);
  [...interSection].sort().forEach(v => console.log(v));
}

solution();