const num1Element = document.getElementById("num1") as HTMLInputElement;
const num2Element = document.getElementById("num2") as HTMLInputElement;

// Above is type casting
const buttonElement = document.querySelector("button")!;

// const numResult: number[] = [];
const numResult: Array<number> = []; // Generic type

const textResult: string[] = [];

type NumOrStr = number | string;
type Result = { val: number; timestamp: Date };

interface ResultObj {
  val: number;
  timestamp: Date;
}

function add(num1: NumOrStr, num2: NumOrStr) {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else if (typeof num1 === "string" && typeof num2 === "string") {
    return num1 + " " + num2;
  }
  return +num1 + +num2;
}

// function printResult(resultObj: Result) {
//   console.log(resultObj.val);
// }

function printResult(resultObj: ResultObj) {
  console.log(resultObj.val);
}

buttonElement.addEventListener("click", () => {
  const num1 = num1Element.value;
  const num2 = num2Element.value;
  const result = add(+num1, +num2);
  const stirngResult = add(num1, num2);

  numResult.push(result as number);
  textResult.push(stirngResult as string);

  console.log(numResult, textResult);

  printResult({ val: result as number, timestamp: new Date() });
});

const myPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("It worked");
  }, 1000);
});

myPromise.then((result) => {
  console.log(result);
  console.log(result.split("w"));
});
