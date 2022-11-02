function solution(s) {
    const numbers = s.split(' ').map(v=> +v);
    numbers.sort((a,b)=> a - b);
    
    return `${numbers[0]} ${numbers.at(-1)}`;
}