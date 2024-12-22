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
   const BANANAS = {};
   for (const val of input) {
      let d0 = 0;
      let d1 = 0;
      let d2 = 0;
      let d3 = 0;
      let lastSecret = val;
      const seen = new Set();
      for (let i = 0; i < 2000; i++) {
         let secret = lastSecret;
         secret = (((secret * 64) ^ secret) >>> 0) % 16777216;
         secret = ((Math.floor(secret / 32) ^ secret) >>> 0) % 16777216;
         secret = (((secret * 2048) ^ secret) >>> 0) % 16777216;

         d0 = d1;
         d1 = d2;
         d2 = d3;
         d3 = (secret % 10) - (lastSecret % 10);
         lastSecret = secret;

         if (i > 2) {
            const key = d0 * cubeNineteen + d1 * sqNineteen + d2 * 19 + d3;
            if (!seen.has(key)) {
               seen.add(key);
               BANANAS[key] = (BANANAS[key] || 0) + (secret % 10);
            }
         }
      }
   }

   return Math.max(...Object.values(BANANAS));
};

module.exports = {parseInput, runPart1, runPart2};