const input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');

const n = input.shift();
let address = input.map(value => value.split('\r')[0]);
// ----------------------------------------------------------
function splitAddress(address) { // 11111111111111111111111111111000 -> [255,255,255,248] 로 바꿔주는 함수
    let result = [];
    for (let i = 0; i < 32; i += 8) {
        result.push(parseInt(address.slice(i, i + 8), 2));
    }
    return result;
}


address = address.map(value => { // 주소값을 2진수 형태의 문자열로 만듬
    return value.split(".").reduce((accumulator, value) => {
        return accumulator + parseInt(value).toString(2).padStart(8, 0);
    }, "");
});

// ip주소의 값이 최초로 달라지는 부분중 최소값을 찾음
let minIndex = 32;
for (let i = 1; i < address.length; i++) {
    splittedAddress = address[0].split("");
    splittedAddress2 = address[i].split("");

    splittedAddress.map((value, index) => {
        minIndex = Math.min(minIndex, value === splittedAddress2[index] ? 32 : index)
    })
}

// 서브넷 마스크를 구함
let subnetMask = Array(minIndex).fill(1).join("").padEnd(32, 0);
subnetMask = splitAddress(subnetMask);

// 네트워크 주소를 구함
address = address.map(value => splitAddress(value));
let networkAddress = address[0].map((value, index) => {
    return value & subnetMask[index];
})

// 답
networkAddress = networkAddress.map(value => value.toString()).join(".");
subnetMask = subnetMask.map(value => value.toString()).join(".");

console.log(networkAddress);
console.log(subnetMask);
// ----------------------------------------------------------


