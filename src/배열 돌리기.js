function solution() {
  let input = require('fs').readFileSync('src/example.txt').toString().split('\n');
  // let input = require('fs').readFileSync('dev/stdin').toString().split('\n');
  const answer = [];
  const testCase = +input.shift();
  for (let i = 0; i < testCase; i++) {
    const [SIZE, DEGREE] = input.shift().split(' ').map(value => +value);
    const arr = [];
    const temp = [];
    for (let j = 0; j < SIZE; j++) {
      const row = input.shift().split(' ').map(element => +element);
      arr.push([...row]);
      temp.push([...row]);
    }
    // let temp2 = [];
    const clockWise = [
      Array.from(Array(SIZE)).map((_, idx) => [idx, idx]), // main cross
      Array.from(Array(SIZE)).map((_, idx) => [idx, ((SIZE + 1) / 2) - 1]), // center col
      Array.from(Array(SIZE)).map((_, idx) => [idx, SIZE - 1 - idx]), // sub cross
      Array.from(Array(SIZE)).map((_, idx) => [((SIZE + 1) / 2) - 1, SIZE - 1 - idx]), // center row
      Array.from(Array(SIZE)).map((_, idx) => [SIZE - 1 - idx, SIZE - 1 - idx]), // main cross-reverse
      Array.from(Array(SIZE)).map((_, idx) => [SIZE - 1 - idx, ((SIZE + 1) / 2) - 1]), // center col-reverse
      Array.from(Array(SIZE)).map((_, idx) => [SIZE - 1 - idx, idx]), // sub cross-reverse
      Array.from(Array(SIZE)).map((_, idx) => [((SIZE + 1) / 2) - 1, idx]), // center row-reverse
    ];
    if (DEGREE === 0) {
      answer.push(arr.reduce((result, row) => result.concat(row.join(' ')), []).join('\n'));
      continue;
    }
    const gap = Math.abs(DEGREE) / 45;
    if (DEGREE < 0) { // 반시계 방향
      const counterClockWise = clockWise.reverse();
      for (let i = 0; i < 4; i++) { // 축 4개
        const from = counterClockWise[i];
        const to = counterClockWise[(i + gap) % 8];

        for (let j = 0; j < SIZE; j++) {
          const [fromRow, fromCol] = from[j];
          const [toRow, toCol] = to[j];
          // console.log(arr[toRow][toCol], temp[fromRow][fromCol]);
          temp[toRow][toCol] = arr[fromRow][fromCol];
        }
        // console.log();
      }
    } else { // 시계방향
      for (let i = 0; i < 4; i++) { // 축 4개
        const from = clockWise[i];
        const to = clockWise[(i + gap) % 8];
        // console.log('check', from, to);
        for (let j = 0; j < SIZE; j++) {
          const [fromRow, fromCol] = from[j];
          const [toRow, toCol] = to[j];
          // console.log(arr[toRow][toCol], temp[fromRow][fromCol]);
          temp[toRow][toCol] = arr[fromRow][fromCol];
        }
        // console.log();
      }
    }
    // console.log(temp, '\n');
    answer.push(temp.reduce((result, row) => result.concat(row.join(' ')), []).join('\n'));

  }
  console.log(answer.join('\n'));
}

solution();