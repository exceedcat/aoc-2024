import fs from "fs";

export const readInput = (day, part, test) => {
  const formattedDay = String(day).padStart(2, "0");
  const path = `src/data/${formattedDay}/${formattedDay}-${part}${test ? "-test" : ""}.txt`;
  return fs.readFileSync(path, "utf8").split("\n");
};
