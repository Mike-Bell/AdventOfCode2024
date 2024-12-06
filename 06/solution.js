const parseInput = input => input.split('\r\n').map(row => row.split(''));

const dirs = [
   [-1, 0],
   [0, 1],
   [1, 0],
   [0, -1]
];

const runPart1 = input => {
   input = input.map(row => row.map(v => v));

   let dir = 0;
   let steps = 1;

   let r = 0;
   let c = 0;

   const val = (ri, ci) => {
      const row = input[ri];
      if (!row) {
         return '';
      }

      return row[ci] || '';
   };

   (() => {
      for (r = 0; r < input.length; r++) {
         const row = input[r];
         for (c = 0; c < row.length; c++) {
            if (row[c] === '^') {
               row[c] = 'X';
               return;
            }
         }
      }
   })();

   // eslint-disable-next-line no-constant-condition
   while (true) {
      const nextR = r + dirs[dir][0];
      const nextC = c + dirs[dir][1];
      switch (val(nextR, nextC)) {
         case '': {
            return steps;
         } case '#': {
            dir = (dir + 1) % 4;
            break;
         } case 'X': {
            r = nextR;
            c = nextC;
            break;
         } default: {
            r = nextR;
            c = nextC;
            steps++;

            input[r][c] = 'X';
         }
      }
   }
};

const runPart2 = input => {
   input = input.map(row => row.map(v => v));

   let dir = 0;

   let r = 0;
   let c = 0;

   const val = (ri, ci) => {
      const row = input[ri];
      if (!row) {
         return '';
      }

      return row[ci] || '';
   };

   (() => {
      for (r = 0; r < input.length; r++) {
         const row = input[r];
         for (c = 0; c < row.length; c++) {
            if (row[c] === '^') {
               row[c] = 'X';
               return;
            }
         }
      }
   })();

   const initialR = r;
   const initialC = c;

   const initials = [];
   // eslint-disable-next-line no-constant-condition, no-labels
   outer: while (true) {
      const nextR = r + dirs[dir][0];
      const nextC = c + dirs[dir][1];
      const v = val(nextR, nextC);
      switch (v) {
         case '': {
            // eslint-disable-next-line no-labels
            break outer;
         } case '#': {
            dir = (dir + 1) % 4;
            break;
         } case 'X': {
            r = nextR;
            c = nextC;
            break;
         } default: {
            r = nextR;
            c = nextC;
            input[r][c] = 'X';
            if (r !== initialR || c !== initialC) {
               initials.push([r, c]);
            }
         }
      }
   }

   let hits = 0;
   for (const [rt, ct] of initials) {
      dir = 0;
      r = initialR;
      c = initialC;
      const visited = new Set();

      input[rt][ct] = '#';
      // eslint-disable-next-line no-constant-condition, no-labels
      outer2: while (true) {
         const nextR = r + dirs[dir][0];
         const nextC = c + dirs[dir][1];
         switch (val(nextR, nextC)) {
            case '': {
               // eslint-disable-next-line no-labels
               break outer2;
            } case '#': {
               const key = r * 10000 + c * 10 + dir;
               if (visited.has(key)) {
                  hits++;
                  // eslint-disable-next-line no-labels
                  break outer2;
               }
               visited.add(key);
               dir = (dir + 1) % 4;
               break;
            } default: {
               r = nextR;
               c = nextC;
            }
         }
      }

      input[rt][ct] = '.';
   }

   return hits;
};

module.exports = {parseInput, runPart1, runPart2};