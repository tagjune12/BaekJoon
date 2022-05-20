const fs = require('fs');
class Scanner {
    constructor(fileName) {
        this.read = fs.readFileSync(fileName).toString().trim().split('\n');
        this.stringToken = [];
    }
    next() {
        if (this.stringToken.length === 0) {
            if (this.read.length > 0) {
                this.stringToken = this.read.shift().split(" ");
            } else {
                return null;
            }
        }
        return this.stringToken.shift();
    }

    nextNumber() {
        const next = this.next();
        if (next) {
            return Number(next);
        } else {
            return null;
        }

    }

    nextLine() {
        if (this.read.length > 0) {
            return this.read.shift();
        } else {
            return null;
        }

    }
}
// const scanner = new Scanner('./dev/stdin');
const scanner = new Scanner('./example.txt');
let N, L, F, pages;
const input = function () {
    L = 0;
    [N, tmp, F] = scanner.nextLine().split(" ");
    let infos = scanner.read.splice(0).map(info => info.split(" "));
    tmp = tmp.split('/');
    L += Number(tmp[0]) * (24 * 3600 * 1000);
    tmp = tmp[1].split(":");
    L += Number(tmp[0]) * (3600 * 1000);
    L += Number(tmp[1]) * (60 * 1000);
    pages = infos.map(info => {
        let tmp = [];
        let time = new Date(info[0] + 'T' + info[1]).getTime();
        tmp[0] = time
        tmp[1] = info[2];
        tmp[2] = info[3];
        return tmp;
    })
    pages.sort((a, b) => {
        if (a[2] === b[2]) {
            if (a[1] === b[1]) {
                return a[0] - b[0];
            } else if (a[1] < b[1]) {
                return -1
            } else {
                return 1;
            }
        } else {
            if (a[2] < b[2]) {
                return -1
            } else {
                return 1
            }
        }
    })
    let count = 0;
    let answer = {};
    for (let i = 0; i < N / 2; i++) {
        let pay = (Math.abs(pages[i * 2][0] - pages[i * 2 + 1][0]) - L) / (1000 * 60) * F
        if (pay > 0) {
            count++;
            if (!answer[pages[i * 2][2]]) {
                answer[pages[i * 2][2]] = pay
            } else {
                answer[pages[i * 2][2]] += pay;
            }
        }
    }
    if (count === 0) console.log(-1);
    else {
        Object.entries(answer).forEach(v => {
            console.log(v[0] + " " + v[1]);
        })
    }
}

const pro = function () {

}

const solve = function () {
    input();
    pro();
}

solve();