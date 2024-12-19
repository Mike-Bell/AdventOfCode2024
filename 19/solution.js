const parseInput = input => {
   const lines = input.split('\r\n');
   const towels = lines[0].split(', ');
   const patterns = lines.slice(2);
   return {
      towels,
      patterns
   };
};

const runPart1 = input => {
   const {towels, patterns} = input;
   towels.sort((a, b) => a.length - b.length);

   const cache = new Map();
   const canMakePattern = pattern => {
      const cached = cache.get(pattern);
      if (cached === true || cached === false) {
         return cached;
      }

      for (const candidate of towels) {
         if (candidate === pattern) {
            cache.set(pattern, true);
            return true;
         }

         if (candidate.length < pattern.length && pattern.startsWith(candidate)) {
            const canMake = canMakePattern(pattern.slice(candidate.length));
            cache.set(pattern, canMake);
            if (canMake) {
               return true;
            }
         }
      }
      return false;
   };

   return patterns.filter(canMakePattern).length;
};

const runPart2 = input => {
   const {towels, patterns} = input;

   const cache = new Map();
   const getWays = pattern => {
      const cached = cache.get(pattern);
      if (cached || cached === 0) {
         return cached;
      }

      let hits = 0;
      for (const candidate of towels) {
         if (candidate === pattern) {
            hits++;
            continue;
         }

         if (candidate.length < pattern.length && pattern.startsWith(candidate)) {
            const hitsForTowel = getWays(pattern.slice(candidate.length));
            hits += hitsForTowel;
         }
      }
      cache.set(pattern, hits);
      return hits;
   };

   return patterns.reduce((acc, cur) => acc + getWays(cur), 0);
};

module.exports = {parseInput, runPart1, runPart2};