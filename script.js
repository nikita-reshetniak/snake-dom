var mapSize = 10;
var i, j;

for(i = 0; i < mapSize; i++){
    var divRow = document.createElement("div");
    divRow.className = "row row-" + i;
    document.body.appendChild(divRow);
    for (j = 0; j < mapSize; j++){
        var divCell = document.createElement("div");
        divCell.className = "cell cell-" + j;
        document.body.appendChild(divCell);
    }
}
