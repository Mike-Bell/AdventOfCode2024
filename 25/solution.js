const parseInput = input => input.split('\r\n\r\n').map(chunk => chunk.split('\r\n'));

const runPart1 = input => {
   const locks = [];
   const keys = [];
   for (const section of input) {
      const isLock = section[0][0] === '#';
      const geo = [];
      for (let c = 0; c <= 4; c++) {
         let n = -1;
         for (let r = 0; r <= 6; r++) {
            if (section[r][c] === '#') {
               n++;
            }
            geo[c] = n;
         }
      }

      (isLock ? locks : keys).push(geo);
   }

   let sum = 0;
   for (const key of keys) {
      for (const lock of locks) {
         sum++;
         for (let c = 0; c <= 4; c++) {
            if (key[c] + lock[c] > 5) {
               sum--;
               break;
            }
         }
      }
   }

   return sum;
};

const runPart2 = () => 'MERRY CHRISTMAS';

module.exports = {parseInput, runPart1, runPart2};