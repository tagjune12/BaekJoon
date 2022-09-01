let input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

function solution() {
  const MAX_SIZE = +input.shift();
  const answer = [0, 0];
  const paper = [];
  input.forEach(row => {
    paper.push(row.split(' ').map(v => +v));
  });

  const recursive = (start, size) => {
    const color = paper[start[0]][start[1]];
    if (size === 1) {
      answer[color]++;
      return;
    }

    for (let i = start[0]; i < start[0] + size; i++) {
      for (let j = start[1]; j < start[1] + size; j++) {
        if (color !== paper[i][j]) {
          const halfSize = Math.floor(size / 2);
          recursive(start, halfSize);
          recursive([start[0], start[1] + halfSize], halfSize);
          recursive([start[0] + halfSize, start[1]], halfSize);
          recursive([start[0] + halfSize, start[1] + halfSize], halfSize);

          return;
        }
      }
    }

    answer[color]++;
  }

  recursive([0, 0], MAX_SIZE);
  console.log(`${answer[0]}\n${answer[1]}`);
}

solution();