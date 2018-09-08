var mapSize = 10;
var i, j;

for(i = 1; i <= mapSize; i++){
    var divRow = document.createElement("div");
    divRow.classList.add("row", "row-" + i);
    mapWraper.appendChild(divRow);
    for (j = 1; j <= mapSize; j++){
        var divCell = document.createElement("div");
        divCell.classList.add("cell", "cell-" + j);
        divRow.appendChild(divCell);
    }
}
