const parseInput = input => input.split('\r\n\r\n').map(chunk => {
   const lines = chunk.split('\r\n');
   const l1 = lines[0].split(', ');
   const l2 = lines[1].split(', ');
   const l3 = lines[2].split(', ');
   return [
      [Number(l1[0].split('+')[1]), Number(l1[1].split('+')[1])],
      [Number(l2[0].split('+')[1]), Number(l2[1].split('+')[1])],
      [Number(l3[0].split('=')[1]), Number(l3[1].split('=')[1])]
   ];
});

const solve2x2System = (a1, b1, c1, a2, b2, c2) => {
   if (a1 / a2 === b1 / b2) {
      if (c1 / c2 === a1 / a2) {
         return -1;
      }
      return NaN;
   }

   const x = (b2 * c1 - b1 * c2) / (a1 * b2 - a2 * b1);
   const y = (a1 * c2 - a2 * c1) / (a1 * b2 - a2 * b1);

   return {x, y};
};

const runPart1 = input => {
   let sum = 0;
   for (const chunk of input) {
      const ans = solve2x2System(chunk[0][0], chunk[1][0], chunk[2][0], chunk[0][1], chunk[1][1], chunk[2][1]);
      if (ans === -1) {
         continue;
      }

      if (ans.x === Math.floor(ans.x) && ans.y === Math.floor(ans.y)) {
         sum += 3 * ans.x + ans.y;
      }
   }

   return sum;
};

const runPart2 = input => {
   let sum = 0;
   for (const chunk of input) {
      const ans = solve2x2System(chunk[0][0], chunk[1][0], chunk[2][0] + 10000000000000, chunk[0][1], chunk[1][1], chunk[2][1] + 10000000000000);
      if (ans === -1) {
         continue;
      }

      if (ans.x === Math.floor(ans.x) && ans.y === Math.floor(ans.y)) {
         sum += 3 * ans.x + ans.y;
      }
   }

   return sum;
};

module.exports = {parseInput, runPart1, runPart2};