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

   const runMap = () => {
      const visited = new Set();

      const states = [[0, 0]];
      while (states.length > 0) {
         const [r, c] = states.pop();
         if (r === size && c === size) {
            return 0;
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
               states.push([nextR, nextC]);
            }
         }
      }

      return -1;
   };

   let left = bytes;
   let right = input.length;

   while (right > left) {
      const mid = left + Math.floor((right - left) / 2);
      const curBytes = input.slice(0, mid);
      for (let r = 0; r <= size; r++) {
         for (let c = 0; c <= size; c++) {
            map[r][c] = true;
         }
      }

      for (const byte of curBytes) {
         map[byte[0]][byte[1]] = false;
      }

      if (runMap() === -1) {
         right = mid - 1;
      } else {
         left = mid + 1;
      }
   }

   return `${input[left - 1][0]},${input[left - 1][1]}`;
};

module.exports = {parseInput, runPart1, runPart2};