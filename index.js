
class Model {
    constructor() {
        this.cells = [];
        this.snake = {
            body: [],
            direction: {
                x: 0, 
                y: 0
            }
        }
        this.food = {
            x: 0,
            y: 0
        }
        this.score = 0
        this.speed = 1;
    }

    setupGrid(columnsNumber, rowsNumber) {
        const rows = new Array(rowsNumber).fill(null);
        rows.forEach((item, i, rows) => {
            rows[i] = new Array(columnsNumber).fill().map(u => ({x: 0, y: 0}));
            rows[i].forEach((cell, j) => {
                cell.x = j + 1;
                cell.y = rows.length - i;
            });
        });
        this.cells = rows;
    }

    clearData() {
        this.snake = {
            body: [],
            direction: {
                x: 0, 
                y: 0
            }
        }
        this.score = 0;
        this.speed = 1;
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
            // Add new values to body starting from tail
            if (body[body.length - index - 2]) {
                body[body.length - index - 1] = this.snake.body[body.length - index - 2];
            }
            // if (body[index - 1]) {
            //     body[index] = this.snake.body[index - 1];
            // }
        });

        // Assign new values to 'head'.
        this.snake.body[0] = Object.assign({}, this.snake.body[0])
        this.snake.body[0].x += this.snake.direction.x;
        this.snake.body[0].y += this.snake.direction.y;
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    setupFood() {
        this.food.x = this.getRandom(1, this.cells[0][this.cells[0].length -1].x);
        this.food.y = this.getRandom(1, this.cells[0][0].y);
    }

    doesHeadCoverFood() {
        return this.snake.body[0].x === this.food.x && this.snake.body[0].y === this.food.y;
    }

    growSnake(x, y) {
        this.snake.body.push({x: x, y: y});
        this.score++;
    }

    increaseSpeed() {
        this.speed += 0.2;
    }

    checkCollisions(body, columns, rows, direction) {
        // Copy head coordinates and sum with the direction
        let head = {x: 0, y: 0};
        head.x = body[0].x + direction.x;
        head.y = body[0].y + direction.y;
        // const wallCollision = (head.x == columns && direction.x == 1
        //                 || head.y == rows && direction.y == 1
        //                 || head.x == 1 && direction.x == -1
        //                 || head.y == 1 && direction.y == -1);
        // const bodyCollision = head.x
        const wallCollision = (head.x > columns || head.y > rows || head.x < 1 || head.y < 1);
        const bodyCollision = body.find((item) => item.x == head.x && item.y == head.y);
        return wallCollision || bodyCollision;
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
            wrapper.style.marginTop = `${(this.innerHeight - this.cellSize * this.rows)/2}px`;
            wrapper.appendChild(row);
        });
        this.app.appendChild(wrapper);
    }

    removeGrid() {
        while(this.app.firstChild) {
            this.app.removeChild(this.app.lastChild);
        }
    }

    setupScore() {
        const wrapper = this.createElement('div', false, 'scoreWrapper');
        const text = document.createTextNode('Score: 0');
        wrapper.appendChild(text);
        this.app.appendChild(wrapper);
    }

    updateScore(score) {
        this.getElement('#scoreWrapper').innerHTML = `Score: ${score}`;
    }

    setupSnake(body) {
        const head = this.getElement(`#x-${body[0].x}_y-${body[0].y}`);
        head.classList.add('snake');
        const middle = this.getElement(`#x-${body[1].x}_y-${body[1].y}`);
        middle.classList.add('snake');
        const tail = this.getElement(`#x-${body[2].x}_y-${body[2].y}`);
        tail.classList.add('snake', 'tail');
    }

    updateSnake(body) {
        // Remove tail
        this.getElement('.tail').classList.remove('snake');
        this.getElement('.tail').classList.remove('tail');

        // Add new head
        const head = this.getElement(`#x-${body[0].x}_y-${body[0].y}`);
        head.classList.add('snake');

        // Mark new tail
        const tail = this.getElement(`#x-${body[body.length - 1].x}_y-${body[body.length - 1].y}`);
        tail.classList.add('tail');
    }

    renderFood(coordinates) {
        const food = this.getElement(`#x-${coordinates.x}_y-${coordinates.y}`);
        food.classList.add('food');
    }
    
    removeFood(coordinates) {
        const food = this.getElement(`#x-${coordinates.x}_y-${coordinates.y}`);
        food.classList.remove('food');
    }

    showGameOverMenu(score, handler) {
        // Add 'Game Over'
        const wrapper = this.createElement('div', false, 'gameOverMenuWrapper');
        const pGameOver = this.createElement('p', false, 'gameOver');
        pGameOver.appendChild(document.createTextNode('Game Over'));
        wrapper.appendChild(pGameOver);
        // Add 'Your Score is ...'
        const pScore = this.createElement('p', false, 'gameOverScore');
        pScore.appendChild(document.createTextNode(`Your score is ${score}`));
        wrapper.appendChild(pScore);
        // Add replay button
        const replayBtn = this.createElement('button', false, 'replayButton');
        replayBtn.appendChild(document.createTextNode('REPLAY'));
        // replayBtn.onclick = handler;
        wrapper.appendChild(replayBtn);
        // Add to the DOM
        this.app.insertBefore(wrapper, document.querySelector('.gridWrapper'));
        // Remove Score node
        this.app.removeChild(document.querySelector('#scoreWrapper'));
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
            handler(event.code);
        });
    }
    
    bindReplay(handler) {
        // const replayBtn = document.querySelector('#replayButton')
        window.addEventListener('click', event => {
            if (event.target.id == 'replayButton') {
                handler();
            };
        })
        
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindDriveSnake(this.handleDriveSnake);
        this.view.bindReplay(this.handleReplay);
    } 

    handleDriveSnake = (e) => {
        switch (e) {
            case 'KeyW':
            case "ArrowUp":
                if(this.model.snake.direction.y != -1) {
                    this.model.snake.direction = {x: 0, y: 1};
                }
                break;
            case 'KeyD':
            case'ArrowRight':
                if(this.model.snake.direction.x != -1) {
                    this.model.snake.direction = {x: 1, y: 0};
                }
                break;
            case 'KeyS':
            case 'ArrowDown':
                if(this.model.snake.direction.y != 1) {
                    this.model.snake.direction = {x: 0, y: -1};
                }
                break;
            case 'KeyA':
            case 'ArrowLeft':
                if(this.model.snake.direction.x != 1) {
                    this.model.snake.direction = {x: -1, y: 0};
                }
                break;
        }
    }

    animate = () => {
        setTimeout(() => {
            let req = window.requestAnimationFrame(this.animate);
            if (this.model.checkCollisions(this.model.snake.body, 
                                            this.view.columns,
                                            this.view.rows,
                                            this.model.snake.direction)) {
                window.cancelAnimationFrame(req);
                this.view.showGameOverMenu(this.model.score);
            } else {
                this.model.driveSnake();
                this.view.updateSnake(this.model.snake.body);
                if (this.model.doesHeadCoverFood()) {
                    this.model.growSnake(this.model.snake.body[0]);
                    this.model.increaseSpeed();
                    this.view.updateScore(this.model.score);
                    this.view.removeFood(this.model.snake.body[0]);
                    this.model.setupFood();
                    this.view.renderFood(this.model.food);
                }    
            }
        }, 1000 / (13 * this.model.speed));
    }

    init() {
        app.model.setupGrid(app.view.columns, app.view.rows);
        app.view.setupScore();
        app.view.renderGrid(app.model.cells);
        app.model.setupSnake();
        app.view.setupSnake(app.model.snake.body);
        app.model.setupFood();
        app.view.renderFood(app.model.food);

        window.addEventListener('keydown', handleStartGame);

        function handleStartGame(e) {
            switch (e.code) {
                // UP
                case 'KeyW':
                case "ArrowUp":
                // RIGHT
                case 'KeyD':
                case 'ArrowRight':
                // LEFT
                case 'KeyA':
                case 'ArrowLeft':
                    app.animate();
                    window.removeEventListener('keydown', handleStartGame);
                    break;
            }
        }
    }

    // handleReplay() {
    //     this.view.removeGrid();
    //     this.init();
    // }

    handleReplay = () => {
        this.view.removeGrid();
        this.model.clearData();
        this.init();
    }
}

const app = new Controller(new Model(), new View());
app.init();
