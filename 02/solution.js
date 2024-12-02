const parseInput = input => input.split('\r\n').map(r => r.split(' ').map(Number));

const runPart1 = input => input.filter(row => {
   let parity = 0;
   for (let i = 0; i < row.length - 1; i++) {
      const diff = row[i] - row[i + 1];
      const newParity = diff > 0 ? 1 : -1;
      if (i > 0 && parity !== newParity) {
         return false;
      }
      parity = newParity;

      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
         return false;
      }
   }

   return true;
}).length;

const runPart2 = input => input.filter(row => {
   const isGood = thisRow => {
      let parity = 0;
      for (let i = 0; i < thisRow.length - 1; i++) {
         const diff = thisRow[i] - thisRow[i + 1];
         const newParity = diff > 0 ? 1 : -1;
         if (i > 0 && parity !== newParity) {
            return false;
         }
         parity = newParity;

         if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
         }
      }
      return true;
   };

   for (let i = -1; i < row.length; i++) {
      let thisRow = row;
      if (i > -1) {
         thisRow = [...row.slice(0, i), ...row.slice(i + 1, row.length)];
      }
      if (isGood(thisRow)) {
         return true;
      }
   }
   return false;
}).length;

module.exports = {parseInput, runPart1, runPart2};