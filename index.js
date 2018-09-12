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

var snakeLength = 3;
var fps = 10;


function move() {
    setTimeout(function(){
        requestAnimationFrame(move);
        for (i = 0; i < gridSize - 1; i++) {
            if((gridSize - snakeLength - 1) < i){                             // If distance to the border == snake length -> Game Over
                document.querySelector("#message").innerHTML = "Game Over"; // Change "Snake Game" to "Game Over"
                break;
            } else if (cells[gridCenter - 1][i].classList.contains("activeCell")) { // If cell[y][x] contain class activeCell
                cells[gridCenter - 1][i].classList.remove("activeCell");            // remove activeCell from first div
                cells[gridCenter - 1][i + 3].classList.add("activeCell");           // and add it to the fourth counting from this div
                break;
            }
        }
    }, 1000 / fps);
}

document.addEventListener("keydown", function(e){
    if(e.keyCode == 39){
        move();
    }
})

