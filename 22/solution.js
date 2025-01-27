/* eslint-disable no-bitwise */
const parseInput = input => input.split('\r\n').map(Number);

const runPart1 = input => input.reduce((acc, secret) => {
   for (let i = 0; i < 2000; i++) {
      secret = (((secret * 64) ^ secret) >>> 0) % 16777216;
      secret = ((Math.floor(secret / 32) ^ secret) >>> 0) % 16777216;
      secret = (((secret * 2048) ^ secret) >>> 0) % 16777216;
   }
   return acc + secret;
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
         secret = (((secret * 64) ^ secret) >>> 0) % 16777216;
         secret = ((Math.floor(secret / 32) ^ secret) >>> 0) % 16777216;
         secret = (((secret * 2048) ^ secret) >>> 0) % 16777216;

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