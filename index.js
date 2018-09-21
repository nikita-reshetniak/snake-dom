var gridSize = 11;
var gridCenter = Math.round(gridSize/2);
var cells = [];
var fps = 10;
var x = gridCenter - 1;
var y = gridCenter - 1;
var xStep = 0;
var yStep = 0;
// For keydownHandler function
var firstTime = true;

makeGrid();
addCellsToArray();
addSnakeCell();

document.addEventListener("keydown", keydownHandler);

// Make grid of div elements
function makeGrid(){
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
};

// Make Array with all cells of grid
function addCellsToArray() {
    var rows = document.querySelectorAll(".row");
    for(var i = 0; i < gridSize; i++) {
        cells[i] = rows[i].children;
    }
}

// Add class "activeCell" to the cell
function addSnakeCell(){
    x += xStep;
    y += yStep;
    cells[y][x].classList.add("activeCell");
}

// Remove class "activeCell" from the cell
function removeSnakeCell(){
    cells[y][x].classList.remove("activeCell");
}

// Move the snake
function snakeMove(){
    setTimeout(function () {
        requestAnimationFrame(snakeMove);
        removeSnakeCell();
        addSnakeCell();
    }, 1000 / fps);
}

// Check pressed key
function keydownHandler(e){
    switch (e.keyCode) {
        case 37:
            xStep = -1;
            yStep = 0
            break;
        case 38:
            xStep = 0;
            yStep = -1;
            break;
        case 39:
            xStep = 1;
            yStep = 0;
            break;
        case 40:
            xStep = 0;
            yStep = 1;
            break;
    }
    if(firstTime){
        snakeMove();
        firstTime = false;
    }
}

// Checks whether the snake hit the wall
function checkGameOver(){
    if(y + yStep > gridSize - 1 || y + yStep < 0 || x + xStep > gridSize - 1 || x + xStep < 0) {
        document.querySelector("#message").innerHTML = "Game Over";
        return;
    }
}
