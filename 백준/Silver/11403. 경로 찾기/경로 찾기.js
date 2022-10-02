let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

function solution() {
  const count = +input.shift();
  const nodes = Array.from(Array(count), () => []);
  const answer = Array.from(Array(count), () => Array(count).fill(0));

  input.forEach((row, rowIndex) => {
    const col = row.split(' ');

    col.forEach((value, colIndex) => {
      if (value === '1') {
        nodes[rowIndex].push(colIndex);
      }
    });
  });

  const dfs = (start) => {
    const stack = [start];
    const visit = [];

    while (stack.length > 0) {
      const cur = stack.pop();
      for (const next of nodes[cur]) {
        if (!visit.includes(next)) {
          visit.push(next);
          stack.push(next);
        }
      }
    }
    visit.forEach(value => {
      if (value !== undefined) {
        answer[start][value] = 1;
      }
    })
  }

  for (let i = 0; i < nodes.length; i++) {
    dfs(i);
  }

  answer.forEach(row => {
    console.log(...row);
  });
}

solution();