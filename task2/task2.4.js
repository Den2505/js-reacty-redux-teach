'use strict';

function task2_4() {

    class Animal {
        constructor(name, color, energy = 0) {
            this.name = name;
            this.color = color;
            this.energy = energy;
            this.maxEnergy = 100;
        }

// REVIEW spoteryuha: you should be able to get this info as a property - Eg: animal.info instead of animal.getInfo()
        get info() {
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


    class BritishShorthair extends Cat {

        catchMouse() {
            console.log(`British cats are too lazy to catch mice`);
        }
    }


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

    let cat = new Cat("Fuf", "black", 10);
    cat.eat(10);
    cat.catchMouse();
    cat.catchMouse();

    let br = new BritishShorthair(`Jon`, `black`);
    br.catchMouse();

    let pitBull = new PitBull(`Mike`, `White`);
    pitBull.say(`Hello`);
    pitBull.eat(100);
    pitBull.guard();

}

module.exports = task2_4();