const parseInput = input => input.split('\r\n').map(row => row.split(''));

const runPart1 = input => {
   input = input.map(row => row.map(v => v));

   let dir = [-1, 0];
   let steps = 1;
   const turn = () => {
      dir = [dir[1], -1 * dir[0]];
   };

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
      const nextR = r + dir[0];
      const nextC = c + dir[1];
      switch (val(nextR, nextC)) {
         case '': {
            return steps;
         } case '#': {
            turn();
            break;
         } default: {
            r = nextR;
            c = nextC;
            if (input[r][c] !== 'X') {
               steps++;
            }

            input[r][c] = 'X';
         }
      }
   }
};

const runPart2 = input => {
   input = input.map(row => row.map(v => v));

   let dir = [-1, 0];
   const turn = () => {
      dir = [dir[1], -1 * dir[0]];
   };

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

   // eslint-disable-next-line no-constant-condition, no-labels
   outer: while (true) {
      const nextR = r + dir[0];
      const nextC = c + dir[1];
      switch (val(nextR, nextC)) {
         case '': {
            // eslint-disable-next-line no-labels
            break outer;
         } case '#': {
            turn();
            break;
         } default: {
            r = nextR;
            c = nextC;
            input[r][c] = 'X';
         }
      }
   }

   let hits = 0;
   for (let rt = 0; rt < input.length; rt++) {
      for (let ct = 0; ct < input[rt].length; ct++) {
         if (input[rt][ct] === 'X' && (rt !== initialR || ct !== initialC)) {
            dir = [-1, 0];
            r = initialR;
            c = initialC;
            const visited = [];

            input[rt][ct] = '#';
            // eslint-disable-next-line no-constant-condition, no-labels
            outer2: while (true) {
               const nextR = r + dir[0];
               const nextC = c + dir[1];
               switch (val(nextR, nextC)) {
                  case '': {
                     // eslint-disable-next-line no-labels
                     break outer2;
                  } case '#': {
                     turn();
                     break;
                  } default: {
                     r = nextR;
                     c = nextC;
                     const key = `${r}-${c}- ${dir[0]}-${dir[1]}`;
                     if (visited.includes(key)) {
                        hits++;
                        // eslint-disable-next-line no-labels
                        break outer2;
                     }
                     visited.push(key);
                  }
               }
            }

            input[rt][ct] = '.';
         }
      }
   }

   return hits;
};

module.exports = {parseInput, runPart1, runPart2};