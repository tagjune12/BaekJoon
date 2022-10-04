const path = process.platform === 'linux' ? 'dev/stdin' : './src/example.txt'
let input = require('fs').readFileSync(path).toString().trim().split('\n');

// 최소 공배수
function lcm(M, N) {
  if (M >= N) {
    return M * N / gcd(M, N);
  } else {
    return M * N / gcd(N, M);
  }
}

function gcd(a, b) {
  let r;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function solution() {
  const T = +input[0];
  for (let i = 1; i <= T; i++) {
    const [M, N, x, y] = input[i].split(' ').map(v => +v);
    const MAX = lcm(M, N);

    if (x === M && y === N) {
      console.log(MAX);
      continue;
    }

    let answer = -1;
    for (let i = x; i <= MAX; i += M) {

      if ((i % N === y) || (i % N === 0 && y === N)) {
        answer = i;
        break;
      }
    }
    console.log(answer);
  }
}

solution();