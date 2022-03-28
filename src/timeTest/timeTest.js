const NUM_OF_DATA = 100000000;

function type1() {
    const data = [];
    // 2.020s
    console.time('input');
    for (let i = 0; i < NUM_OF_DATA; i++) {
        data.push(i + 1);
    }

    console.timeEnd('input');
}

function type2() {
    const data = [];
    // input: 1.749s
    console.time('input');
    for (let i = 0; i < NUM_OF_DATA; i++) {
        data[i] = (i + 1);
    }

    console.timeEnd('input');
}

function loop1() {
    // loop1: 59.141ms
    let result = 0;
    const arr = Array(NUM_OF_DATA).fill(1);
    console.time('loop1');
    for (let i = 0; i < arr.length; i++) {
        result += arr[i];
    }
    console.timeEnd('loop1');
}
function loop2() {
    // loop2: 1.352s
    let result = 0;
    const arr = Array(NUM_OF_DATA).fill(1);
    console.time('loop2');
    for (const element of arr) {
        result += element;
    }
    console.timeEnd('loop2');
}
function loop3() {
    // loop3: 1.496s
    let result = 0;
    const arr = Array(NUM_OF_DATA).fill(1);
    console.time('loop3');
    arr.map(value => {
        result += value;
    })
    console.timeEnd('loop3');
}

function loop4() {
    // loop4: 958.096ms
    let result = 0;
    const arr = Array(NUM_OF_DATA).fill(1);
    console.time('loop4');
    arr.forEach(value => {
        result += value;
    })
    console.timeEnd('loop4');
}

function shiftfunc() {
    // 그냥 쥰내 오래 걸림
    let result = 0;
    const arr = Array(NUM_OF_DATA).fill(1);
    console.time('shiftfunc');
    for (let i = 0; i < arr.length; i++) {
        result += arr.shift();
    }
    console.timeEnd('shiftfunc');
}

// type1();
// type2();

// loop1();
// loop2();
// loop3();
// loop4();
shiftfunc();