const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const [N, M] = input.shift().split(' ').map(v => +v);
  const move = new Map();

  for (let i = 0; i < N; i++) {
    const [from, to] = input[i].split(' ').map(v => +v);
    move.set(from, to);
  }
  for (let i = N; i < M + N; i++) {
    const [from, to] = input[i].split(' ').map(v => +v);
    move.set(from, to);
  }

  const visit = Array(101).fill(false);

  const search = () => {
    const queue = [1];
    visit[1] = 0;

    while (queue.length > 0) {
      const cur = queue.shift();

      for (let i = 1; i <= 6; i++) {
        const next = cur + i;

        if (next > 0 && next <= 100) {
          const elem = move.has(next) ? [move.get(next), visit[cur] + 1] : [next, visit[cur] + 1];

          if (!visit[elem[0]] || visit[elem[0]] > elem[1]) {
            queue.push(elem[0]);
            visit[elem[0]] = elem[1];
          }
        }
      }
    }
  }

  search();
  console.log(visit[100]);
}

solution();