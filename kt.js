//Richard Spence
//CSC 544 Final Project

//svg dimensions
var xSize = 500;
var ySize = 500;

var div = d3.select("#kt-spanner");
var svg = div.append("svg")
	.attr("id", "spanner")
	.attr("width", 500)
	.attr("height", 500);
	
	
//draw some random points in svg
svg.selectAll("circle")
	.data(random)
	.enter()
	.append("circle")
	.attr("cx", function(row){
		return row.x;
	})
	.attr("cy", function(row){
		return row.y;
	})
	.attr("r", 5)
	.attr("stroke", "white")
	.attr("fill", "green");
	
//draw an undirected edge (line) connecting two points
function draw(svg, data, row1, row2){
	
	x1 = data[row1].x;
	x2 = data[row2].x;
	y1 = data[row1].y;
	y2 = data[row2].y;
	
	svg.append("line")
	.attr("x1", x1)
	.attr("y1", y1)
	.attr("x2", x2)
	.attr("y2", y2)
	.attr("stroke", "blue");
}

//given a set of tuples, draw undirected edges for each pair
function drawEdges(svg, data, tuples){
	for (var i = 0; i < tuples.length; i++){
		draw(svg, data, tuples[i][0], tuples[i][1])
	}
}

//return the Euclidean distance between two points in random
function d(row1, row2){
	return Math.sqrt(Math.pow(random[row1].x - random[row2].x, 2) + Math.pow(random[row1].y - random[row2].y, 2));
}

//return the total length (cost) of edgeSet
function cost(data, edgeSet){
	var w = 0;
	for (var e = 0; e < edgeSet.length; e++){
		w = w + d(edgeSet[e][0], edgeSet[e][1]);
	}
	return w;
}
		

//create an adjacency matrix with edgeSet
function createAdjMatrix(edgeSet){
	var n = random.length;
	var adj = Array(n);
	for (var i = 0; i < n; i++){
		adj[i] = Array(n).fill(Math.pow(10, 10));
		//dijkstra method doesn't work with Infinite weight, setting to
		//arbitrarily high weight instead
	}
	for (var e = 0; e < edgeSet.length; e++){
		var idx0 = edgeSet[e][0];
		var idx1 = edgeSet[e][1];

		adj[idx0][idx1] = d(idx0, idx1);
		adj[idx1][idx0] = adj[idx0][idx1];
	}
		
	return adj;
}



//given a graph G = (V,E) with V = data, E = edgeSet and k, t >= 1,
//returns true if the graph G is a (k,t)-spanner
//where we define a (k,t)-spanner to be a t-spanner such that for all
//(u,v) \in E, there exists a path of at most t*Euclidean distance
//using at most k edges in G.

function is_k_t_spanner(edgeSet, k, t){
	var n = random.length;

	var ret = true;
	var adj = createAdjMatrix(edgeSet);
	
	//might be O(|V|^k) to check for arbitrary k
	//(unless k = |V|-1, then it's shortest paths)
	//this implements correctly for k = 2
	
	if (k == 2){
		for (var source = 0; source < n; source++){
			for (var target = source+1; target < n; target++){
				
				//if (source, target) is an edge, then continue
				if (adj[source][target] != Math.pow(10, 10)){
					continue;
				}
				
				//otherwise check all possible paths source --> u --> target
				else{
					//true if there is a path source --> u --> target of length at most
					//t*d(source, target)
					var valid = false;
					for (var u = 0; u < n; u++){
						if (adj[source][u] != Math.pow(10, 10) && adj[u][target] != Math.pow(10, 10) &&
						d(source, u) + d(u, target) <= t*d(source, target)){
							valid = true;
							break;
						}
					}
					if (!valid){
						return false;
					}
				}
			}
		}
		return true;			
	}
	
	
	for (var i = 0; i < n; i++){
		//compute shortest paths from vertex i
		shortestPathInfo = shortestPath(adj, n, i);
		for (var j = i+1; j < n; j++){
			if (shortestPathInfo["pathLengths"][j] > t*d(i, j) ||
			constructPath(shortestPathInfo, j).length > k){

				ret = false;
			}
		}
	}
	return ret;
}

//greedy heuristic for computing a (k,t)-spanner over a set of points.
//sorts edges by weight, then removes expensive edges that do not
//violate (k,t) spanner property
function heuristic(svg, data, k, t){
	edgeSet = [];
	
	console.log(k);
	
	//start with complete graph
	for (var i = 0; i < data.length; i++){
		for (var j = i+1; j < data.length; j++){
			edgeSet.push([i,j]);
		}
	}
	
	//adjacency matrix (complete graph) whose weights are distances
	K_n = createAdjMatrix(edgeSet);
	mstWeight = primMST(K_n);
	
	//sort edgeSet array in order of distances
	edgeSet.sort(function(e1, e2){
		return d(e1[0], e1[1]) - d(e2[0], e2[1]);
		});
		
		
	adj = createAdjMatrix(edgeSet);
	
	drawEdges(svg, random, edgeSet);
	//for each edge (in decreasing order), determine whether removing it causes some two vertices u,v
	//to violate the k,t spanner property (there is no path of <= k edges whose
	//distance is <= t*d(u,v))

	for (var i = edgeSet.length-1; i >= 0; i--){
		var e = edgeSet[i];
		edgeSet.splice(i, 1);

		if (!is_k_t_spanner(edgeSet, k, t)){
			edgeSet.push(e);
		}
		svg.selectAll("line").remove();
		drawEdges(svg, random, edgeSet);
	}
	return edgeSet;
	
}

//////////////////////////////////////////////////////////////
var edgeSet = [];
for (var i = 0; i < random.length; i++){
	for (var j = i+1; j < random.length; j++){
		edgeSet.push([i,j]);
	}
}


	
	

