var gridSize = 11;
var gridCenter = Math.round(gridSize/2);

var fragment = document.createDocumentFragment();       //<<< Create grid - start
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
gridWrapper.appendChild(fragment);                      //>>> Create grid - end


var rows = document.querySelectorAll(".row");
var cells = [];

for(var i = 0; i < gridSize; i++){      // Add all cells to the Array
    cells[i] = rows[i].children;
}

var fps = 10;
var x = gridCenter - 1;
var y = gridCenter - 1;
var xStep = 0;
var yStep = 0;

function clear(){
    cells[y][x].classList.remove("activeCell");
}

function draw(){
    x += xStep;
    y += yStep;
    cells[y][x].classList.add("activeCell");
}

draw();

function move(){
    if(cells[y][x]){
        setTimeout(function(){
            requestAnimationFrame(move);
            clear();
            draw();
        }, 1000 / fps);
    }
}

move();

document.addEventListener("keydown", function(e){
    switch(e.keyCode){
        case 37:
            xStep = (-1);
            yStep = 0
            break;
        case 38:
            xStep = 0;
            yStep = (-1);
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
})

