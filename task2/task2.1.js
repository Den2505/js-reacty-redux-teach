'use strict';
function task2_1() {
    const userData = ['Male', 'Ivan', 'Ivanov', 'Omsk', 'Russia', 19, 'Batman', 'Iron Man', 'Scrubs'];
    const [, firstName, lastName, , , age = null, ...films] = userData;
    console.log(`firstName - ${firstName}, lastName - ${lastName}, Favorite films - ${films}`);
}

module.exports = task2_1();