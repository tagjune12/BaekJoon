function calcD(number, op) {
  const value = (number * 2) % 10000;
  return [value, op + 'D'];
}

function calcS(number, op) {
  const value = number === 0 ? 9999 : number - 1;
  return [value, op + 'S'];
}

function calcL(number, op) {
  const value = (number % 1000) * 10 + Math.floor(number / 1000);
  return [value, op + 'L'];
}
function calcR(number, op) {
  const value = (number % 10) * 1000 + Math.floor(number / 10);
  return [value, op + 'R'];
}

function solution() {
  const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
  let input = require('fs').readFileSync(path).toString().trim().split('\n');

  const T = +input.shift();
  const answer = [];

  const search = (start, target) => {
    const queue = [[start, '']];
    const visit = Array(10000).fill(false);
    visit[start] = true;

    while (queue.length > 0) {
      const cur = queue.shift();
      if (cur[0] === target) {
        answer.push(cur[1]);
        return;
      }

      let next;

      next = calcD(cur[0], cur[1]);
      if (!visit[next[0]]) {
        queue.push(next);
        visit[next[0]] = true;
      }

      next = calcS(cur[0], cur[1]);
      if (!visit[next[0]]) {
        queue.push(next);
        visit[next[0]] = true;
      }

      next = calcL(cur[0], cur[1]);
      if (!visit[next[0]]) {
        queue.push(next);
        visit[next[0]] = true;
      }

      next = calcR(cur[0], cur[1]);
      if (!visit[next[0]]) {
        queue.push(next);
        visit[next[0]] = true;
      }

    }
  }

  input.forEach(v => {
    const [A, B] = v.split(' ').map(v => +v);

    search(A, B);
  });

  console.log(answer.join('\n').trim());
}

solution();