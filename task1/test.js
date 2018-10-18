'use strict';
console.log("Крестики нолики:) \n" +
    "Скрипт реализует алгоритм игры крестики-нолики \n" +
    "Присутствует возможность задать разерность игрового поля \n" +
    "Игрок играет крестиками - комьютер ноликами \n" +
    "Компьютер не облададает интеллектом, но возможно реализовать простой AI дописав метод getMoveOfComputer\n" +
    "Игра заканчивается в момент, когда заканчиваются свободные ячейки поля\n");


var readlineSync = require('readline-sync');
var fieldDimension = readlineSync.question("Введите размерность игрового поля: ");
var gameField = GenerateGameField(fieldDimension);
var game = new Game(gameField);
var playerName = readlineSync.question("Введите имя: ");
var computerName = "comp";
var player = new Player(playerName, "player");
var computer = new Player(computerName, "AI");

while (checkGameStatus(game)) {
    try {


        var answer = readlineSync.question("Введите позицию для хода(формат: строка столбец) ");
        var move = answer.split(" ");
        move[0]--;
        move[1]--;
        setGameStatus(game, player, move);

        console.log("Ваш ход " + playerName, answer);

        game.field.forEach(function (item, i, arr) {
            console.log(item);
        });

        if (!checkGameStatus(game)) {
            break;
        }
        setGameStatus(game, computer, getMoveOfComputer(game));

        game.field.forEach(function (item, i, arr) {
            console.log(item);
        });
    }
    catch (e) {
        console.log(e.message);
        continue;
    }
}
console.log("Game over");

function checkGameStatus(game) {
    for (var i = 0; i < game.field.length; i++) {
        for (var j = 0; j < game.field[i].length; j++) {
            if (game.field[i][j] == "-") {
                console.log(game.field[i][j]);
                return true;
            }

        }
    }
    return false;
}

function setGameStatus(game, owner, move) {
    //var p;
    for (var i = 0; i < move.length; i++) {
        if (game.field[0].length <= move[i]) {
            throw new CellOutOfRangeError(move);
        }
    }
    if (game.field[move[0]][move[1]] !== "-") {
        throw new CellIsNotEmptyError(move);
    }

    if (owner.type === "player") {
        game.field[move[0]][move[1]] = "x";
    }
    else {
        game.field[move[0]][move[1]] = "0";
    }
}

function getMoveOfComputer(game) {
    var isRun = true;
    while (isRun) {
        var x = Math.floor(Math.random() * game.field.length);
        var y = Math.floor(Math.random() * game.field.length);

        if (game.field[x][y] === "-") {
            isRun = false;
            console.log("Ход компьютера " + [x + 1, y + 1]);
            return [x, y];
        }
    }
}


function Game(gameField) {
    this.field = gameField;
}


function GenerateGameField(dimention) {
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