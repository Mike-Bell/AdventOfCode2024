const parseInput = input => input.split('\r\n').map(row => row.split(''));

const runPart1 = input => {
   const maxR = input.length;
   const maxC = input[0].length;

   let hits = 0;
   for (let r = 0; r < maxR; r++) {
      for (let c = 0; c < maxC; c++) {
         if (input[r][c] === 'X') {
            if (r + 3 < maxR && input[r + 1][c] === 'M' && input[r + 2][c] === 'A' && input[r + 3][c] === 'S') {
               hits++;
            }

            if (r - 3 >= 0 && input[r - 1][c] === 'M' && input[r - 2][c] === 'A' && input[r - 3][c] === 'S') {
               hits++;
            }

            if (c + 3 < maxC && input[r][c + 1] === 'M' && input[r][c + 2] === 'A' && input[r][c + 3] === 'S') {
               hits++;
            }

            if (c - 3 >= 0 && input[r][c - 1] === 'M' && input[r][c - 2] === 'A' && input[r][c - 3] === 'S') {
               hits++;
            }

            if (c + 3 < maxC && r + 3 < maxR && input[r + 1][c + 1] === 'M' && input[r + 2][c + 2] === 'A' && input[r + 3][c + 3] === 'S') {
               hits++;
            }

            if (r + 3 < maxR && c - 3 >= 0 && input[r + 1][c - 1] === 'M' && input[r + 2][c - 2] === 'A' && input[r + 3][c - 3] === 'S') {
               hits++;
            }

            if (r - 3 >= 0 && c + 3 < maxC && input[r - 1][c + 1] === 'M' && input[r - 2][c + 2] === 'A' && input[r - 3][c + 3] === 'S') {
               hits++;
            }

            if (r - 3 >= 0 && c - 3 >= 0 && input[r - 1][c - 1] === 'M' && input[r - 2][c - 2] === 'A' && input[r - 3][c - 3] === 'S') {
               hits++;
            }
         }
      }
   }

   return hits;
};

const runPart2 = input => {
   const maxR = input.length;
   const maxC = input[0].length;

   let hits = 0;
   for (let r = 0; r < maxR; r++) {
      for (let c = 0; c < maxC; c++) {
         if (r > 0 && c > 0 && r < maxR - 1 && c < maxC - 1 && input[r][c] === 'A') {
            const br = input[r + 1][c + 1];
            const tl = input[r - 1][c - 1];
            const bl = input[r + 1][c - 1];
            const tr = input[r - 1][c + 1];
            if ((br === 'M' && tl === 'S') || (br === 'S' && tl === 'M')) {
               if ((bl === 'M' && tr === 'S') || (bl === 'S' && tr === 'M')) {
                  hits++;
               }
            }
         }
      }
   }

   return hits;
};

module.exports = {parseInput, runPart1, runPart2};