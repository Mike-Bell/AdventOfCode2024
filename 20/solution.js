const parseInput = input => input.split('\r\n').map(row => row.split(''));

const DIR = [
   [-1, 0],
   [0, 1],
   [1, 0],
   [0, -1]
];

const runPart1 = input => {
   let startR = -1;
   let startC = -1;
   let goalR = -1;
   let goalC = -1;
   const maxR = input.length;
   const maxC = input[0].length;

   for (let r = 0; r < maxR; r++) {
      const row = input[r];
      for (let c = 0; c < maxC; c++) {
         const val = row[c];
         if (val === 'S') {
            startR = r;
            startC = c;
            row[c] = '.';
         } else if (val === 'E') {
            goalR = r;
            goalC = c;
            row[c] = '.';
         }
      }
   }

   const stepMap = input.map(row => row.map(() => Infinity));
   const getStepsToPos = (r, c) => {
      if (r <= 0 || r >= maxR - 1 || c <= 0 || c >= maxC - 1) {
         return Infinity;
      }
      return stepMap[r][c];
   };

   let cheats = 0;
   let lastR = -1;
   let lastC = -1;
   let r = startR;
   let c = startC;
   let steps = 0;

   const findCheats = () => {
      for (let dr = -2; dr <= 2; dr++) {
         for (let dc = -2; dc <= 2; dc++) {
            const amount = (Math.abs(dr) + Math.abs(dc));
            if (amount === 2) {
               const cheatAmount = steps - getStepsToPos(r + dr, c + dc) - amount;
               if (cheatAmount >= 100) {
                  cheats++;
               }
            }
         }
      }
   };

   while (r !== goalR || c !== goalC) {
      stepMap[r][c] = steps;
      findCheats();

      for (const d of DIR) {
         const nextR = r + d[0];
         const nextC = c + d[1];
         if ((nextR !== lastR || nextC !== lastC) && input[nextR][nextC] !== '#') {
            lastR = r;
            lastC = c;
            r = nextR;
            c = nextC;
            break;
         }
      }
      steps++;
   }

   findCheats();

   return cheats;
};

const runPart2 = input => {
   let startR = -1;
   let startC = -1;
   let goalR = -1;
   let goalC = -1;
   const maxR = input.length;
   const maxC = input[0].length;

   for (let r = 0; r < maxR; r++) {
      const row = input[r];
      for (let c = 0; c < maxC; c++) {
         const val = row[c];
         if (val === 'S') {
            startR = r;
            startC = c;
            row[c] = '.';
         } else if (val === 'E') {
            goalR = r;
            goalC = c;
            row[c] = '.';
         }
      }
   }

   const stepMap = input.map(row => row.map(() => Infinity));
   const getStepsToPos = (r, c) => {
      if (r <= 0 || r >= maxR - 1 || c <= 0 || c >= maxC - 1) {
         return Infinity;
      }
      return stepMap[r][c];
   };

   let cheats = 0;
   let lastR = -1;
   let lastC = -1;
   let r = startR;
   let c = startC;
   let steps = 0;

   const findCheats = () => {
      for (let dr = -20; dr <= 20; dr++) {
         for (let dc = -20; dc <= 20; dc++) {
            const amount = (Math.abs(dr) + Math.abs(dc));
            if (amount >= 2 && amount <= 20) {
               const cheatAmount = steps - getStepsToPos(r + dr, c + dc) - amount;
               if (cheatAmount >= 100) {
                  cheats++;
               }
            }
         }
      }
   };

   while (r !== goalR || c !== goalC) {
      stepMap[r][c] = steps;
      findCheats();

      for (const d of DIR) {
         const nextR = r + d[0];
         const nextC = c + d[1];
         if ((nextR !== lastR || nextC !== lastC) && input[nextR][nextC] !== '#') {
            lastR = r;
            lastC = c;
            r = nextR;
            c = nextC;
            break;
         }
      }
      steps++;
   }

   findCheats();

   return cheats;
};

module.exports = {parseInput, runPart1, runPart2};