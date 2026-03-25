// access all divs which has class 'box'
let divs = document.querySelectorAll(".box");
// change the inner text using index
idx = 0;
for(div of divs){
    divs[idx].innerText = "Hello";
    console.log(divs[idx]);
    idx++;
}
// let div = divs[0] = "Hello my name is sushant shete";
// console.log(div);

let heading = document.querySelector("h1");
heading.innerText = heading.innerText + " to my website";
console.log(heading);

let div1 = document.querySelector(".box");
console.log(div1);

let para = document.querySelector("para");
console.log(para.getAttribute("para"));