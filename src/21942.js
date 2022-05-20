// 부품 대여장
let input = require("fs").readFileSync("./example.txt").toString().trim().split("\r\n");
// let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\r\n");

function solution(input) {
    // N : 정보 개수, L: 대여기간, F: 벌금
    const [N, L, F] = input.shift().trim().split(" ").map((value, index) => {
        if (index === 1) {
            const [D, h, m] = [value.split("/")[0], ...value.split("/")[1].split(":")];
            const ms = parseInt(D) * 24 * 60 * 60 * 1000 + parseInt(h) * 60 * 60 * 1000 + parseInt(m) * 60 * 1000;
            return ms;
        } else return value;
    });
    /*
        records = {
            user : {
                item : [날짜]
            }
        }
    */
    const records = {};

    input.forEach(record => {
        const [date, time, item, user] = record.split(" ");
        if (!records[user]) {
            records[user] = {
                [item]: [new Date(`${date} ${time}`)]
            }
        } else {
            if (!records[user][item]) {
                records[user][item] = [new Date(`${date} ${time}`)];
            } else {
                records[user][item].push(new Date(`${date} ${time}`));
            }
        }
    });
    const answer = [];
    Object.entries(records).forEach(record => {
        const username = record[0];
        const recordsByItem = Object.entries(record[1]);
        const totalFine = recordsByItem.reduce((sum, recordByItem) => {
            const timeStamp = recordByItem[1];
            let fine = 0;
            for (let i = 0; i < timeStamp.length; i += 2) {
                const differ = Math.abs(timeStamp[i + 1] - timeStamp[i]);
                if (differ >= L) fine += parseInt(F) * ((differ - L) / (1000 * 60));
            }
            return sum + fine;
        }, 0);
        if (totalFine > 0) answer.push(`${username} ${totalFine}`);
    });
    answer?.sort(compare);
    return (answer.length === 0) ? -1 : answer.join("\n");
}

function compare(valueA, valueB) {
    const [usernameA, usernameB] = [valueA.split(" ")[0], valueB.split(" ")[0]];

    if (usernameA < usernameB) {
        return -1;
    } else if (usernameA > usernameB) {
        return 1;
    } else return 0;
}

console.log(solution(input));