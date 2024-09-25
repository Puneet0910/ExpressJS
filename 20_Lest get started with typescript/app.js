"use strict";
const num1Element = document.getElementById("num1");
const num2Element = document.getElementById("num2");
// Above is type casting
const buttonElement = document.querySelector("button");
// const numResult: number[] = [];
const numResult = []; // Generic type
const textResult = [];
function add(num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }
    else if (typeof num1 === "string" && typeof num2 === "string") {
        return num1 + " " + num2;
    }
    return +num1 + +num2;
}
// function printResult(resultObj: Result) {
//   console.log(resultObj.val);
// }
function printResult(resultObj) {
    console.log(resultObj.val);
}
buttonElement.addEventListener("click", () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    const stirngResult = add(num1, num2);
    numResult.push(result);
    textResult.push(stirngResult);
    console.log(numResult, textResult);
    printResult({ val: result, timestamp: new Date() });
});
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("It worked");
    }, 1000);
});
myPromise.then((result) => {
    console.log(result);
    console.log(result.split("w"));
});
