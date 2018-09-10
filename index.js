var gridSize = 11;
var gridCenter = Math.round(gridSize/2);
var i, j;

for(i = 1; i <= gridSize; i++){
    var divRow = document.createElement("div");
    divRow.classList.add("row", "row-" + i);
    gridWraper.appendChild(divRow);
    for (j = 1; j <= gridSize; j++){
        var divCell = document.createElement("div");
        divCell.classList.add("cell", "cell-" + j);
        divRow.appendChild(divCell);
    }
}

var centerRow = document.getElementsByClassName("row-" + gridCenter);       // Find central row 
var centerCell = centerRow[0].getElementsByClassName("cell-" + gridCenter); // find central cell of that row
centerCell[0].classList.add("activeCell");                                  // add class activeCell to the central cell for black background

var centerRowCells = centerRow[0].children; // HTMLCollection with cells of center row

for(i = 0; i < gridSize - 1; i++){
    if(centerRowCells[i].classList.contains("activeCell")){ // Search for <div> with class activeCell
        centerRowCells[i].classList.remove("activeCell");   // remove class activeCell from that <div>
        centerRowCells[i + 1].classList.add("activeCell");  // add class activeCell to the next <div>
    }
}
