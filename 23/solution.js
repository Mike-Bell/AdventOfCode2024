const parseInput = input => input.split('\r\n').map(row => row.split('-'));

const runPart1 = input => {
   const graph = {};
   for (const [a, b] of input) {
      graph[a] = graph[a] || {neighbors: [], startsWithT: a[0] === 't'};
      graph[b] = graph[b] || {neighbors: [], startsWithT: b[0] === 't'};
      graph[a].neighbors.push(graph[b]);
      graph[b].neighbors.push(graph[a]);
   }

   const labels = Object.keys(graph).sort();
   labels.forEach((l, i) => {
      const node = graph[l];
      node.index = i;
   });

   labels.forEach((l, i) => {
      const node = graph[l];
      node.neighbors = node.neighbors.filter(n1 => n1.index > i);
   });

   let c = 0;
   for (const node of labels) {
      const n0 = graph[node];
      for (const neighbor1 of n0.neighbors) {
         for (const neighbor2 of neighbor1.neighbors) {
            if (n0.startsWithT || neighbor1.startsWithT || neighbor2.startsWithT) {
               if (n0.neighbors.includes(neighbor2)) {
                  c++;
               }
            }
         }
      }
   }

   return c;
};

const runPart2 = input => {
   const graph = {};
   for (const [a, b] of input) {
      graph[a] = graph[a] || {neighbors: [], label: a};
      graph[b] = graph[b] || {neighbors: [], label: b};
      graph[a].neighbors.push(graph[b]);
      graph[b].neighbors.push(graph[a]);
   }

   const labels = Object.keys(graph).sort();
   labels.forEach((l, i) => {
      const node = graph[l];
      node.index = i;
   });

   labels.forEach((l, i) => {
      const node = graph[l];
      node.neighbors = node.neighbors.filter(n1 => n1.index > i);
   });

   let maxDepth = 0;
   let maxPath = [];
   const walk = (node, path, depth) => {
      if (depth > maxDepth) {
         maxDepth = depth;
         maxPath = [...path, node];
      }
      for (const neighbor of node.neighbors) {
         if (path.every(n => n.neighbors.includes(neighbor))) {
            walk(neighbor, [...path, node], depth + 1);
         }
      }
   };

   for (const node of labels) {
      const n0 = graph[node];
      for (const neighbor1 of n0.neighbors) {
         for (const neighbor2 of neighbor1.neighbors) {
            walk(neighbor2, [n0, neighbor1], 2);
         }
      }
   }

   return maxPath.map(n => n.label).join(',');
};

module.exports = {parseInput, runPart1, runPart2};