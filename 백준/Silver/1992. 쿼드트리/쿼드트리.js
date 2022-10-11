const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const size = +input.shift();
  const arr = input.map(v => v.trim().split(''));
  const answer = [];

  const recursive = (size, start) => {
    if (size === 1) {
      answer.push(arr[start[0]][start[1]]);
      return;
    }

    const temp = arr[start[0]][start[1]];

    for (let i = start[0]; i < start[0] + size; i++) {
      for (let j = start[1]; j < start[1] + size; j++) {
        if (temp !== arr[i][j]) {
          const half = size / 2;
          answer.push('(');
          recursive(half, [start[0], start[1]]);
          recursive(half, [start[0], start[1] + half]);
          recursive(half, [start[0] + half, start[1]]);
          recursive(half, [start[0] + half, start[1] + half]);
          answer.push(')');
          return;
        }
      }
    }
    answer.push(temp);
  }

  recursive(size, [0, 0]);
  console.log(answer.join(''));
}

solution();