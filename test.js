const countApple = (appleArr,boxArr)=>{
const sortedBoxes = [...boxArr].sort((a,b)=>b - a);
let appleSum = [...appleArr].reduce((acc,el)=> acc + el,0);
let boxAmt = 0;
for(let i = 0 ; i < sortedBoxes.length ; i++){
    if(appleSum <= 0){
        return boxAmt;
    }
    appleSum -= sortedBoxes[i];
    boxAmt++;
}
}

console.log(countApple([2,1,4,3],[5,1,8]));