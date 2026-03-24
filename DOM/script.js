// access all divs which has class 'box'
let divs = document.querySelectorAll(".box");
// change the inner text using index
idx = 0;
for(div of divs){
    divs[idx].innerText = "Hello";
    console.log(divs[idx]);
    idx++;
}

let heding = document.querySelector("h1");
heding.innerText = heding.innerText + " to my website";
console.log(heding);