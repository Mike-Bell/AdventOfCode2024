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

   const cheatDirs = [];
   for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
         if ((r !== 0 || c !== 0) && (Math.abs(r) + Math.abs(c) <= 2)) {
            cheatDirs.push([r, c]);
         }
      }
   }

   let cheats = 0;
   let lastR = -1;
   let lastC = -1;
   let r = startR;
   let c = startC;
   let steps = 0;

   while (r !== goalR || c !== goalC) {
      stepMap[r][c] = steps;
      for (const d of cheatDirs) {
         const cheatAmount = steps - getStepsToPos(r + d[0], c + d[1]) - 2;
         if (cheatAmount >= 100) {
            cheats++;
         }
      }
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

   for (const d of cheatDirs) {
      const cheatAmount = steps - getStepsToPos(r + d[0], c + d[1]) - 2;
      if (cheatAmount >= 100) {
         cheats++;
      }
   }

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

   const cheatDirs = [];
   for (let r = -20; r <= 20; r++) {
      for (let c = -20; c <= 20; c++) {
         if ((r !== 0 || c !== 0) && (Math.abs(r) + Math.abs(c) <= 20)) {
            cheatDirs.push([r, c]);
         }
      }
   }

   let cheats = 0;
   let lastR = -1;
   let lastC = -1;
   let r = startR;
   let c = startC;
   let steps = 0;

   while (r !== goalR || c !== goalC) {
      stepMap[r][c] = steps;
      for (const [dr, dc] of cheatDirs) {
         const cheatAmount = steps - getStepsToPos(r + dr, c + dc) - Math.abs(dr) - Math.abs(dc);
         if (cheatAmount >= 100) {
            cheats++;
         }
      }
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

   for (const [dr, dc] of cheatDirs) {
      const cheatAmount = steps - getStepsToPos(r + dr, c + dc) - Math.abs(dr) - Math.abs(dc);
      if (cheatAmount >= 100) {
         cheats++;
      }
   }

   return cheats;
};

module.exports = {parseInput, runPart1, runPart2};