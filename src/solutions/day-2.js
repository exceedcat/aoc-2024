import { readInput } from "../common/read-input.js";

const data = readInput(2, 1, false);

const getIsIncreasing = (report) => {
  let inc = 0,
    dec = 0;
  for (let i = 0; i < report.length; i++) {
    const curr = report[i],
      next = report[i + 1];
    if (next > curr) inc++;
    if (curr > next) dec++;
    if (Math.abs(inc - dec) > 1) break;
  }

  return inc > dec;
};

const checkValues = (val1, val2, isIncreasing) => {
  const diff = Math.abs(val1 - val2);
  const wrongDiff = diff < 1 || diff > 3;
  const wrongDirection =
    (isIncreasing && val2 - val1 < 0) || (!isIncreasing && val1 - val2 < 0);
  return !wrongDiff && !wrongDirection;
};

const isValidReport = (report) => {
  if (report[0] === report[1]) return false;

  const isIncreasing = report[1] > report[0];
  for (let i = 1; i < report.length; i++) {
    const prev = report[i - 1],
      curr = report[i];
    const result = checkValues(prev, curr, isIncreasing);
    if (!result) return false;
  }

  return true;
};

const isValidReportWithTolerance = (report, skipped) => {
  let isIncreasing = report[1] > report[0];
  let hasUsedTolerance = !!skipped;

  for (let i = 0; i < report.length - 1; i++) {
    const curr = report[i],
      next = report[i + 1];

    const isPositiveResult = checkValues(curr, next, isIncreasing);
    if (isPositiveResult) continue;
    if (hasUsedTolerance) return false;

    hasUsedTolerance = true;

    // try skipping current
    if (i !== 0) {
      const prev = report[i - 1];
      const isPositiveResult = checkValues(
        prev,
        next,
        i === 1 ? next > prev : isIncreasing,
      );
      if (isPositiveResult) {
        if (i === 1) {
          isIncreasing = next > prev;
        }
        continue;
      }
    } else if (i + 2 < report.length) {
      const nextNext = report[i + 2];
      const isPositiveResult = checkValues(next, nextNext, nextNext > next);
      if (isPositiveResult) {
        if (report.length >= 4) {
          const last = report[report.length - 1];
          const preLast = report[report.length - 2];
          if (
            (nextNext > next && last > preLast) ||
            (nextNext < next && last < preLast)
          ) {
            isIncreasing = nextNext > next;
            continue;
          }
        } else {
          isIncreasing = nextNext > next;
          continue;
        }
      }
    }
    // try skipping next
    if (i + 1 === report.length) {
      return true;
    } else {
      const nextNext = report[i + 2];
      const isPositiveResult = checkValues(curr, nextNext, isIncreasing);
      if (isPositiveResult) {
        i++;
        continue;
      }
    }
    // try skipping prev
    if (i === 1) {
      const isPositiveResult = checkValues(curr, next, next > curr);
      if (isPositiveResult) {
        isIncreasing = next > curr;
        continue;
      }
    }
    return false;
  }

  return true;
};

const isValidReportWithToleranceRecursion = (report, skipped) => {
  let isIncreasing = getIsIncreasing(report);
  let hasUsedTolerance = !!skipped;

  for (let i = 1; i < report.length; i++) {
    const prev = report[i - 1],
      curr = report[i];
    const positiveResult = checkValues(prev, curr, isIncreasing);

    if (positiveResult) continue;
    if (hasUsedTolerance) return false;

    hasUsedTolerance = true;

    if (i === 1 && report.length >= 3) {
      const next = report[2];
      const positiveResultForSkippedFirst = checkValues(
        curr,
        next,
        isIncreasing,
      );
      if (positiveResultForSkippedFirst) {
        return isValidReportWithTolerance(report.slice(1), true);
      }
    }
    return isValidReportWithTolerance(
      [...report.slice(0, i), ...report.slice(i + 1)],
      true,
    );
  }

  return true;
};

const reports = data.map((reportLine) => reportLine.split(" ").map(Number));

const getPart1Answer = () => {
  let count = 0;
  reports.forEach((report) => {
    if (isValidReport(report)) count++;
  });
  return count;
};

const getPart2AnswerRecursion = () => {
  let count = 0;
  reports.forEach((report) => {
    const isValid = isValidReportWithToleranceRecursion(report);
    if (isValid) {
      count++;
    }
  });
  return count;
};

const getPart2Answer = () => {
  let count = 0;
  reports.forEach((report) => {
    const isValid = isValidReportWithTolerance(report);
    if (isValid) {
      count++;
    }
  });
  return count;
};

console.log(getPart1Answer());
console.log(getPart2AnswerRecursion());
console.log(getPart2Answer());
