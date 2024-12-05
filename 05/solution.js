const parseInput = input => {
   const [rules, pages] = input.split('\r\n\r\n');
   return {
      rules: rules.split('\r\n').map(line => line.split('|').map(Number)),
      pageSets: pages.split('\r\n').map(line => line.split(',').map(Number))
   };
};

const runPart1 = input => {
   let sum = 0;
   for (const pages of input.pageSets) {
      const indexMap = {};
      for (let i = 0; i < pages.length; i++) {
         indexMap[pages[i]] = i;
      }

      if (input.rules.some(r => indexMap[r[0]] > indexMap[r[1]])) {
         continue;
      }

      sum += pages[Math.floor(pages.length / 2)];
   }

   return sum;
};

const runPart2 = input => {
   let sum = 0;
   for (const pages of input.pageSets) {
      const indexMap = {};
      for (let i = 0; i < pages.length; i++) {
         indexMap[pages[i]] = i;
      }

      if (input.rules.some(r => indexMap[r[0]] > indexMap[r[1]])) {
         pages.sort((a, b) => {
            for (const rule of input.rules) {
               if (rule[0] === a && rule[1] === b) {
                  return -1;
               }

               if (rule[0] === b && rule[1] === a) {
                  return 1;
               }
            }
            return 0;
         });
         sum += pages[Math.floor(pages.length / 2)];
      }
   }

   return sum;
};

module.exports = {parseInput, runPart1, runPart2};