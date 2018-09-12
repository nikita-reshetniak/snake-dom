var gridSize = 40;
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


var centralRow = document.querySelector(".row-" + gridCenter);

for(var i = gridCenter - 1; i <= gridCenter + 1; i++){
    centralRow.querySelector(".cell-" + i)
        .classList.add("activeCell");
}

var rows = document.querySelectorAll(".row");
var cells = [];

for(var i = 0; i < gridSize; i++){
    cells[i] = rows[i].children;
}

var fps = 10;
function move() {
    setTimeout(function(){
        requestAnimationFrame(move);
        for (i = 0; i < gridSize - 1; i++) {
            if (cells[gridCenter - 1][i].classList.contains("activeCell")) {
                cells[gridCenter - 1][i].classList.remove("activeCell");
                cells[gridCenter - 1][i + 3].classList.add("activeCell");
                break;
            }
        }
    }, 1000 / fps);
}

// function move(){
//     requestAnimationFrame(move);
//     for (i = 0; i < gridSize - 1; i++) {
//         if (cells[gridCenter - 1][i].classList.contains("activeCell")) {
//             cells[gridCenter - 1][i].classList.remove("activeCell");
//             cells[gridCenter - 1][i + 3].classList.add("activeCell");
//             break;
//         }
//     }
// }

document.addEventListener("keydown", function(e){
    if(e.keyCode == 39){
        move();
    }
})

