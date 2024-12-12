const parseInput = input => input.split('\r\n').map(row => row.split(''));

const deltas = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const runPart1 = input => {
   const maxR = input.length;
   const maxC = input[0].length;

   const v = (r, c) => {
      const row = input[r];
      if (!row) {
         return '';
      }
      return row[c] || '';
   };

   const visited = input.map(row => row.map(() => false));
   let sum = 0;
   for (let ri = 0; ri < maxR; ri++) {
      for (let ci = 0; ci < maxC; ci++) {
         if (!visited[ri][ci]) {
            visited[ri][ci] = true;
            let p = 0;
            let a = 0;
            const states = [[ri, ci]];
            const label = input[ri][ci];
            while (states.length > 0) {
               const [r, c] = states.pop();
               a++;
               for (const [dr, dc] of deltas) {
                  const nr = r + dr;
                  const nc = c + dc;
                  if (v(nr, nc) === label) {
                     if (!visited[nr][nc]) {
                        states.push([nr, nc]);
                        visited[nr][nc] = true;
                     }
                  } else {
                     p++;
                  }
               }
            }
            sum += p * a;
         }
      }
   }

   return sum;
};

const runPart2 = input => {
   const maxR = input.length;
   const maxC = input[0].length;

   const v = (r, c) => {
      const row = input[r];
      if (!row) {
         return '';
      }
      return row[c] || '';
   };

   const visited = input.map(row => row.map(() => false));
   let sum = 0;
   for (let ri = 0; ri < maxR; ri++) {
      for (let ci = 0; ci < maxC; ci++) {
         if (!visited[ri][ci]) {
            visited[ri][ci] = true;
            let sides = 0;
            let a = 0;
            const states = [[ri, ci]];
            const label = input[ri][ci];
            while (states.length > 0) {
               const [r, c] = states.pop();
               a++;

               const top = v(r - 1, c);
               const bot = v(r + 1, c);
               const left = v(r, c - 1);
               const right = v(r, c + 1);
               const tl = v(r - 1, c - 1);
               const tr = v(r - 1, c + 1);
               const bl = v(r + 1, c - 1);
               const br = v(r + 1, c + 1);

               const cornerCandidates = [[left, tl, top], [top, tr, right], [right, br, bot], [bot, bl, left]];

               for (const [c1, c2, c3] of cornerCandidates) {
                  if (c1 !== label && c3 !== label) {
                     sides++;
                  } else if (c1 === label && c2 !== label && c3 === label) {
                     sides++;
                  }
               }

               for (const [dr, dc] of deltas) {
                  const nr = r + dr;
                  const nc = c + dc;
                  if (v(nr, nc) === label && !visited[nr][nc]) {
                     visited[nr][nc] = true;
                     states.push([nr, nc]);
                  }
               }
            }
            sum += sides * a;
         }
      }
   }

   return sum;
};

module.exports = {parseInput, runPart1, runPart2};