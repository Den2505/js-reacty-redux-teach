'use strict';
function task2_3() {

    function print(arr = [], separator = `-`) {

        console.log(arr.join(separator));
    }

    print([`Hello`,`World`]);

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

}

module.exports = task2_3();
