const parseInput = input => input.split('').map(Number);

const runPart1 = input => {
   let sum = 0;
   let leftCursor = 0;
   let r = input.length - 1;
   const totalBlocks = input.reduce((acc, curr) => acc + curr, 0);
   let rightCursor = totalBlocks - 1;
   for (let i = 0; i < input.length; i++) {
      if (i % 2 === 0) {
         const n = input[i];
         sum += i / 2 * n * (leftCursor + (leftCursor + n - 1)) / 2;
         leftCursor += n;
      } else {
         let free = input[i];
         while (free > 0 && leftCursor < rightCursor) {
            const availableToMove = input[r];
            const willMove = Math.min(free, availableToMove);
            sum += r / 2 * willMove * (leftCursor + (leftCursor + willMove - 1)) / 2;
            leftCursor += willMove;
            input[r] -= willMove;
            rightCursor -= willMove;
            if (willMove >= availableToMove) {
               r -= 2;
               rightCursor -= input[r + 1];
            }
            input[i] -= willMove;
            free = input[i];
         }
      }
   }

   return sum;
};

const runPart2 = input => {
   const freeBlocks = [];
   const files = [];
   let cursor = 0;
   for (let i = 0; i < input.length; i++) {
      const n = input[i];
      if (i % 2 === 1) {
         freeBlocks.push({pos: cursor, length: n});
      } else {
         files.push({id: i / 2, pos: cursor, length: n});
      }
      cursor += n;
   }

   for (let f = files.length - 1; f >= 0; f--) {
      const file = files[f];
      for (let b = 0; b < freeBlocks.length; b++) {
         const block = freeBlocks[b];
         if (block.pos > file.pos) {
            break;
         }

         if (block.length > file.length) {
            file.pos = block.pos;
            block.pos += file.length;
            block.length -= file.length;
         } else if (block.length === file.length) {
            file.pos = block.pos;
            freeBlocks.splice(b, 1);
         }
      }
   }

   return files.reduce((acc, file) => acc + file.id * file.length * (file.pos + (file.pos + file.length - 1)) / 2, 0);
};

module.exports = {parseInput, runPart1, runPart2};