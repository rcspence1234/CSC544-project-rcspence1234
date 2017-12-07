// Here is a list with objects that specify some buttons.

var textboxList
var buttonList = [
    {
        name: "compute",
        text: "Compute approx. (k,t)-spanner",
        click: function() {
			var k = document.getElementById("k").value;
			var t = document.getElementById("t").value;
			
			
			if (k < 1 || t < 1){
				return;
			}
			
			var div = d3.select("#kt-spanner");
			var svg = div.select("#spanner")
				.data(random);
	
			d3.selectAll("line").remove();
			edgeSet = heuristic(svg, random, k, t);
			drawEdges(svg, random, edgeSet);
			var w = Math.round(cost(random, edgeSet));
			
			//get weight of MST for comparison
			var edgeSet2 = [];
			for (var i = 0; i < random.length; i++){
				for (var j = i+1; j < random.length; j++){
					edgeSet2.push([i,j]);
				}
			}
	
			//adjacency matrix (complete graph) whose weights are distances
			K_n = createAdjMatrix(edgeSet2);
			mstWeight = Math.round(primMST(K_n));
			
			var table = document.getElementById("table");

			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);
			row.insertCell(0).innerHTML = k;
			row.insertCell(1).innerHTML = t;
			row.insertCell(2).innerHTML = random.length;
			row.insertCell(3).innerHTML = edgeSet.length;
			row.insertCell(4).innerHTML = w;
			row.insertCell(5).innerHTML = mstWeight;
			row.insertCell(6).innerHTML = Math.round(1000*w/mstWeight)/1000;
			
		}
    }
   
];

// In the same way that we have been using d3 to create SVG elements,
// we can use d3 to create buttons and give them attributes.
//
// The only new feature in the code below is the use of the on()
// method, which defines *event handlers*.  In this case, we are
// telling d3 to call a function in the event that a button is
// clicked.

d3.select("#kt-spanner")
    .selectAll("button")
    .data(buttonList)
    .enter()
    .append("button")
    .attr("id", function(d) { return d.name; })
    .text(function(d) { return d.text; })
    .on("click", function(d) {
        // Since the button is bound to the objects from buttonList,
        // the expression below calls the click function from either
        // of the two button specifications in the list.
        return d.click();
    });
	