const parseInput = input => {
   const [rules, pages] = input.split('\r\n\r\n');
   return {
      rules: rules.split('\r\n').map(line => line.split('|').map(Number)),
      pageSets: pages.split('\r\n').map(line => line.split(',').map(Number))
   };
};

const runPart1 = input => {
   let sum = 0;
   const relationships = [];
   for (const [a, b] of input.rules) {
      relationships[a] = relationships[a] || [];
      relationships[a][b] = -1;
      relationships[b] = relationships[b] || [];
      relationships[b][a] = 1;
   }

   for (const pages of input.pageSets) {
      if (pages.some((a, i) => relationships[a][pages[i + 1]] === 1)) {
         continue;
      }

      sum += pages[Math.floor(pages.length / 2)];
   }

   return sum;
};

const runPart2 = input => {
   let sum = 0;

   const relationships = [];
   for (const [a, b] of input.rules) {
      relationships[a] = relationships[a] || [];
      relationships[a][b] = -1;
      relationships[b] = relationships[b] || [];
      relationships[b][a] = 1;
   }

   for (const pages of input.pageSets) {
      if (pages.some((a, i) => relationships[a][pages[i + 1]] === 1)) {
         pages.sort((a, b) => relationships[a][b]);

         sum += pages[Math.floor(pages.length / 2)];
      }
   }

   return sum;
};

module.exports = {parseInput, runPart1, runPart2};