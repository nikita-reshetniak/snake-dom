var gridSize = 11;
var gridCenter = Math.round(gridSize/2);

var fragment = document.createDocumentFragment();
for(var i = 1; i <= gridSize; i++){
    var divRow = document.createElement("div");
    divRow.classList.add("row", "row-" + i);
    for(var j = 1; j <= gridSize; j++){
        var divCell = document.createElement("div");
        divCell.classList.add("cell", "cell-" + j);
        divRow.appendChild(divCell);
    }
    fragment.appendChild(divRow);
}
gridWrapper.appendChild(fragment);

var rows = Array.from(document.getElementsByClassName("row"));
var cells = [];

for(var i = 0; i < gridSize; i++){
    cells[i] = rows[i].children;
}

cells[gridCenter - 1][gridCenter - 2].classList.add("activeCell");
cells[gridCenter - 1][gridCenter - 1].classList.add("activeCell");
cells[gridCenter - 1][gridCenter].classList.add("activeCell");

