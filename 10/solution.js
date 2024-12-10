const parseInput = input => input.split('\r\n').map(r => r.split('').map(Number));

const runPart1 = input => {
   const states = [];
   const maxR = input.length;
   const maxC = input[0].length;
   for (let r = 0; r < maxR; r++) {
      const row = input[r];
      for (let c = 0; c < maxC; c++) {
         if (row[c] === 0) {
            const traveled = new Set();
            states.push([r, c, 0, traveled]);
         }
      }
   }

   const v = (r, c) => {
      const row = input[r];
      if (!row) {
         return -1;
      }
      return input[r][c];
   };

   let trails = 0;
   while (states.length > 0) {
      const [r, c, val, traveled] = states.pop();
      if (traveled.has(r * maxC + c)) {
         continue;
      }

      traveled.add(r * maxC + c);

      if (val === 9) {
         trails++;
         continue;
      }

      if (v(r - 1, c) === val + 1) {
         states.push([r - 1, c, val + 1, traveled]);
      }

      if (v(r + 1, c) === val + 1) {
         states.push([r + 1, c, val + 1, traveled]);
      }

      if (v(r, c - 1) === val + 1) {
         states.push([r, c - 1, val + 1, traveled]);
      }

      if (v(r, c + 1) === val + 1) {
         states.push([r, c + 1, val + 1, traveled]);
      }
   }

   return trails;
};

const runPart2 = input => {
   const states = [];
   const maxR = input.length;
   const maxC = input[0].length;
   for (let r = 0; r < maxR; r++) {
      const row = input[r];
      for (let c = 0; c < maxC; c++) {
         if (row[c] === 0) {
            states.push([r, c, 0]);
         }
      }
   }

   const v = (r, c) => {
      const row = input[r];
      if (!row) {
         return -1;
      }
      return input[r][c];
   };

   let trails = 0;
   while (states.length > 0) {
      const [r, c, val] = states.pop();

      if (val === 9) {
         trails++;
         continue;
      }

      if (v(r - 1, c) === val + 1) {
         states.push([r - 1, c, val + 1]);
      }

      if (v(r + 1, c) === val + 1) {
         states.push([r + 1, c, val + 1]);
      }

      if (v(r, c - 1) === val + 1) {
         states.push([r, c - 1, val + 1]);
      }

      if (v(r, c + 1) === val + 1) {
         states.push([r, c + 1, val + 1]);
      }
   }

   return trails;
};

module.exports = {parseInput, runPart1, runPart2};