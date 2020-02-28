
class Model {
    constructor() {
        this.cells= [];
        this.snake = {
            body: [],
            direction: {
                x: 0, 
                y: 0
            }
        }
    }

    setupGrid(columnsNumber, rowsNumber) {
        const rows = new Array(rowsNumber).fill(null);
        // rows.forEach((item, i, rows) => {
        //     rows[i] = new Array(columnsNumber).fill({x: 0, y: 0});
        //     rows[i].forEach((cell, j) => {
        //         cell.x = j + 1;
        //         cell.y = rows.length - i;
        //     });
        // });
        for (let i = 0; i < rows.length; i++) {
            rows[i] = [];
            for (let j = 0; j < columnsNumber; j++) {
                rows[i].push({x: j + 1, y: rowsNumber - i})
            }
        }
        this.cells = rows;
    }


    setupSnake() {
        const yCenter = Math.floor(this.cells.length / 2);
        const xCenter = Math.floor(this.cells[0].length / 2);
        this.snake.body.push(this.cells[yCenter - 2][xCenter - 1]);
        this.snake.body.push(this.cells[yCenter - 1][xCenter - 1]);
        this.snake.body.push(this.cells[yCenter][xCenter - 1]);
    }

    driveSnake() {
        this.snake.body.forEach((_, index, body) => {
            if (body[body.length - index - 2]) {
                body[body.length - index - 1] = this.snake.body[body.length - index - 2];
            }
        });

        // Assign new values to 'head'.
        this.snake.body[0] = Object.assign({}, this.snake.body[0])
        this.snake.body[0].x += this.snake.direction.x;
        this.snake.body[0].y += this.snake.direction.y;
    }
}

class View {
    constructor() {
        this.innerWidth = window.innerWidth - 3;
        this.innerHeight = window.innerHeight - 3;
        this.cellSizeRange = this.range(11, 16);
        this.cellSize = this.determineCellSize(this.cellSizeRange);
        this.rows = Math.floor(this.innerHeight / this.cellSize);
        this.columns = Math.floor(this.innerWidth / this.cellSize);
        this.app = this.getElement('#root');
    }

    range(start, end) {
        if(start === end) return [start];
        return [start, ...this.range(start + 1, end)];

    };

    determineCellSize(range) {
        const widthDiff = new Array(range.length).fill(null);
        const heightDiff = new Array(range.length).fill(null);
        range.forEach((item, index) => {
            widthDiff[index] = this.innerWidth % item;
            heightDiff[index] = this.innerHeight % item;
        });
        const diff = widthDiff.map((_, index, arr) => {
            return arr[index] + heightDiff[index];
        });
        // const min = diff.indexOf(Math.min(...diff));
        const indexOfMin = diff.reduce((iMin, item, index, arr) => {
            return item < arr[iMin] ? index : iMin;
        }, 0);
        return range[indexOfMin];
    }

    renderGrid(cells) {
        const wrapper = this.createElement('div', 'gridWrapper');
        cells.forEach((item, i) => {
            const row = this.createElement('div', 'row');
            item.forEach((item ,j) => {
                const cell = this.createElement('div', 'cell', `x-${j + 1}_y-${cells.length - i}`);
                cell.style.width = `${this.cellSize - 1}px`;
                cell.style.height = `${this.cellSize - 1}px`;
                row.appendChild(cell);
            });
            wrapper.style.marginTop = `${(this.innerHeight - this.cellSize * this.rows)/2}px`
            wrapper.appendChild(row);
        });
        this.app.appendChild(wrapper);
    }

    renderSnake(body) {
        let tailCell = this.getElement('.tail');
        if(tailCell) {
            tailCell.classList.remove('tail');
            tailCell.classList.remove('snake');
        };

        const head = body[0];
        const headCell = this.getElement(`#x-${head.x}_y-${head.y}`);
        headCell.classList.add('snake');

        const tail = body[body.length - 1];
        tailCell = this.getElement(`#x-${tail.x}_y-${tail.y}`);
        tailCell.classList.add('tail');
    }

    renderTable(cells) {
        const table = this.createElement('table');
        cells.forEach((item) => {
            const row = this.createElement('tr');
            item.forEach(() => {
                const cell = this.createElement('td', 'cell');
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
        this.app.appendChild(table);
    }
    
    createElement(tag, className, id) {
        const elemnt = document.createElement(tag);
        if (className) elemnt.classList.add(className);
        if (id) elemnt.id = id;
        return elemnt;
    }
    
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }
    
    getElements(selector) {
        const element = document.querySelectorAll(selector);
        return element;
    }

    bindDriveSnake(handler) {
        window.addEventListener('keydown', event => {
            // console.log(event);
            handler(event.key);
        });
    }
    
    bindStartGame(handler) {
        window.addEventListener('keydown', event => {
            handler(event.key);
        });
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindStartGame(this.handleStartGame);
        this.view.bindDriveSnake(this.handleDriveSnake);
    }

    handleStartGame = (e) => {
        switch (e) {
            // UP
            case 'W':
            case 'w':
            case "ArrowUp":
            // RIGHT
            case 'D':
            case 'd':
            case'ArrowRight':
            // LEFT
            case 'A':
            case 'a':
            case 'ArrowLeft':
                this.animate();
                window.removeEventListener('keydown', this.handleStartGame);
                break;
        }
    } 

    handleDriveSnake = (e) => {
        switch (e) {
            case 'W':
            case 'w':
            case "ArrowUp":
                this.model.snake.direction = {x: 0, y: 1};
                break;
            case 'D':
            case 'd':
            case'ArrowRight':
                this.model.snake.direction = {x: 1, y: 0};
                break;
            case 'S':
            case 's':
            case 'ArrowDown':
                this.model.snake.direction = {x: 0, y: -1};
                break;
            case 'A':
            case 'a':
            case 'ArrowLeft':
                this.model.snake.direction = {x: -1, y: 0};
                break;
        }
    }

    animate = () => {
        setTimeout(() => {
            window.requestAnimationFrame(this.animate);
            this.view.renderSnake(this.model.snake.body);
            this.model.driveSnake();
        }, 1000 / 10);
    }
}

const app = new Controller(new Model(), new View());
app.model.setupGrid(app.view.columns, app.view.rows);
app.view.renderGrid(app.model.cells);
app.model.setupSnake();
app.view.renderSnake(app.model.snake.body);