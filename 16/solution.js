const parseInput = input => input.split('\r\n').map(row => row.split(''));

const DIRS = [
   [-1, 0],
   [0, 1],
   [1, 0],
   [0, -1]
];

const runPart1 = input => {
   const maxR = input.length;
   const maxC = input[0].length;
   const states = [[[maxR - 2, 1, 1, true]]];
   const goalR = 1;
   const goalC = maxC - 2;

   const visited = new Set();

   for (let i = 0; i < Infinity; i++) {
      const statesForScore = states[i];
      if (!statesForScore) {
         continue;
      }

      states[i + 1000] = states[i + 1000] || [];
      for (const [r, c, dir, canTurn] of statesForScore) {
         const stateHash = r * maxC * 1000 + c * 10 + dir;
         if (visited.has(stateHash)) {
            continue;
         }
         visited.add(stateHash);
         const [dr, dc] = DIRS[dir];
         const nextR = r + dr;
         const nextC = c + dc;
         if (nextR === goalR && nextC === goalC) {
            return i + 1;
         }

         if (canTurn) {
            states[i + 1000].push([r, c, (dir + 1) % 4, false]);
            states[i + 1000].push([r, c, (dir + 3) % 4, false]);
         }

         if (input[nextR][nextC] === '#') {
            continue;
         }

         states[i + 1] = states[i + 1] || [];
         states[i + 1].push([nextR, nextC, dir, true]);
      }

      states[i] = null;
   }

   return -1;
};

const runPart2 = input => {
   const maxR = input.length;
   const maxC = input[0].length;
   const states = [[[maxR - 2, 1, 1, true, [(maxR - 2) * maxC + 1]]]];
   const goalR = 1;
   const goalC = maxC - 2;

   const visited = new Set();

   let found = false;
   let i = 0;
   const winningSet = new Set();
   for (i = 0; i < Infinity; i++) {
      const statesForScore = states[i];
      if (!statesForScore) {
         continue;
      }

      states[i + 1000] = states[i + 1000] || [];
      for (const [r, c, dir, canTurn, path] of statesForScore) {
         if (r === goalR && c === goalC) {
            found = true;
            for (const p of path) {
               winningSet.add(p);
            }
            continue;
         }
         const stateHash = r * maxC * 1000 + c * 10 + dir;
         if (visited.has(stateHash)) {
            continue;
         }
         const [dr, dc] = DIRS[dir];
         const nextR = r + dr;
         const nextC = c + dc;

         if (canTurn) {
            states[i + 1000].push([r, c, (dir + 1) % 4, false, path]);
            states[i + 1000].push([r, c, (dir + 3) % 4, false, path]);
         }

         if (input[nextR][nextC] === '#') {
            continue;
         }

         states[i + 1] = states[i + 1] || [];
         states[i + 1].push([nextR, nextC, dir, true, [...path, nextR * maxC + nextC]]);
      }

      for (const [r, c, dir] of statesForScore) {
         const stateHash = r * maxC * 1000 + c * 10 + dir;
         visited.add(stateHash);
      }

      if (found) {
         break;
      }

      states[i] = null;
   }

   return winningSet.size;
};

module.exports = {parseInput, runPart1, runPart2};