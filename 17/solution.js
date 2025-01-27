const parseInput = input => {
   const lines = input.split('\r\n');
   return {
      registers: [
         Number(lines[0].split(': ')[1]),
         Number(lines[1].split(': ')[1]),
         Number(lines[2].split(': ')[1])
      ],
      program: lines[4].split(': ')[1].split(',').map(Number)
   };
};

const runPart1 = input => {
   const {program, registers} = input;
   let i = 0;
   const ans = [];

   const combo = n => {
      if (n < 4) {
         return n;
      }
      return registers[n - 4];
   };

   while (i < program.length) {
      switch (program[i]) {
         case 0: {
            registers[0] = Math.floor(registers[0] / Math.pow(2, combo(program[i + 1])));
            i += 2;
            break;
         }
         case 1: {
         // eslint-disable-next-line no-bitwise
            registers[1] = (registers[1] ^ program[i + 1]) >>> 0;
            i += 2;
            break;
         }
         case 2: {
            registers[1] = combo(program[i + 1]) % 8;
            i += 2;
            break;
         }
         case 3: {
            if (registers[0] !== 0) {
               i = program[i + 1];
            } else {
               i += 2;
            }
            break;
         }
         case 4: {
         // eslint-disable-next-line no-bitwise
            registers[1] = (registers[1] ^ registers[2]) >>> 0;
            i += 2;
            break;
         }
         case 5: {
            ans.push(combo(program[i + 1]) % 8);
            i += 2;
            break;
         }
         case 6: {
            registers[1] = Math.floor(registers[0] / Math.pow(2, combo(program[i + 1])));
            i += 2;
            break;
         }
         case 7: {
            registers[2] = Math.floor(registers[0] / Math.pow(2, combo(program[i + 1])));
            i += 2;
            break;
         }
      }
   }

   return ans.join(',');
};

const runPart2 = input => {
   const {program, registers} = input;

   const combo = n => {
      if (n < 4) {
         return n;
      }
      return registers[n - 4];
   };

   const runProgram = () => {
      let i = 0;
      const ans = [];

      while (i < program.length) {
         switch (program[i]) {
            case 0: {
               registers[0] = Math.floor(registers[0] / Math.pow(2, combo(program[i + 1])));
               i += 2;
               break;
            }
            case 1: {
            // eslint-disable-next-line no-bitwise
               registers[1] = (registers[1] ^ program[i + 1]) >>> 0;
               i += 2;
               break;
            }
            case 2: {
               registers[1] = combo(program[i + 1]) % 8;
               i += 2;
               break;
            }
            case 3: {
               if (registers[0] !== 0) {
                  i = program[i + 1];
               } else {
                  i += 2;
               }
               break;
            }
            case 4: {
               // eslint-disable-next-line no-bitwise
               registers[1] = (registers[1] ^ registers[2]) >>> 0;
               i += 2;
               break;
            }
            case 5: {
               ans.push(combo(program[i + 1]) % 8);
               i += 2;
               break;
            }
            case 6: {
               registers[1] = Math.floor(registers[0] / Math.pow(2, combo(program[i + 1])));
               i += 2;
               break;
            }
            case 7: {
               registers[2] = Math.floor(registers[0] / Math.pow(2, combo(program[i + 1])));
               i += 2;
               break;
            }
         }
      }

      return ans;
   };

   let found = false;
   let ans = 0;
   const search = (cur, pos) => {
      for (let i = 0; i < 8; i++) {
         if (found) {
            return;
         }
         registers[0] = cur + i;
         registers[1] = 0;
         registers[2] = 0;
         const res = runProgram();
         if (res[0] === program[program.length - 1 - pos]) {
            if (pos === program.length - 1) {
               ans = cur + i;
               found = true;
            } else {
               search((cur + i) * 8, pos + 1);
            }
         }
      }
   };

   search(0, 0);

   return ans;
};

module.exports = {parseInput, runPart1, runPart2};