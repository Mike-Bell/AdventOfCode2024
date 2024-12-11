const parseInput = input => input.split(' ').map(Number);

const cache = new Map();

const countChildren = (v, gens) => {
   if (gens === 0) {
      return 1;
   }

   const cacheKey = `${v}-${gens}`;
   const cachedVal = cache.get(cacheKey);
   if (cachedVal) {
      return cachedVal;
   }

   if (v === 0) {
      const v2 = countChildren(1, gens - 1);
      cache.set(cacheKey, v2);
      return v2;
   }

   const vAsStr = `${v}`;
   if (vAsStr.length % 2 === 0) {
      const v2 = countChildren(Number(vAsStr.slice(0, vAsStr.length / 2)), gens - 1)
         + countChildren(Number(vAsStr.slice(vAsStr.length / 2)), gens - 1);
      cache.set(cacheKey, v2);
      return v2;
   }

   const v2 = countChildren(v * 2024, gens - 1);
   cache.set(cacheKey, v2);
   return v2;
};

const runPart1 = input =>
   input.map(v => countChildren(v, 25)).reduce((a, b) => a + b, 0);

const runPart2 = input =>
   input.map(v => countChildren(v, 75)).reduce((a, b) => a + b, 0);

module.exports = {parseInput, runPart1, runPart2};