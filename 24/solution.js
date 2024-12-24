const parseInput = input => {
   const sections = input.split('\r\n\r\n');
   const vals = sections[0].split('\r\n').map(row => row.split(': ').map((v, i) => i === 0 ? v : v === '1'));
   const gates = sections[1].split('\r\n').map(row => {
      const splitRow = row.split(' ');
      return [splitRow[0], splitRow[1], splitRow[2], splitRow[4]];
   });

   return {vals, gates};
};

const runPart1 = input => {
   const vals = Object.fromEntries(input.vals);
   const gates = input.gates;
   const zNodes = [];
   for (const gate of gates) {
      if (gate[3].startsWith('z')) {
         zNodes.push(gate[3]);
      }
   }

   while (gates.length > 0) {
      for (let g = 0; g < gates.length; g++) {
         const gate = gates[g];
         const a = vals[gate[0]];
         const b = vals[gate[2]];
         // eslint-disable-next-line eqeqeq
         if (a != null && b != null) {
            switch (gate[1]) {
               case 'AND': {
                  vals[gate[3]] = a && b;
                  break;
               } case 'OR': {
                  vals[gate[3]] = a || b;
                  break;
               } case 'XOR': {
                  vals[gate[3]] = a !== b;
                  break;
               }
            }

            gates.splice(g, 1);
         }
      }
   }

   return parseInt(zNodes.sort().map(n => vals[n] ? '1' : '0').reverse().join(''), 2);
};

const runPart2 = () =>
// SOLVED VISUALLY :(
// z15 <-> tvp
// dpg <-> z25
// z10 <-> kmb
// mmf <-> vdk

/*
   const gates = input.gates;
   const zNodes = {};
   const findDeps = (node, deps) => {
      for (const gate of gates) {
         if (gate[3] === node) {
            if (!deps.includes(gate[0])) {
               deps.push(gate[0]);
            }
            if (!deps.includes(gate[2])) {
               deps.push(gate[2]);
            }
            findDeps(gate[0], deps);
            findDeps(gate[2], deps);
         }
      }
   };
   for (const gate of gates) {
      if (gate[3].startsWith('z')) {
         const deps = [];
         findDeps(gate[3], deps);
         zNodes[gate[3]] = deps;
      }
   }

   for (const z of Object.keys(zNodes).sort()) {
      const deps = zNodes[z];
      const n = parseInt(z.slice(1), 10);
      const info = [];
      let isBad = false;
      for (let i = 0; i <= n; i++) {
         const iPadded = i < 10 ? `0${i}` : `${i}`;
         const xs = deps.filter(d => d === `x${iPadded}`).length;
         const ys = deps.filter(d => d === `y${iPadded}`).length;
         info.push([`x${iPadded}`, deps.filter(d => d === `x${iPadded}`).length]);
         info.push([`y${iPadded}`, deps.filter(d => d === `y${iPadded}`).length]);
         if (i > 0 && i < n) {
            if (xs !== 2 || ys !== 2) {
               isBad = true;
            }
         } else if (xs !== 1 || ys !== 1) {
            isBad = true;
         }
      }

      if (isBad) {
         console.debug(z, info);
      }
   }

   for (const z of Object.keys(zNodes).sort()) {
      console.debug(z, zNodes[z].sort().filter(x => x.startsWith('x') || x.startsWith('y')), zNodes[z].sort().filter(x => x.startsWith('x') || x.startsWith('y')).length, zNodes[z].length);
   }

   for (const z of zNodes) {
      for (const gate of gates) {
         if (gate[0] === z || gate[2] === z) {
            console.debug(z, gate);
         }
      }
   }

   // https://dreampuf.github.io/GraphvizOnline is nice
   let str = '';
   const colors = {XOR: 'red', AND: 'blue', OR: 'yellow'};
   for (const gate of gates) {
      str += `${gate[0]} -> ${gate[3]} [color=${colors[gate[1]]}]\n`;
      str += `${gate[2]} -> ${gate[3]} [color=${colors[gate[1]]}]\n`;
   }

   require('fs').writeFileSync('C://projects/git-personal/graph.txt', str);
*/

   ['z10', 'z15', 'tvp', 'mmf', 'vdk', 'dpg', 'kmb', 'z25'].sort().join(',')
;

module.exports = {parseInput, runPart1, runPart2};