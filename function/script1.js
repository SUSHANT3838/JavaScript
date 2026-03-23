// simple function
function myFunction(){
    console.log("Hello");
    console.log("Wlcome!")
}

myFunction();

// with parameter
function Function (name){
    console.log(name);
}
Function("Sushant");// pass the argument

// Addition function
function add (a, b){
    return a + b;
};
let result = add(5,6); // storing addition in the variabe
console.log(result); // printing the result

// default parameter of function
function greet(name = "Guest"){
    console.log("Hello, " + name);
}
greet(); // Default name -> Guest 
greet("Sushant"); // Assigned name -> sushant