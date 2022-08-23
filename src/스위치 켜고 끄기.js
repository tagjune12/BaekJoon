let input = require('fs').readFileSync('src/example.txt').toString().trim().split('\n');

const n = +input.shift();
const switches = input.shift().split(' ').map(value => +value);
const students = input.slice(1).map(student => student.split(' ').map(v => +v));
const [BOY, GIRL] = [1, 2];

function solution() {
  students.forEach(student => {
    if (student[0] === BOY) {
      for (let i = student[1] - 1; i < n; i += student[1]) {
        switches[i] = switches[i] ? 0 : 1;
      }
    } else {
      const range = [student[1] - 1, student[1] - 1];
      while ((range[0] - 1 >= 0 && range[1] + 1)
        && (switches[range[0] - 1] === switches[range[1] + 1])) {
        range[0]--;
        range[1]++;
      }
      for (let i = range[0]; i <= range[1]; i++) {
        switches[i] = switches[i] ? 0 : 1;
      }
    }
  });
  let answer = '';
  for (let i = 0; i < switches.length; i += 20) {
    if ((i + 20) <= switches.length) {
      answer += switches.slice(i, i + 20).join(' ') + '\n';
    } else {
      answer += switches.slice(i).join(' ') + '\n';
    }
  }

  console.log(answer.trim());
}

solution();