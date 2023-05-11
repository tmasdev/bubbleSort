const leftSpacing = 50;
const topSpacing = 30;
const iMax = 100;
const initialTop = 50;
const initialLeft = 300
const initialWidth = 100;
const animTime = 1000;
const sortElement = document.getElementById('sortButton');
const arrayLength = 15;
let inMotion = false;
function clearScreen(){
  document.getElementById("arrayContainer").innerHTML = '';
}
function rng(lower,upper){
  let diff = upper-lower;
  let val = lower+Math.floor(diff*Math.random());
  return(val);
}
function randomArray(len,lower,upper){
  let i = 0;
  let arr = [];
  let rand;
  while (i<len){
    arr.push("el"+i);
    rand = rng(lower,upper)
    arr.push(rand);
    i = i+1;
  }
  return(arr)
}
function scaleWidthVal(arr,data){
  let i = 0
  while (i< arr.length){
    let ele = document.createElement("div");
    ele.setAttribute("id",arr[i]);
    ele.setAttribute("value",data[i]);
    ele.setAttribute("class","element");
    ele.setAttribute("style", "top: " + (initialTop + i*topSpacing) + "px; left:" + initialLeft + "px; width:" + (initialWidth+data[i]) + "px;");
    ele.innerHTML = data[i];
    document.getElementById("arrayContainer").appendChild(ele);
    i = i+1
  }
}
function swapElements(elementA, elementB, aniLen) {
  let initialLeftA = initialLeft;
  let initialLeftB = initialLeft;
  let eleA = document.getElementById(elementA);
  let eleB = document.getElementById(elementB);
  let initialTopA = eleA.style.top;
  initialTopA = Number(initialTopA.substring(0, initialTopA.length - 2));
  let initialTopB = eleB.style.top;
  initialTopB = Number(initialTopB.substring(0, initialTopB.length - 2));
  let initialWidthA = eleA.style.width;
  initialWidthA = Number(initialWidthA.substring(0, initialWidthA.length - 2));
  let initialWidthB = eleB.style.width;
  initialWidthB = Number(initialWidthB.substring(0, initialWidthB.length - 2));
  let topSpacing = initialTopB - initialTopA;
  let i = 0;
  let topDist;
  let leftDist
  let swapInterval = setInterval(function() {
    topDist = initialTopA + topSpacing * Math.sin(0.5 * Math.PI * i / iMax);
    leftDist = initialLeftA + leftSpacing * Math.sin(Math.PI * i / iMax);
    eleA.setAttribute("style", "top: " + topDist + "px; left:" + leftDist + "px; width:" + initialWidthA + "px;");
    topDist = initialTopB - topSpacing * Math.sin(0.5 * Math.PI * i / iMax);
    leftDist = initialLeftB - leftSpacing * Math.sin(Math.PI * i / iMax);
    eleB.setAttribute("style", "top: " + topDist + "px; left:" + leftDist + "px; width:" + initialWidthB + "px;");
    i = i+ 1;
    if (i > iMax) {
      clearInterval(swapInterval);
    };
  }, aniLen/iMax);
  return (elementA);
};

function animateSequence(moves,aniLen){
  let i = 0;
  let animation = setInterval(function() {
    if (moves.length!=0){
      swapElements(moves[2*i],moves[2*i+1],aniLen);
    }
    i = i + 1;
    if (i>moves.length/2-1) {
      clearInterval(animation);
      inMotion = false;
      sortElement.setAttribute('style','background-color: #3a3a3c;');
      document.getElementById("sortLabel").innerHTML = "Sort";
    }
  }
  ,aniLen) 
}

function bubbleSort(arr) {
  let moves = [];
  let anySwaps = true;
  let ele0;
  let ele1;
  let i;
  while (anySwaps) {
    anySwaps = false;
    i = 0;
    while (i<arr.length-1){
      ele0 = arr[i];
      ele1 = arr[i+1];
      let dat0 = Number(document.getElementById(ele0).getAttribute("value"));
      let dat1 = Number(document.getElementById(ele1).getAttribute("value"));
      console.log(dat0,dat1,(dat0>dat1),ele0,ele1)
      if (dat0>dat1){
        arr[i] = ele1;
        arr[i+1] = ele0;
        moves.push(ele0,ele1);
        anySwaps = true;
      }
      i = i+1;
    }
  }
  return([arr,moves]);
}
function sortData(){
  let fullArr = randomArray(arrayLength,0,500);
  let arr = [];
  let data = [];
  let i = 0;
  while (i < fullArr.length/2){
    arr.push(fullArr[2*i]);
    data.push(fullArr[2*i+1]);
    i = i+1;
  }
  scaleWidthVal(arr,data);
  let output = bubbleSort(arr);
  arr = output[0];
  console.log(arr);
  let moves = output[1];
  console.log(moves);
  animateSequence(moves,animTime);
}
