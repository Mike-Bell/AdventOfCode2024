/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
const parseInput = input => input.split('\r\n').map(Number);

const runPart1 = input => input.reduce((acc, curr) => {
   for (let i = 0; i < 2000; i++) {
      curr = (((curr * 64) ^ curr) >>> 0) % 16777216;
      curr = ((Math.floor(curr / 32) ^ curr) >>> 0) % 16777216;
      curr = (((curr * 2048) ^ curr) >>> 0) % 16777216;
   }
   return acc + curr;
}, 0);

const runPart2 = input => {
   const sqNineteen = 19 * 19;
   const cubeNineteen = 19 * 19 * 19;
   const BANANAS = new Int16Array(19 * 19 * 19 * 19).fill(0);
   const seen = new Uint8Array(19 * 19 * 19 * 19);
   for (const val of input) {
      let d0 = 0;
      let d1 = 0;
      let d2 = 0;
      let d3 = 0;
      let lastSecret = val;
      seen.fill(0);
      for (let i = 0; i < 2000; i++) {
         let secret = lastSecret;
         secret = (secret ^ (secret << 6)) & 0xFFFFFF;
         secret = (secret ^ (secret >> 5));
         secret = (secret ^ (secret << 11)) & 0xFFFFFF;

         d0 = d1;
         d1 = d2;
         d2 = d3;
         d3 = (secret % 10) - (lastSecret % 10);
         lastSecret = secret;

         if (i > 2) {
            const key = (d0 + 9) * cubeNineteen + (d1 + 9) * sqNineteen + (d2 + 9) * 19 + d3 + 9;
            if (!seen[key]) {
               seen[key] = 1;
               BANANAS[key] += secret % 10;
            }
         }
      }
   }

   let m = 0;
   for (const b of BANANAS) {
      if (b > m) {
         m = b;
      }
   }

   return m;
};

module.exports = {parseInput, runPart1, runPart2};