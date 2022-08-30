function solution() {
  let [N, r, c] = require('fs').readFileSync('dev/stdin').toString().trim().split(' ').map(v => +v);

  let size;
  if (N === 1) {
    size = 2;
  } else if (N > 1) {
    size = Math.pow(2, N);
  }

  let start = 0;
  while ((size / 2) >= 1 && r >= 0 && c >= 0) {
    let section;
    if (r < Math.floor(size / 2)) {
      if (c < Math.floor(size / 2)) {
        // 섹션 1
        section = 1;
        // console.log([r, c])
      } else {
        // 섹션 2 
        section = 2;
        // console.log([r, c]);
        c -= Math.floor(size / 2);
      }
    } else {
      if (c < Math.floor(size / 2)) {
        // 섹션 3 
        section = 3;
        // console.log([r, c]);
        r -= Math.floor(size / 2);
      } else {
        // 섹션 4 
        section = 4;
        // console.log([r, c]);
        r -= Math.floor(size / 2);
        c -= Math.floor(size / 2);
      }
    }

    start += (section - 1) * Math.floor(size / 2) * Math.floor(size / 2); // (i-1)*2^2(n-1)
    // console.log(size, section, start);
    size = Math.floor(size / 2);
  }
  console.log(start);
}

solution();