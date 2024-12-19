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
   const inputTowels = input.towels.sort((a, b) => a.length - b.length);
   const towelsToRemove = [];
   for (let i = 0; i < inputTowels.length; i++) {
      const towel = inputTowels[i];
      if (towel.length > 0) {
         const candidates = inputTowels.slice(0, i);
         const states = [0];
         const visited = new Array(towel.length).fill(false);
         let found = false;
         while (states.length > 0 && !found) {
            const cursor = states.pop();
            if (cursor === towel.length) {
               found = true;
               break;
            }

            for (const t of candidates) {
               if (!visited[t.length + cursor] && towel.slice(cursor, t.length + cursor) === t) {
                  visited[t.length + cursor] = true;
                  states.push(cursor + t.length);
               }
            }
         }

         if (found) {
            towelsToRemove.push(i);
         }
      }
   }

   const towels = [];
   for (let i = 0; i < inputTowels.length; i++) {
      if (!towelsToRemove.includes(i)) {
         towels.push(inputTowels[i]);
      }
   }

   let matches = 0;
   for (const pattern of input.patterns) {
      const states = [0];
      let found = false;
      const visited = new Array(pattern.length).fill(false);
      while (states.length > 0 && !found) {
         const cursor = states.pop();
         if (cursor === pattern.length) {
            found = true;
            break;
         }

         for (const t of towels) {
            if (!visited[t.length + cursor] && pattern.slice(cursor, t.length + cursor) === t) {
               visited[t.length + cursor] = true;
               states.push(cursor + t.length);
            }
         }
      }

      if (found) {
         matches++;
      }
   }

   return matches;
};

const runPart2 = input => {
   input.towels.sort((a, b) => a.length - b.length);

   let matches = 0;
   for (const pattern of input.patterns) {
      console.debug(pattern);
      const states = [0];
      let found = 0;
      while (states.length > 0) {
         const cursor = states.pop();
         if (cursor === pattern.length) {
            found++;
            continue;
         }

         for (const t of input.towels) {
            if (pattern.slice(cursor, t.length + cursor) === t) {
               states.push(cursor + t.length);
            }
         }
      }

      matches += found;
   }

   return matches;
};

module.exports = {parseInput, runPart1, runPart2};