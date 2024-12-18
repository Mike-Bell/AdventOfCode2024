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

   const states = [[0, 0, 0]];
   map[0][0] = false;
   while (states.length > 0) {
      const [r, c, s] = states.pop();

      for (const d of deltas) {
         const nextR = r + d[0];
         const nextC = c + d[1];
         if (nextR >= 0 && nextR <= size && nextC >= 0 && nextC <= size && map[nextR][nextC]) {
            if (nextR === size && nextC === size) {
               return s + 1;
            }
            map[nextR][nextC] = false;
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

   const runMap = () => {
      const states = [[0, 0]];
      map[0][0] = false;
      while (states.length > 0) {
         const [r, c] = states.pop();

         for (const d of deltas) {
            const nextR = r + d[0];
            const nextC = c + d[1];
            if (nextR >= 0 && nextR <= size && nextC >= 0 && nextC <= size && map[nextR][nextC]) {
               if (nextR === size && nextC === size) {
                  return 0;
               }
               map[nextR][nextC] = false;
               states.push([nextR, nextC]);
            }
         }
      }

      return -1;
   };

   let left = bytes;
   let right = input.length;

   let mid = 0;
   while (right > left) {
      mid = left + Math.floor((right - left) / 2);
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

   return `${input[mid][0]},${input[mid][1]}`;
};

module.exports = {parseInput, runPart1, runPart2};