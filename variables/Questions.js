// Take input from user and make the user name using fullName
// let FullName = prompt("Enter your full name without space");
// let lowwerCaseName = FullName.toLowerCase();
// let userName = "@" + lowwerCaseName + lowwerCaseName.length;
// console.log(userName)

// Avarage
let marks = [85, 97, 44, 37, 76, 60];
let mark = 0;

// method one
// for(i=0 ; i<marks.length; i++){
//     mark += marks[i]
// }

// method two
for(let val of marks){
    mark += val;
}

let avg = mark / marks.length;
console.log(`Avarage of marks of class = ${avg}`);