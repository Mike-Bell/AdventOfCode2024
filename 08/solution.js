const parseInput = input => input.split('\r\n').map(row => row.split(''));

const runPart1 = input => {
   const ants = {};
   const maxR = input.length;
   const maxC = input[0].length;
   for (let r = 0; r < maxR; r++) {
      for (let c = 0; c < maxC; c++) {
         const v = input[r][c];
         if (v !== '.') {
            ants[v] = ants[v] || [];
            ants[v].push([r, c]);
         }
      }
   }

   const antiNodes = new Set();
   for (const pairs of Object.values(ants)) {
      for (let i = 0; i < pairs.length; i++) {
         const [r1, c1] = pairs[i];
         for (let j = i + 1; j < pairs.length; j++) {
            const [r2, c2] = pairs[j];
            const dr = r2 - r1;
            const dc = c2 - c1;
            const a1r = r1 - dr;
            const a1c = c1 - dc;
            if (a1r >= 0 && a1r < maxR && a1c >= 0 && a1c < maxC) {
               antiNodes.add(a1r * maxC + a1c);
            }

            const a2r = r2 + dr;
            const a2c = c2 + dc;
            if (a2r >= 0 && a2r < maxR && a2c >= 0 && a2c < maxC) {
               antiNodes.add(a2r * maxC + a2c);
            }
         }
      }
   }

   return antiNodes.size;
};

const runPart2 = input => {
   const ants = {};
   const maxR = input.length;
   const maxC = input[0].length;
   for (let r = 0; r < maxR; r++) {
      for (let c = 0; c < maxC; c++) {
         const v = input[r][c];
         if (v !== '.') {
            ants[v] = ants[v] || [];
            ants[v].push([r, c]);
         }
      }
   }

   const antiNodes = new Set();
   for (const pairs of Object.values(ants)) {
      for (let i = 0; i < pairs.length; i++) {
         const [r1, c1] = pairs[i];
         for (let j = i + 1; j < pairs.length; j++) {
            const [r2, c2] = pairs[j];
            const dr = r2 - r1;
            const dc = c2 - c1;

            let ar = r2;
            let ac = c2;
            while (ar >= 0 && ar < maxR && ac >= 0 && ac < maxC) {
               antiNodes.add(ar * maxC + ac);
               ar += dr;
               ac += dc;
            }

            ar = r2 - dr;
            ac = c2 - dc;
            while (ar >= 0 && ar < maxR && ac >= 0 && ac < maxC) {
               antiNodes.add(ar * maxC + ac);
               ar -= dr;
               ac -= dc;
            }
         }
      }
   }

   return antiNodes.size;
};

module.exports = {parseInput, runPart1, runPart2};