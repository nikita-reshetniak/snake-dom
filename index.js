var gridSize = 11;
var gridCenter = Math.round(gridSize/2);
var cells = [];
var fps = 10;

var x = gridCenter;
var y = gridCenter - 1;
var xStep = 0;
var yStep = 0;

// For keydownHandler function
var firstTime = true;

var timeoutID;
var idRequest;

makeGrid();
addCellsToArray();
addSnake();

document.addEventListener("keydown", keydownHandler);

function Cell(x, y){
    this.x = x;
    this.y = y;
}

var snakeArray = [new Cell(x - 2, y), new Cell(x - 1, y), new Cell(x, y)]

function changeSnakeCellCoordinates(){
    for(var i = 0; i < snakeArray.length - 1; i++){
        snakeArray[i].x = snakeArray[i+1].x;
        snakeArray[i].y = snakeArray[i+1].y;
    }

    snakeArray[snakeArray.length - 1].x = x;
    snakeArray[snakeArray.length - 1].y = y;
}

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

// Add snake to the center of grid
function addSnake(){
    cells[y][x - 2].classList.add("activeCell");
    cells[y][x - 1].classList.add("activeCell");
    cells[y][x].classList.add("activeCell");
}

// Add class "activeCell" add next to the head cell
function addSnakeCell(){
    x += xStep;
    y += yStep;
    cells[y][x].classList.add("activeCell");

}

// Remove class "activeCell" from the cell
function removeSnakeCell(){
    cells[snakeArray[0].y][snakeArray[0].x].classList.remove("activeCell");
}

// Move the snake
function snakeMove() {
    timeoutID = setTimeout(function () {
        idRequest = requestAnimationFrame(snakeMove);
        if (checkGameOver()) {
            cancelAnimationFrame(idRequest);
            clearTimeout(timeoutID);
        } else {
        removeSnakeCell();
        addSnakeCell();
        changeSnakeCellCoordinates();
        };
    }, 1000 / fps);
}

// Check pressed key
function keydownHandler(e){
    switch (e.keyCode) {
        case 37:
            if (xStep === 0) {
                xStep = -1;
                yStep = 0
            }
            break;
        case 38:
            if (yStep === 0) {
                xStep = 0;
                yStep = -1;
            }
            break;
        case 39:
            if (xStep === 0) {
                xStep = 1;
                yStep = 0;
            }
            break;
        case 40:
            if (yStep === 0) {
                xStep = 0;
                yStep = 1;
            }
            break;
    }
    if(firstTime && (e.keyCode === 37 ||
                    e.keyCode === 38 ||
                    e.keyCode === 39 ||
                    e.keyCode === 40)){
        snakeMove();
        firstTime = false;
    }
}

// Checks whether the snake hit the wall
function checkGameOver() {
    if (y + yStep > gridSize - 1 ||
        y + yStep < 0 ||
        x + xStep > gridSize - 1 ||
        x + xStep < 0) {
            document.querySelector("#message").innerHTML = "Game Over";
            return true;
    }
}
