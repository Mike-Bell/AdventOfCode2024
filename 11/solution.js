const parseInput = input => input.split(' ').map(Number);

const runPart1 = input => {
   let stonesByNumber = new Map();
   for (const stone of input) {
      stonesByNumber.set(stone, 1);
   }

   for (let i = 0; i < 25; i++) {
      const nextStonesByNumber = new Map();
      for (const [s, stoneCount] of stonesByNumber.entries()) {
         if (stoneCount === 0) {
            continue;
         }

         if (s === 0) {
            nextStonesByNumber.set(1, (nextStonesByNumber.get(1) || 0) + stoneCount);
            continue;
         }

         const sAsStr = `${s}`;
         if (sAsStr.length % 2 === 0) {
            const a = Number(sAsStr.slice(0, sAsStr.length / 2));
            const b = Number(sAsStr.slice(sAsStr.length / 2));
            nextStonesByNumber.set(a, (nextStonesByNumber.get(a) || 0) + stoneCount);
            nextStonesByNumber.set(b, (nextStonesByNumber.get(b) || 0) + stoneCount);
            continue;
         }

         const ind = s * 2024;
         nextStonesByNumber.set(ind, (nextStonesByNumber.get(ind) || 0) + stoneCount);
      }

      stonesByNumber = nextStonesByNumber;
   }

   return [...stonesByNumber.values()].reduce((a, b) => a + b, 0);
};

const runPart2 = input => {
   let stonesByNumber = new Map();
   for (const stone of input) {
      stonesByNumber.set(stone, 1);
   }

   for (let i = 0; i < 75; i++) {
      const nextStonesByNumber = new Map();
      for (const [s, stoneCount] of stonesByNumber.entries()) {
         if (stoneCount === 0) {
            continue;
         }

         if (s === 0) {
            nextStonesByNumber.set(1, (nextStonesByNumber.get(1) || 0) + stoneCount);
            continue;
         }

         const sAsStr = `${s}`;
         if (sAsStr.length % 2 === 0) {
            const a = Number(sAsStr.slice(0, sAsStr.length / 2));
            const b = Number(sAsStr.slice(sAsStr.length / 2));
            nextStonesByNumber.set(a, (nextStonesByNumber.get(a) || 0) + stoneCount);
            nextStonesByNumber.set(b, (nextStonesByNumber.get(b) || 0) + stoneCount);
            continue;
         }

         const ind = s * 2024;
         nextStonesByNumber.set(ind, (nextStonesByNumber.get(ind) || 0) + stoneCount);
      }

      stonesByNumber = nextStonesByNumber;
   }

   return [...stonesByNumber.values()].reduce((a, b) => a + b, 0);
};

module.exports = {parseInput, runPart1, runPart2};