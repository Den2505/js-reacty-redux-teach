'use strict';

function task2_5() {
    function getLargestNumber() {
        const readline = require('readline');

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
// REVIEW spoteryuha: it works fine, but to make it better you can try to avoid using global variable to accumulate result ->
    //Now $arr is a field of function task2_5
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
            console.log(`The largest number: ${arr[arr.length - 1]}`);
        });

}


module.exports = task2_5();