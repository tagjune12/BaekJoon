// 문서 검색
let input = require('fs').readFileSync('./example.txt').toString().split('\n');
const document = input.shift().trim();
const wordToSearch = input.shift().trim();

function solution(document, wordToSearch) {
  const regExp = new RegExp(`${wordToSearch}`, 'g');
  const match = document.match(regExp);

  return match ? match.length : 0;
}

console.log(solution(document, wordToSearch));