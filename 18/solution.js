const parseInput = input => input.split('\r\n').map(row => row.split(',').map(Number));

const deltas = [
   [-1, 0],
   [0, 1],
   [1, 0],
   [0, -1]
];

const runPart1 = input => {
   const size = input.length > 100 ? 70 : 6;
   const bytes = input.length > 100 ? 1024 : 12;

   const map = new Array(size + 1).fill(0).map(() => new Array(size + 1).fill(true));
   for (const byte of input.slice(0, bytes)) {
      map[byte[1]][byte[0]] = false;
   }

   const visited = new Set();

   const states = [[0, 0, 0]];
   while (states.length > 0) {
      const [r, c, s] = states.pop();
      if (r === size && c === size) {
         return s;
      }

      const stateHash = r * (size + 1) + c;

      if (visited.has(stateHash)) {
         continue;
      }
      visited.add(stateHash);

      for (const d of deltas) {
         const nextR = r + d[0];
         const nextC = c + d[1];
         if (nextR >= 0 && nextR <= size && nextC >= 0 && nextC <= size && map[nextR][nextC]) {
            states.unshift([nextR, nextC, s + 1]);
         }
      }
   }

   return -1;
};

const runPart2 = input => {
   const size = input.length > 100 ? 70 : 6;
   const bytes = input.length > 100 ? 1024 : 12;

   const map = new Array(size + 1).fill(0).map(() => new Array(size + 1).fill(true));
   for (const byte of input.slice(0, bytes)) {
      map[byte[0]][byte[1]] = false;
   }

   const runMap = (r0, c0) => {
      const visited = new Set();

      const states = [[r0, c0, []]];
      while (states.length > 0) {
         const [r, c, p] = states.pop();
         if (r === size && c === size) {
            return p;
         }

         const stateHash = r * (size + 1) + c;

         if (visited.has(stateHash)) {
            continue;
         }
         visited.add(stateHash);

         const nextPath = [...p, stateHash];

         for (const d of deltas) {
            const nextR = r + d[0];
            const nextC = c + d[1];
            if (nextR >= 0 && nextR <= size && nextC >= 0 && nextC <= size && map[nextR][nextC]) {
               states.unshift([nextR, nextC, nextPath]);
            }
         }
      }

      return -1;
   };

   let path = runMap(0, 0);

   for (const byte of input.slice(bytes)) {
      const stateHash = byte[0] * (size + 1) + byte[1];
      map[byte[0]][byte[1]] = false;
      if (path.includes(stateHash)) {
         path = runMap(0, 0);
      }

      if (path === -1) {
         return `${byte[0]},${byte[1]}`;
      }
   }

   return -1;
};

module.exports = {parseInput, runPart1, runPart2};