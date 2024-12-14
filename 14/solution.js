const parseInput = input => input.split('\r\n').map(row => {
   let [a, b] = row.split(' ');
   a = a.split('=')[1];
   b = b.split('=')[1];
   return {
      p: a.split(',').map(Number),
      v: b.split(',').map(Number)
   };
});

const runPart1 = input => {
   const width = 101;
   const height = 103;
   const quads = [[0, 0], [0, 0]];
   for (const row of input) {
      const finalX = ((row.p[0] + row.v[0] * 100) % width + width) % width;
      const finalY = ((row.p[1] + row.v[1] * 100) % height + height) % height;
      let quadX = -1;
      if (finalX < (width - 1) / 2) {
         quadX = 0;
      } else if (finalX > (width - 1) / 2) {
         quadX = 1;
      }

      let quadY = -1;
      if (finalY < (height - 1) / 2) {
         quadY = 0;
      } else if (finalY > (height - 1) / 2) {
         quadY = 1;
      }
      if (quadX !== -1 && quadY !== -1) {
         quads[quadX][quadY]++;
      }
   }
   return quads[0][0] * quads[0][1] * quads[1][0] * quads[1][1];
};

const runPart2 = input => {
   const width = 101;
   const height = 103;
   const hasSeen = new Array(width * height).map(() => false);
   for (let t = 0; t < width * height; t++) {
      let allUnique = true;

      for (let i = 0; i < hasSeen.length; i++) {
         hasSeen[i] = false;
      }

      for (const row of input) {
         const finalX = ((row.p[0] + row.v[0] * t) % width + width) % width;
         const finalY = ((row.p[1] + row.v[1] * t) % height + height) % height;
         const posHash = finalY * width + finalX;
         if (hasSeen[posHash]) {
            allUnique = false;
            break;
         }
         hasSeen[posHash] = true;
      }

      if (allUnique) {
         const PRINT_TREE = false;
         if (PRINT_TREE) {
            const map = new Array(height).fill(0).map(() => new Array(width).fill(0).map(() => '.'));
            for (let i = 0; i < hasSeen.length; i++) {
               if (hasSeen[i]) {
                  const y = Math.floor(i / width);
                  const x = i % width;
                  map[y][x] = 'X';
               }
            }
            console.debug(map.map(row => row.join('')).join('\r\n'));
         }

         return t;
      }
   }

   return -1;
};

module.exports = {parseInput, runPart1, runPart2};