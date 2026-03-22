let mark = prompt("Enter your mark : ");
if (mark >= 80 && mark <= 100){
    console.log("A");
}else if(mark >= 70 && mark < 80){
    console.log("B");
}else if(mark >= 60 && mark < 70){
    console.log("C");
}else if(mark >= 50 && mark < 60){
    console.log("D");
}else if(mark >= 0 && mark < 50){
    console.log("Fail");
}else{
    console.log("Enter valid marks.");
}