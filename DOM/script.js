let divs = document.querySelectorAll(".box");
idx = 0;

for(div of divs){
    divs[idx].innerText = "Hello";
    console.log(divs[idx]);
    idx++;
}


