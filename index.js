var gridEdge = document.querySelector('[name="gridEdge"]').value;
var gridCenter = Math.round(gridEdge/2);
var gridEdgeLenght = gridEdge * cellEdge;
var messageHeight = 58;
var cellEdge = 10;
var cells = [];
var fps = 10;
var x = gridCenter;
var y = gridCenter - 1;
var xStep = 0;
var yStep = 0;
var timeoutID;
var idRequest;
// For keydownHandler function
var firstTime = true;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

function Cell(x, y){
    this.x = x;
    this.y = y;
}

var snakeArray = [new Cell(x - 2, y), new Cell(x - 1, y), new Cell(x, y)];

setupGame();

document.addEventListener("keydown", keydownHandler);

function setupGame() {
    if (doesGridFitWindow()) {
        setMessage("Snake Game");
        updateVariablesValues();
        makeGrid();
        addCellsToArray();
        addSnake();
    } else {
        setMessage("Too Big");
    }
}

function doesGridFitWindow(){
    gridEdge = document.querySelector('[name="gridEdge"]').value;
    gridEdgeLenght = gridEdge * cellEdge;
    if(!(gridEdgeLenght + messageHeight > windowHeight) && !(gridEdgeLenght > windowWidth)){
        return true;
    } else{
        return false;
    }
}

function updateVariablesValues(){
    gridEdge = document.querySelector('[name="gridEdge"]').value;
    gridCenter = Math.round(gridEdge/2);
    gridEdgeLenght = gridEdge * cellEdge;
    x = gridCenter;
    y = gridCenter - 1;
    snakeArray = [new Cell(x - 2, y), new Cell(x - 1, y), new Cell(x, y)];
}

// Make grid of div elements
function makeGrid(){
    var gridWrapper = document.createElement("div")
    var fragment = document.createDocumentFragment();
    for(var i = 1; i <= gridEdge; i++){
        var divRow = document.createElement("div");
        divRow.classList.add("row", "row-" + i);
        for(var j = 1; j <= gridEdge; j++){
            var divCell = document.createElement("div");
            divCell.classList.add("cell", "cell-" + j);
            divRow.appendChild(divCell);
        }
        fragment.appendChild(divRow);
    }
    gridWrapper.appendChild(fragment);
    Wrapper.appendChild(gridWrapper);
};

function removeGrid() {
    if (doesGridFitWindow()) {
        var parent = document.querySelector("#Wrapper");
        var child = document.querySelector("#Wrapper").children[0];
        parent.removeChild(child);
    }
}

// Make Array with all cells of grid
function addCellsToArray() {
    var rows = document.querySelectorAll(".row");
    for(var i = 0; i < gridEdge; i++) {
        cells[i] = rows[i].children;
    }
}

// Add snake to the center of grid
function addSnake(){
    cells[y][x - 2].classList.add("activeCell");
    cells[y][x - 1].classList.add("activeCell");
    cells[y][x].classList.add("activeCell");
}

// Move the snake
function snakeMove() {
    timeoutID = setTimeout(function () {
        idRequest = requestAnimationFrame(snakeMove);
        if (doesGameOver()) {
            setMessage("Game Over");
            cancelAnimationFrame(idRequest);
            clearTimeout(timeoutID);
        } else {
        removeSnakeCell();
        addSnakeCell();
        setSnakeCellCoordinates();
        };
    }, 1000 / fps);
}

// Checks whether the snake hit the wall
function doesGameOver() {
    if (y + yStep > gridEdge - 1 ||
        y + yStep < 0 ||
        x + xStep > gridEdge - 1 ||
        x + xStep < 0) {
            return true;
    }
}

function setMessage(mes){
    document.querySelector("#message").innerHTML = mes;
}

// Remove class "activeCell" from the cell
function removeSnakeCell(){
    cells[snakeArray[0].y][snakeArray[0].x].classList.remove("activeCell");
}

// Add class "activeCell" add next to the head cell
function addSnakeCell(){
    x += xStep;
    y += yStep;
    cells[y][x].classList.add("activeCell");

}

function setSnakeCellCoordinates(){
    for(var i = 0; i < snakeArray.length - 1; i++){
        snakeArray[i].x = snakeArray[i+1].x;
        snakeArray[i].y = snakeArray[i+1].y;
    }

    snakeArray[snakeArray.length - 1].x = x;
    snakeArray[snakeArray.length - 1].y = y;
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
