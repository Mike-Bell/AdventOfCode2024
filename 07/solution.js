const parseInput = input => input.split('\r\n').map(
   row => {
      const splitRow = row.split(': ');
      return [Number(splitRow[0]), splitRow[1].split(' ').map(Number)];
   }
);

const runPart1 = input => {
   const tryOperators = (target, curr, nums) => {
      if (nums.length === 0) {
         return target === curr;
      }
      const nextNums = nums.slice(1);
      return tryOperators(target, curr + nums[0], nextNums) || tryOperators(target, curr * nums[0], nextNums);
   };

   let sum = 0;
   for (const [target, nums] of input) {
      if (tryOperators(target, nums[0], nums.slice(1))) {
         sum += target;
      }
   }

   return sum;
};

const runPart2 = input => {
   const tryOperators = (target, curr, nums) => {
      if (nums.length === 0) {
         return target === curr;
      }
      const nextNums = nums.slice(1);
      return tryOperators(target, curr + nums[0], nextNums)
         || tryOperators(target, curr * nums[0], nextNums)
         || tryOperators(target, Number(`${curr}${nums[0]}`), nextNums);
   };

   let sum = 0;
   for (const [target, nums] of input) {
      if (tryOperators(target, nums[0], nums.slice(1))) {
         sum += target;
      }
   }

   return sum;
};

module.exports = {parseInput, runPart1, runPart2};