let input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');
const SIZE = +input.shift();

function checkBoundary(row, col) {
  return (row >= 0 && col >= 0 && row < SIZE && col < SIZE);
}

function compare(numberA, numberB) {
  return numberA < numberB ? -1 : 1;
}

function solution() {
  const answer = [];
  const apartMap = [];
  input.forEach(row => {
    apartMap.push(row.split('').map(v => +v));
  });

  const bfs = (start) => {
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];
    const queue = [start];
    let count = 1;

    apartMap[start[0]][start[1]] = 0;

    while (queue.length > 0) {
      const [curRow, curCol] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const [nextRow, nextCol] = [curRow + dy[i], curCol + dx[i]];
        if (checkBoundary(nextRow, nextCol) && apartMap[nextRow][nextCol]) {
          queue.push([nextRow, nextCol]);
          apartMap[nextRow][nextCol] = 0;
          count++;
        }
      }
    }

    return count;
  }

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (apartMap[i][j] === 1) {
        answer.push(bfs([i, j]));
      }
    }
  }

  console.log(`${answer.length}`);
  console.log(`${answer.sort(compare).join('\n')}`);
}

solution();
