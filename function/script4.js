// new method of declare the function
const square = n => n * n; // arrow function (ES6)
let sq = square(4);
console.log(`The square of 4 is ${sq}`);

// IIFE used for creating private variable
var counter = (function(){
    var count = 0;// private

    return {
        increament : function(){
            count++;
        },
        decreament : function(){
            count--;
        },
        getCount : function(){
            return count;
        }
    };
})();

counter.increament();
counter.increament();
counter.increament();

console.log(`The total count is ${counter.getCount()}`);

// not allow to direct access of count
console.log(counter.count);// undefined ->because it is private variable