const parseInput = input => input.split('\r\n').map(
   row => {
      const splitRow = row.split(': ');
      return [Number(splitRow[0]), splitRow[1].split(' ').map(Number)];
   }
);

const runPart1 = input => {
   const tryOperators = (target, curr, nums, i) => {
      if (curr > target) {
         return false;
      }
      if (nums.length === i) {
         return target === curr;
      }
      return tryOperators(target, curr + nums[i], nums, i + 1) || tryOperators(target, curr * nums[i], nums, i + 1);
   };

   let sum = 0;
   for (const [target, nums] of input) {
      if (tryOperators(target, nums[0], nums, 1)) {
         sum += target;
      }
   }

   return sum;
};

const runPart2 = input => {
   const tryOperators = (target, curr, nums, i) => {
      if (curr > target) {
         return false;
      }
      if (nums.length === i) {
         return target === curr;
      }
      return tryOperators(target, curr + nums[i], nums, i + 1)
         || tryOperators(target, curr * nums[i], nums, i + 1)
         || tryOperators(target, curr * Math.pow(10, Math.ceil(Math.log10(nums[i] + 1))) + nums[i], nums, i + 1);
   };

   let sum = 0;
   for (const [target, nums] of input) {
      if (tryOperators(target, nums[0], nums, 1)) {
         sum += target;
      }
   }

   return sum;
};

module.exports = {parseInput, runPart1, runPart2};