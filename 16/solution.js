const parseInput = input => input.split('\r\n').map(row => row.split(''));

const DR = [-1, 0, 1, 0];
const DC = [0, 1, 0, -1];

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
         const dr = DR[dir];
         const dc = DC[dir];
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
   const states = [[[maxR - 2, 1, 1, true, []]]];
   const goalR = 1;
   const goalC = maxC - 2;

   const visited = new Set();

   for (let i = 0; i < Infinity; i++) {
      const statesForScore = states[i];
      if (!statesForScore) {
         continue;
      }

      states[i + 1000] = states[i + 1000] || [];

      for (let j = 0; j < statesForScore.length; j++) {
         const [r, c, dir, canTurn, path] = statesForScore[j];

         const stateHash = r * maxC * 1000 + c * 10 + dir;
         if (visited.has(stateHash)) {
            continue;
         }
         visited.add(stateHash);
         const dr = DR[dir];
         const dc = DC[dir];
         const nextR = r + dr;
         const nextC = c + dc;

         if (nextR === goalR && nextC === goalC) {
            return path.length + 2;
         }

         if (canTurn) {
            states[i + 1000].push([r, c, (dir + 1) % 4, false, path]);
            states[i + 1000].push([r, c, (dir + 3) % 4, false, path]);
         }

         if (input[nextR][nextC] === '#') {
            continue;
         }

         const nextPath = [...path, nextR * maxC + nextC];
         const otherState = statesForScore.find((o, k) => k !== j && o[0] === r && o[1] === c && o[2] === dir);
         if (otherState) {
            for (const p of otherState[4]) {
               if (!nextPath.includes(p)) {
                  nextPath.push(p);
               }
            }
         }

         states[i + 1] = states[i + 1] || [];
         states[i + 1].push([nextR, nextC, dir, true, nextPath]);
      }

      states[i] = null;
   }

   return -1;
};

module.exports = {parseInput, runPart1, runPart2};