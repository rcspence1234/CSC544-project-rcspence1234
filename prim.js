// A utility function to find the vertex with minimum key value, from
// the set of vertices not yet included in MST

//I followed the code for Prim's algorithm used in
//http://www.geeksforgeeks.org/greedy-algorithms-set-5-prims-minimum-spanning-tree-mst-2/
//where I converted the C++ code to Javascript.
var V = random.length;
function minKey(key, mstSet)
{
   // Initialize min value
   var min = Math.pow(10,10), min_index;
 
   for (var v = 0; v < V; v++)
     if (mstSet[v] == false && key[v] < min)
         min = key[v], min_index = v;
 
   return min_index;
}
 
// A utility function to print the constructed MST stored in parent[]
function printMSTWeight(parents, n, graph)
{
   var weight = 0;
   for (var i = 1; i < V; i++){
	  weight = weight + graph[i][parents[i]];
   }
   return weight;
}
 
// Function to construct and print MST for a graph represented using adjacency
// matrix representation
function primMST(graph)
{
     var parents = []; // Array to store constructed MST
     var key = [];   // Key values used to pick minimum weight edge in cut
     var mstSet = [];  // To represent set of vertices not yet included in MST
 
     // Initialize all keys as INFINITE
     for (var i = 0; i < V; i++)
        key[i] = Math.pow(10,10), mstSet[i] = false;
 
     // Always include first 1st vertex in MST.
     key[0] = 0;     // Make key 0 so that this vertex is picked as first vertex
     parents[0] = -1; // First node is always root of MST 
 
     // The MST will have V vertices
     for (var count = 0; count < V-1; count++)
     {
        // Pick the minimum key vertex from the set of vertices
        // not yet included in MST
        var u = minKey(key, mstSet);
 
        // Add the picked vertex to the MST Set
        mstSet[u] = true;
 
        // Update key value and parent index of the adjacent vertices of
        // the picked vertex. Consider only those vertices which are not yet
        // included in MST
        for (var v = 0; v < V; v++)
 
           // graph[u][v] is non zero only for adjacent vertices of m
           // mstSet[v] is false for vertices not yet included in MST
           // Update the key only if graph[u][v] is smaller than key[v]
          if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v])
             parents[v]  = u, key[v] = graph[u][v];
     }
 
     // print the constructed MST weight
     weight = printMSTWeight(parents, V, graph);
	 return weight;
}