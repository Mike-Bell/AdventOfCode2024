const parseInput = input => input;

const runPart1 = input => {
   const result = [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)];
   return result.reduce((acc, curr) => {
      return acc + Number(curr[1]) * Number(curr[2]);
   }, 0);
};

const runPart2 = input => {
   const dos = [...input.matchAll(/do\(\)/g)].map(r => r.index).reverse();
   const donts = [...input.matchAll(/don't\(\)/g)].map(r => r.index).reverse();
   const result = [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)];
   return result.reduce((acc, curr) => {
      const lastDo = dos.find(i => i < curr.index);
      const lastDont = donts.find(i => i < curr.index);
      if (lastDont != null && (lastDo == null || lastDont > lastDo)) {
         return acc;
      }
      return acc + Number(curr[1]) * Number(curr[2]);
   }, 0);
};

module.exports = {parseInput, runPart1, runPart2};