let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const [n, k] = input.shift().split(" ").map(v => +v);

const solution = () => {
    if (n <= k) return 0;

    let bottles = Array(n).fill(1);

    while (bottles.length > k) {
        let check = false;
        for (let i = 0; i < bottles.length - 1; i++) {
            if (bottles[i] === bottles[i + 1]) {
                check = true;
                bottles[i] = bottles[i] + bottles[i + 1];
                bottles[i + 1] = 0;
            }
        }
        if (check === false) bottles[bottles.length] = 1;
        bottles = bottles.filter(value => value !== 0);
    }

    const total = bottles.reduce((acc, value) => acc += value, 0);
    return total - n;
}


console.log(solution());

console.log(Math.log2(1000000));