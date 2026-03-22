// Templet litterals
let std = {
    name : "Sushant",
    age : 20
}
let details = `My name is ${std.name}, i am ${std.age} year old.`;
console.log(details);

// Escape charecter -> \n : produce next line
console.log("Sushant\nShete")
// Output :- 
// Sushant 
// Shete

// Escape charecter -> \t : produce space of 4 letter
console.log("Sushant\tShete");
// Output :- 
// Sushant    Shete


let str = "Sushant";

// length of string
len = str.length;
console.log(len);

// Upprecase
console.log(str.toUpperCase()); // temperory change
newStr = str.toUpperCase();
console.log(newStr); // new string is created

// trim() -> it removes unesseary space from starting and ending side of string
let tStr = "   Sushant   ";
console.log(tStr)
console.log(tStr.trim());

// replace vale of string
let a = "hello";
console.log(a.replace("h", "y")) // replace 1st match by new letter
console.log(a.replaceAll("l", "r")); // replace all matches by new lwtter