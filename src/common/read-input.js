import fs from "fs";

export const readInput = (day, test, splitLines = true) => {
  const formattedDay = String(day).padStart(2, "0");
  const path = `src/data/${formattedDay}/input${test ? "-test" : ""}.txt`;
  const file = fs.readFileSync(path, "utf8");
  return splitLines ? file.split("\n") : file;
};
