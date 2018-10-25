'use strict';
{
    const userData = ['Male', 'Ivan', 'Ivanov', 'Omsk', 'Russia', 19, 'Batman', 'Iron Man', 'Scrubs'];
    const [, firstName, lastName, , , age = null, ...films] = userData;
    console.log(`firstName - ${firstName}, lastName - ${lastName}, Favorite films - ${films}`);
}

{
    const userProfile = {
        gender: 'Male',
        firstName: 'Ivan',
        lastName: 'Ivanov',
        location: {
            city: 'Omsk',
            country: 'Russia'
        },
        age: 19,
        films: ['Batman', 'Iron Man', 'Scrubs']
    };

    let {firstName: name, lastName: secondName, age: age = null, films: films = [], location: currentCity = `Unknown city`} = userProfile;

    console.log(`firstName - ${name}; lastName - ${secondName}; age - ${age}, films - ${films}; location - ${currentCity.country} ${currentCity.city}`);
}


function print(arr = [], separator = `-`) {
    let result = function () {
        let result = "";
        for (let i = 0; i < arr.length; i++) {
            result += arr[i];
            if (i !== arr.length - 1) {
                result += separator;
            }
        }
        return result;
    };
    console.log(result());
}

print();

function printMessage(message, data = new Date().toUTCString()) {
    console.log(`[${data}] ${message}`);

}

printMessage("Hi There!");

function exclude(arr = [], ...rest) {
    let newArr = [];
    for (let j = 0; j < rest.length; j++) {
        while (arr.includes(rest[j])) {
            arr.splice(arr.indexOf(rest[j]), 1);
        }

    }
    console.log(arr);
    return arr;
}

exclude([1, 2, 3], 1, 6, 7, 8, 2, 3);


const user = {
    name: 'Ivan',
    age: 18
};

function printUser({name: name = user.name, age: years = user.age} = user) {
    console.log(name, years);
}

printUser(user);
printUser({name: 'Ivan'});
printUser({age: 19});
printUser({});
printUser();

class Animal {
    constructor(name, color, energy = 0) {
        this.name = name;
        this.color = color;
        this.energy = energy;
        this.maxEnergy = 100;
    }

    getInfo() {
        return `name - ${this.name} , color - ${this.color}`
    }

    eat(energy) {
        this.energy = (this.energy + energy) >= this.maxEnergy ? this.maxEnergy : this.energy + energy;
    }

    say(message) {
        console.log(`${this.name} says ${message}`)
    }
}


class Cat extends Animal {
    constructor(name, color, energy = 50) {
        super(name, color, energy);
    }

    say(message) {
        console.log(`${this.name} says: Meow ${message}`)
    }

    eat(energy) {
        super.eat(energy);
        if (this.energy < this.maxEnergy) {
            this.say(`I want more food`)
        }
    }

    catchMouse() {
        if (this.energy >= 20) {
            this.say(`The mouse was caught`);
            this.energy -= 20;
        }
        else {
            console.log(`I'm tired`);
        }

    }
}

let cat = new Cat("Fuf", "black", 10);
cat.eat(10);
cat.catchMouse();
cat.catchMouse();

class BritishShorthair extends Cat {

    catchMouse() {
        console.log(`British cats are too lazy to catch mice`);
    }
}

let br = new BritishShorthair(`Jon`, `black`);
br.catchMouse();

class Dog extends Animal {

    constructor(name, color, energy = 75) {
        super(name, color, energy);
    }

    say(message) {
        console.log(` ${this.name} says: Woof ${message}`)
    }

    eat(energy) {
        super.eat(energy);
        if (this.energy < this.maxEnergy) {
            this.say(`I want more food`)
        }
    }

    guard(message = `You are under my protection`) {
        if (this.energy < 25) {
            this.say(`I'm tired`);
        }
        else {
            this.energy -= 25;
            this.say(message)
        }
    }
}

class PitBull extends Dog {
    guard() {
        super.guard(`You are under my protection like never before`);
    }
}

let pitBull = new PitBull(`Mike`, `White`);
pitBull.say(`Hello`);
pitBull.eat(100);
pitBull.guard();

const readline = require('readline');


function getLargestNumber() {

    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Enter the Number`, (answer) => {
            resolve(new Number(answer));
            rl.close();
        });
    });

}

let arr = [];
getLargestNumber()
    .then(value => arr = arr.concat(value))
    .then(getLargestNumber)
    .then(value => arr = arr.concat(value))
    .then(getLargestNumber)
    .then(value => arr = arr.concat(value))
    .then(getLargestNumber)
    .then(value => arr = arr.concat(value))
    .then(getLargestNumber)
    .then(value => {
        arr = arr.concat(value);
        arr.sort((a, b) => {
            return a - b;
        });
        console.log(`The largest number: ${arr[arr.length-1]}`);
    });
