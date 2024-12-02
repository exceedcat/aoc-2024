import fs from 'fs';

export const readInput = (day, part) => {
  const formattedDay = String(day).padStart(2, '0');
  const path = `../data/${formattedDay}/${formattedDay}-${part}.txt`;
  return fs.readFileSync(path,
      'utf8').split('\n');
}
