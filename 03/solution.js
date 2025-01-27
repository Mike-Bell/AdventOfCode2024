const parseInput = input => input;

const runPart1 = input => {
   const result = [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)];
   return result.reduce((acc, curr) => acc + Number(curr[1]) * Number(curr[2]), 0);
};

const runPart2 = input => {
   const result = [...input.matchAll(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g)];
   let doMult = true;
   return result.reduce((acc, curr) => {
      if (curr[0] === 'do()') {
         doMult = true;
         return acc;
      } else if (curr[0] === 'don\'t()') {
         doMult = false;
         return acc;
      }

      if (!doMult) {
         return acc;
      }
      return acc + Number(curr[1]) * Number(curr[2]);
   }, 0);
};

module.exports = {parseInput, runPart1, runPart2};