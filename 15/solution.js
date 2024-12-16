const parseInput = input => {
   const [map, dirs] = input.split('\r\n\r\n');
   return {
      map: map.split('\r\n').map(row => row.split('')),
      dirs: dirs.split('\r\n').join('')
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

   // eslint-disable-next-line no-labels
   outer: for (let ri = 0; ri < maxR; ri++) {
      const row = map[ri];
      for (let ci = 0; ci < maxC; ci++) {
         if (row[ci] === '@') {
            r = ri;
            c = ci;
            row[ci] = '.';
            // eslint-disable-next-line no-labels
            break outer;
         }
      }
   }

   for (const d of dirs) {
      const dr = DR[d];
      const dc = DC[d];

      let ri = r + dr;
      let ci = c + dc;

      let cur = map[ri][ci];
      if (cur === '#') {
         continue;
      }

      if (cur === '.') {
         r = ri;
         c = ci;
         continue;
      }

      while (cur === 'O') {
         ri += dr;
         ci += dc;
         cur = map[ri][ci];
      }

      if (cur === '#') {
         continue;
      }

      r += dr;
      c += dc;
      map[r][c] = '.';
      map[ri][ci] = 'O';
   }

   let sum = 0;
   for (let ri = 1; ri < maxR - 1; ri++) {
      const row = map[ri];
      for (let ci = 1; ci < maxC - 1; ci++) {
         if (row[ci] === 'O') {
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
   let maxR = inputMap.length;
   let maxC = inputMap[0].length;

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

      const ri = r + dr;
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
         let cur = map[ri][ci];
         while (cur === '[' || cur === ']') {
            ci += dc * 2;
            cur = map[ri][ci];
         }

         if (cur === '#') {
            continue;
         }

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
         for (const [pr, pc] of pushFront) {
            const nextL = map[pr + dr][pc];
            const nextR = map[pr + dr][pc + 1];
            if (nextL === '#' || nextR === '#') {
               pushes = [];
               // eslint-disable-next-line no-labels
               break outer;
            }

            if (nextL === '[') {
               nextPushFront.push([pr + dr, pc]);
            } else if (nextL === ']') {
               nextPushFront.push([pr + dr, pc - 1]);
            }

            if (nextR === '[') {
               nextPushFront.push([pr + dr, pc + 1]);
            }
         }

         pushes.push(...pushFront);
         pushFront = nextPushFront;
      }

      if (pushes.length > 0) {
         r = ri;
      }

      for (let i = pushes.length - 1; i >= 0; i--) {
         const [pr, pc] = pushes[i];
         const cur = map[pr][pc];
         if (cur === '[') {
            map[pr + dr][pc] = cur;
            map[pr + dr][pc + 1] = map[pr][pc + 1];
            map[pr][pc] = '.';
            map[pr][pc + 1] = '.';
         }
      }
   }

   let sum = 0;
   maxR = map.length;
   maxC = map[0].length;
   for (let ri = 1; ri < maxR - 1; ri++) {
      const row = map[ri];
      for (let ci = 2; ci < maxC - 2; ci++) {
         if (row[ci] === '[') {
            sum += ri * 100 + ci;
         }
      }
   }

   return sum;
};

module.exports = {parseInput, runPart1, runPart2};