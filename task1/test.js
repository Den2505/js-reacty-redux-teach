'use strict';
console.log("Крестики нолики:) \n" +
    "Скрипт реализует алгоритм игры крестики-нолики \n" +
    "Присутствует возможность задать разерность игрового поля \n" +
    "Игрок играет крестиками - комьютер ноликами \n" +
    "Компьютер не облададает интеллектом, но возможно реализовать простой AI дописав метод getMoveOfComputer\n" +
    "Игра заканчивается в момент, когда заканчиваются свободные ячейки поля\n");


var readlineSync = require('readline-sync');
var fieldDimension = readlineSync.question("Введите размерность игрового поля: ");
var gameField = generateGameField(fieldDimension);
var game = new Game(gameField);
var playerName = readlineSync.question("Введите имя: ");
var computerName = "comp";
var player = new Player(playerName, "player");
var computer = new Player(computerName, "AI");

while (game.checkStatus()) {
    try {


        var answer = readlineSync.question("Введите позицию для хода(формат: строка столбец) ");
        var move = answer.split(" ");
        move[0]--;
        move[1]--;
        game.makeMove(player, move);

        console.log("Ваш ход " + playerName, answer);

        game.field.forEach(function (item) {
            console.log(item);
        });

        if (!game.checkStatus()) {
            break;
        }
        game.makeMove(computer, game.getComputerMove());

        game.field.forEach(function (item) {
            console.log(item);
        });
    }
    catch (e) {
        console.log(e.message);
        continue;
    }
}
console.log("Game over");



function Game(gameField) {
    this.field = gameField;

    this.makeMove = function (owner, move) {
        //var p;
        for (var i = 0; i < move.length; i++) {
            if (this.field[0].length <= move[i]) {
                throw new CellOutOfRangeError(move);
            }
        }
        if (this.field[move[0]][move[1]] !== "-") {
            throw new CellIsNotEmptyError(move);
        }

        if (owner.type === "player") {
            this.field[move[0]][move[1]] = "x";
        }
        else {
            this.field[move[0]][move[1]] = "0";
        }
    };

    this.checkStatus = function () {
        for (var i = 0; i < this.field.length; i++) {
            for (var j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j] == "-") {
                    console.log(this.field[i][j]);
                    return true;
                }

            }
        }
        return false;
    };

    this.getComputerMove = function () {
        var isRun = true;
        while (isRun) {
            var x = Math.floor(Math.random() * this.field.length);
            var y = Math.floor(Math.random() * this.field.length);

            if (this.field[x][y] === "-") {
                isRun = false;
                console.log("Ход компьютера " + [x + 1, y + 1]);
                return [x, y];
            }
        }
    }
}


function generateGameField(dimention) {
    var field = new Array(dimention);
    for (var i = 0; i < dimention; i++) {
        field[i] = new Array(dimention);
        for (var j = 0; j < dimention; j++) {
            field[i][j] = "-";
        }
    }
    return field;
}

function Player(name, type) {
    this.name = name;
    this.type = type;
}

function CellIsNotEmptyError(cell) {
    Error.call(this, cell);
    this.name = "CellIsNotEmptyError";
    this.cell = cell;
    this.message = "Cannot set value for cell X Y. Cell is not empty: " + (cell[0] + 1) + " " + (cell[1] + 1);
}

function CellOutOfRangeError(cell) {
    Error.call(this, cell);
    this.name = "CellOutOfRangeError";
    this.cell = cell;
    this.message = "Cannot set value for cell X Y. Cell is out of the field range: " + (cell[0] + 1) + " " + (cell[1] + 1);
}