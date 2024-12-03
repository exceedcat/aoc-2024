import { readInput } from "../common/read-input.js";

const input = readInput(3, false, false);

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

const getPart1Answer = (memoryData = input) => {
  return memoryData
    .split("mul(")
    .map((s) => (s.includes(")") ? s.split(")")[0] : ""))
    .filter((s) => s.includes(","))
    .map(multiply)
    .reduce((sum, curr) => sum + curr, 0);
};

const DONT = "don't()";
const DO = "do()";

const getStringWithoutDisabled = (memoryData) => {
  let resultString = "";
  let enabled = true;
  let currentIndex = 0;

  while (true) {
    const indexOfDont = memoryData.slice(currentIndex).indexOf(DONT);
    const indexOfDo = memoryData.slice(currentIndex).indexOf(DO);

    if (indexOfDont === -1 && enabled) {
      resultString += memoryData.slice(currentIndex);
      break;
    }

    if (indexOfDo === -1 && !enabled) {
      break;
    }

    if (enabled) {
      const nextIndex = currentIndex + indexOfDont + DONT.length;
      resultString += memoryData.slice(currentIndex, nextIndex);
      currentIndex = nextIndex;
      enabled = false;
    } else {
      currentIndex += indexOfDo + DO.length;
      enabled = true;
    }
  }

  return resultString;
};

const getPart2Answer = () => {
  const fixedString = getStringWithoutDisabled(input);
  return getPart1Answer(fixedString);
};

console.log(getPart1Answer());
console.log(getPart2Answer());
