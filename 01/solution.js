const parseInput = input => input.split('\n').map(line => line.split('   ').map(Number));

const runPart1 = input => {
   const left = new Uint32Array(input.length);
   const right = new Uint32Array(input.length);
   for (let i = 0; i < input.length; i++) {
      left[i] = input[i][0];
      right[i] = input[i][1];
   }

   left.sort((a, b) => a - b);
   right.sort((a, b) => a - b);

   let ans = 0;
   for (let i = 0; i < input.length; i++) {
      ans += Math.abs(left[i] - right[i]);
   }

   return ans;
};

const runPart2 = input => {
   const counts = {};
   for (let i = 0; i < input.length; i++) {
      counts[input[i][1]] = (counts[input[i][1]] || 0) + 1;
   }

   let ans = 0;
   for (let i = 0; i < input.length; i++) {
      ans += input[i][0] * (counts[input[i][0]] || 0);
   }

   return ans;
};

module.exports = {parseInput, runPart1, runPart2};