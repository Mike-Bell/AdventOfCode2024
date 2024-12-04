const parseInput = input => input.split('\r\n').map(row => row.split(''));

const runPart1 = input => {
   const val = (r, c) => {
      const row = input[r];
      if (!row) {
         return '';
      }
      return row[c] || '';
   };

   let hits = 0;
   for (let r = 0; r < input.length; r++) {
      for (let c = 0; c < input[r].length; c++) {
         if (val(r, c) === 'X') {
            if (val(r + 1, c) === 'M' && val(r + 2, c) === 'A' && val(r + 3, c) === 'S') {
               hits++;
            }

            if (val(r - 1, c) === 'M' && val(r - 2, c) === 'A' && val(r - 3, c) === 'S') {
               hits++;
            }

            if (val(r, c + 1) === 'M' && val(r, c + 2) === 'A' && val(r, c + 3) === 'S') {
               hits++;
            }

            if (val(r, c - 1) === 'M' && val(r, c - 2) === 'A' && val(r, c - 3) === 'S') {
               hits++;
            }

            if (val(r + 1, c + 1) === 'M' && val(r + 2, c + 2) === 'A' && val(r + 3, c + 3) === 'S') {
               hits++;
            }

            if (val(r + 1, c - 1) === 'M' && val(r + 2, c - 2) === 'A' && val(r + 3, c - 3) === 'S') {
               hits++;
            }

            if (val(r - 1, c + 1) === 'M' && val(r - 2, c + 2) === 'A' && val(r - 3, c + 3) === 'S') {
               hits++;
            }

            if (val(r - 1, c - 1) === 'M' && val(r - 2, c - 2) === 'A' && val(r - 3, c - 3) === 'S') {
               hits++;
            }
         }
      }
   }

   return hits;
};

const runPart2 = input => {
   const val = (r, c) => {
      const row = input[r];
      if (!row) {
         return '';
      }
      return row[c] || '';
   };

   let hits = 0;
   for (let r = 0; r < input.length; r++) {
      for (let c = 0; c < input[r].length; c++) {
         if (val(r, c) === 'A') {
            const br = val(r + 1, c + 1);
            const tl = val(r - 1, c - 1);
            const bl = val(r + 1, c - 1);
            const tr = val(r - 1, c + 1);
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