// var, let, const  -> types for defining variable
// mostly used and new -> let
// const is used for constant value

// console.log("Welcome to my site");
// My_Name = "Sushant Dharmendra Shete";
// let age = 20; // let keyword prevent us from repetation
// a = null
// y = undefined
// let b;
// const A = 23;
// console.log(My_Name, age, a, y, b, A);


// Part-1
const arr = [1,2,3,4,5,6];

arr.forEach((item)=> {
    console.log(item);
});

// Part-2
// JavaScript Array forEach() Method
// Original array
const items = [12, 24, 36];
const copy = [];
items.forEach(function (item) {
    copy.push(item);
});
console.log(copy);

// Part-3
// JavaScript Array forEach() Method
// Original array
const items_ = [1, 29, 47];
const squareOfItems = [];
items_.forEach(function (item) {
    squareOfItems.push(item * item);
});
console.log(squareOfItems);

// Part-4
// JavaScript to illustrate toString() method
function func() {

    // Original array
    let arr = ["Geeks", "for", "Geeks"];

    // Creating a string
    let str = arr.toString();
    console.log(str);
}
func();

// JavaScript to illustrate toString() method
function func() {
    // Original array
    let arr = [2, 5, 8, 1, 4];
    // Creating a string
    let str = arr.toString();
    console.log(str);
}
func()

let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let result = matrix.toString();
console.log(result);