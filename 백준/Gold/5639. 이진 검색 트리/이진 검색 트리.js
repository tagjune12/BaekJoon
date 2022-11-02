const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution() {
  const tree = input.map(value => +value);
  const answer = [];
  const stack = [[0, tree.length]];

  while (stack.length > 0) {
    const [start, end] = stack.pop();
    // console.log([start, end]);
    if (start >= end) continue;

    let temp;

    for (let i = start + 1; i < end; i++) {
      if (tree[start] < tree[i]) {
        temp = i;
        break;
      }
    }

    if (temp) {
      stack.push([start + 1, temp]);
      stack.push([temp, end]);
    } else {
      stack.push([start + 1, end]);
    }
    answer.push(tree[start]);
  }

  console.log(answer.reverse().reduce((acc, node) => acc + node + '\n', '').trim());
}

solution();