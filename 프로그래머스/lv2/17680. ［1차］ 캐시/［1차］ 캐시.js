function solution(cacheSize, cities) {
    let answer=0;
    let cache = [];
    
    cities.forEach(city=>{
        const cityName = city.toUpperCase();
        if(!cache.includes(cityName)){
            answer += 5;
            cache.push(cityName);
            if(cache.length>cacheSize){
                cache.shift();
            }
        } else{
            // console.log(cache);
            const index = cache.findIndex(data => (data.toUpperCase() === cityName));
            cache = [...cache.slice(0,index), ...cache.slice(index+1), cityName];
            answer++;
        }
    });
    
    return answer;
}