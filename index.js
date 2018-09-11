var gridSize = 11;

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
