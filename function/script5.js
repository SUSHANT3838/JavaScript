function counter() {
    let count = 0;

    return function(){
        count++;
        return count;
    };
}
const increment = counter();

for(let i=0; i<10; i++){
    console.log(increment());
}
