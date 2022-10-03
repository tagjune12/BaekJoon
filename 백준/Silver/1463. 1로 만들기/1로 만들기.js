let input = require('fs').readFileSync('dev/stdin').toString().trim();

function solution() {
  let N = parseInt(input);

  const bfs = (start) => {
    const queue = [[start, 0]];
    const visit = [start];

    while (queue.length > 0) {
      const [cur, count] = queue.shift();
      if (cur === 1) {
        return count;
      }

      if ((cur - 1) > 0 && !visit.includes(cur - 1)) {
        queue.push([cur - 1, count + 1]);
        visit.push(cur - 1);
      }
      if ((cur % 2) === 0 && !visit.includes(cur / 2)) {
        queue.push([cur / 2, count + 1]);
        visit.push(cur / 2);
      }
      if ((cur % 3) === 0 && !visit.includes(cur / 3)) {
        queue.push([cur / 3, count + 1]);
        visit.push(cur / 3);
      }
    }
  }
  console.log(bfs(N));
}

solution();