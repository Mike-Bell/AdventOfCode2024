const parseInput = input => {
   const [map, dirs] = input.split('\r\n\r\n');
   return {
      map: map.split('\r\n').map(row => row.split('')),
      dirs: dirs.split('\r\n').flatMap(row => row.split(''))
   };
};

const DR = {
   '^': -1,
   '>': 0,
   v: 1,
   '<': 0
};

const DC = {
   '^': 0,
   '>': 1,
   v: 0,
   '<': -1
};

const runPart1 = input => {
   const {map, dirs} = input;
   let r = -1;
   let c = -1;
   const maxR = map.length;
   const maxC = map[0].length;

   for (let ri = 0; ri < maxR; ri++) {
      for (let ci = 0; ci < maxC; ci++) {
         if (map[ri][ci] === '@') {
            r = ri;
            c = ci;
            map[ri][ci] = '.';
         }
      }
   }

   for (const d of dirs) {
      const dr = DR[d];
      const dc = DC[d];

      let ri = r + dr;
      let ci = c + dc;

      if (map[ri][ci] === '#') {
         continue;
      }

      if (map[ri][ci] === '.') {
         r = ri;
         c = ci;
         continue;
      }

      while (map[ri][ci] === 'O') {
         ri += dr;
         ci += dc;
      }

      if (map[ri][ci] === '#') {
         continue;
      }

      r += dr;
      c += dc;
      map[r][c] = '.';
      map[ri][ci] = 'O';
   }

   let sum = 0;
   for (let ri = 0; ri < maxR; ri++) {
      for (let ci = 0; ci < maxC; ci++) {
         if (map[ri][ci] === 'O') {
            sum += ri * 100 + ci;
         }
      }
   }

   return sum;
};

const runPart2 = input => {
   const {map: inputMap, dirs} = input;
   let r = -1;
   let c = -1;
   const maxR = inputMap.length;
   const maxC = inputMap[0].length;

   const map = [];

   for (let ri = 0; ri < maxR; ri++) {
      const inputRow = inputMap[ri];
      const row = [];
      for (let ci = 0; ci < maxC; ci++) {
         switch (inputRow[ci]) {
            case '@': {
               r = ri;
               c = ci * 2;
               row.push('.', '.');
               break;
            } case '.': {
               row.push('.', '.');
               break;
            } case '#': {
               row.push('#', '#');
               break;
            } case 'O': {
               row.push('[', ']');
            }
         }
      }
      map.push(row);
   }

   for (const d of dirs) {
      const dr = DR[d];
      const dc = DC[d];

      let ri = r + dr;
      let ci = c + dc;

      if (map[ri][ci] === '#') {
         continue;
      }

      if (map[ri][ci] === '.') {
         r = ri;
         c = ci;
         continue;
      }

      const horizontal = d === '<' || d === '>';

      if (horizontal) {
         while (map[ri][ci] === '[' || map[ri][ci] === ']') {
            ri += dr;
            ci += dc;
         }

         if (map[ri][ci] === '#') {
            continue;
         }

         r += dr;
         c += dc;
         while (ci !== c) {
            map[ri][ci] = map[ri][ci - dc];
            map[ri][ci - dc] = '.';
            ci -= dc;
         }
         continue;
      }

      let pushes = [];
      let pushFront = map[ri][ci] === '[' ? [[ri, ci]] : [[r, ci - 1]];

      // eslint-disable-next-line no-labels
      outer: while (pushFront.length > 0) {
         const nextPushFront = [];
         for (const p of pushFront) {
            const nextL = map[p[0] + dr][p[1]];
            const nextR = map[p[0] + dr][p[1] + 1];
            if (nextL === '#' || nextR === '#') {
               pushes = [];
               // eslint-disable-next-line no-labels
               break outer;
            }

            if (nextL === '[') {
               nextPushFront.push([p[0] + dr, p[1]]);
            } else if (nextL === ']') {
               nextPushFront.push([p[0] + dr, p[1] - 1]);
            }

            if (nextR === '[') {
               nextPushFront.push([p[0] + dr, p[1] + 1]);
            }
         }

         pushes.push(...pushFront);
         pushFront = nextPushFront;
      }

      if (pushes.length > 0) {
         r = ri;
         c = ci;
      }

      for (let i = pushes.length - 1; i >= 0; i--) {
         const p = pushes[i];
         if (map[p[0]][p[1]] === '[') {
            map[p[0] + dr][p[1] + dc] = map[p[0]][p[1]];
            map[p[0] + dr][p[1] + dc + 1] = map[p[0]][p[1] + 1];
            map[p[0]][p[1]] = '.';
            map[p[0]][p[1] + 1] = '.';
         }
      }
   }

   let sum = 0;
   for (let ri = 0; ri < map.length; ri++) {
      for (let ci = 0; ci < map[0].length; ci++) {
         if (map[ri][ci] === '[') {
            sum += ri * 100 + ci;
         }
      }
   }

   return sum;
};

module.exports = {parseInput, runPart1, runPart2};