import { readInput } from "../common/read-input.js";

const input = [readInput(3, 1, false).join("")];

const multiply = (string) => {
  const [left, right] = string.split(",").map((x) => {
    const number = Number(x);
    return String(number).length === x.length ? number : 0;
  });
  if (left < 1000 && right < 1000) {
    return left * right;
  }
  return 0;
};

const getPart1Answer = (data = input) => {
  const calculateForString = (memoryData) => {
    return memoryData
      .split("mul(")
      .map((s) => (s.includes(")") ? s.split(")")[0] : ""))
      .filter((s) => s.includes(","))
      .map(multiply)
      .reduce((sum, curr) => sum + curr, 0);
  };

  return data
    .map((inputString) => calculateForString(inputString))
    .reduce((sum, curr) => sum + curr, 0);
};

const getStringWithoutDisabled = (memoryData) => {
  let resultString = "";
  let enabled = true;
  let currentIndex = 0;
  while (true) {
    const indexOfDont = memoryData.slice(currentIndex).indexOf("don't()");
    const indexOfDo = memoryData.slice(currentIndex).indexOf("do()");
    if (indexOfDont === -1 && enabled) {
      resultString += memoryData.slice(currentIndex);
      break;
    }
    if (indexOfDo === -1 && !enabled) {
      break;
    }
    if (enabled) {
      resultString += memoryData.slice(
        currentIndex,
        currentIndex + indexOfDont + 7,
      );
      currentIndex += indexOfDont + 7;
      enabled = false;
    } else {
      currentIndex += indexOfDo + 4;
      enabled = true;
    }
  }

  return resultString;
};

const getPart2Answer = () => {
  const calculateForString = (memoryData) => {
    const fixedString = getStringWithoutDisabled(memoryData);
    return getPart1Answer([fixedString]);
  };

  return input
    .map((inputString) => calculateForString(inputString))
    .reduce((sum, curr) => sum + curr, 0);
};

console.log(getPart1Answer());
console.log(getPart2Answer());
