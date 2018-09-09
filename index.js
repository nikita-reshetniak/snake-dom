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

var activeRow = document.getElementsByClassName("row-" + gridCenter);
var activeCell = activeRow[0].getElementsByClassName("cell-" + gridCenter);
activeCell[0].classList.add("activeCell");
