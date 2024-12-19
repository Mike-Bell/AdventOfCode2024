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

   const towelsByChar = {};
   for (const towel of towels) {
      const first = towel[0];
      towelsByChar[first] = towelsByChar[first] || [];
      towelsByChar[first].push(towel);
   }

   const cache = {};
   const canMakePattern = pattern => {
      const cached = cache[pattern];
      if (cached === true || cached === false) {
         return cached;
      }

      const candidates = towelsByChar[pattern[0]];
      for (const candidate of candidates) {
         if (candidate === pattern) {
            cache[pattern] = true;
            return true;
         }

         if (candidate.length > pattern.length) {
            break;
         }

         if (candidate.length < pattern.length && pattern.startsWith(candidate)) {
            const canMake = canMakePattern(pattern.slice(candidate.length));
            if (canMake) {
               return true;
            }
         }
      }
      cache[pattern] = true;
      return false;
   };

   return patterns.filter(canMakePattern).length;
};

const runPart2 = input => {
   const {towels, patterns} = input;
   towels.sort((a, b) => a.length - b.length);
   const towelsByChar = {};
   for (const towel of towels) {
      const first = towel[0];
      towelsByChar[first] = towelsByChar[first] || [];
      towelsByChar[first].push(towel);
   }

   const cache = {};
   const getWays = pattern => {
      const cached = cache[pattern];
      if (cached || cached === 0) {
         return cached;
      }

      const candidates = towelsByChar[pattern[0]];
      let hits = 0;
      for (const candidate of candidates) {
         if (candidate === pattern) {
            hits++;
            break;
         }

         if (candidate.length > pattern.length) {
            break;
         }

         if (candidate.length < pattern.length && pattern.startsWith(candidate)) {
            hits += getWays(pattern.slice(candidate.length));
         }
      }
      cache[pattern] = hits;
      return hits;
   };

   return patterns.reduce((acc, cur) => acc + getWays(cur), 0);
};

module.exports = {parseInput, runPart1, runPart2};