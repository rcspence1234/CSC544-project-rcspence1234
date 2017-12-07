var random = [];

n = 30;
var margin = 5;

for (var i = 0; i < n; i++){
	var x = Math.floor(margin + (500 - 2*margin)*Math.random());
	var y = Math.floor(margin + (500 - 2*margin)*Math.random());
	random.push({code: i, "x": x, "y": y});
}

		
	/*	
random = 
[{code: 0, x: 342, y: 387},
{code: 1, x: 139, y: 492},
{code: 2, x: 107, y: 228},
{code: 3, x: 347, y: 101},
{code: 4, x: 399, y: 184},
{code: 5, x: 35, y: 228},
{code: 6, x: 61, y: 241},
{code: 7, x: 44, y: 235},
{code: 8, x: 370, y: 84},
{code: 9, x: 29, y: 177},
{code: 10, x: 14, y: 370},
{code: 11, x: 285, y: 297},
{code: 12, x: 454, y: 263},
{code: 13, x: 87, y: 367},
{code: 14, x: 48, y: 331},
{code: 15, x: 85, y: 223},
{code: 16, x: 276, y: 284},
{code: 17, x: 112, y: 174},
{code: 18, x: 205, y: 327},
{code: 19, x: 126, y: 389}]
*/