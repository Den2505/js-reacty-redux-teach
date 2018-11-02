'use strict';
function task2_2() {

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

// REVIEW spoteryuha: age: age = null - you can assign default value without renaming if you want to use the same name ->
    let {firstName: name, lastName: secondName, age = null, films = [], location: currentCity = `Unknown city`} = userProfile;
    console.log(`firstName - ${name}; lastName - ${secondName}; age - ${age}, films - ${films}; location - ${currentCity.country} ${currentCity.city}`);

}

module.exports = task2_2();