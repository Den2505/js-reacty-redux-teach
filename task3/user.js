`use strict`;

class User {
    constructor() {
        this.idCounter = 4;
        this.users = [
            {
                id: 1,
                firstName: "Ivan",
                lastName: "Ivanov",
                age: 31
            },
            {
                id: 2,
                firstName: "Maria",
                lastName: "Ivanovа",
                age: 25
            },
            {
                id: 3,
                firstName: "Sergey",
                lastName: "Ivanov",
                age: 27
            }
        ];
    }


    addUser({firstName, lastName, age}) {
        let user = {
            id: this.idCounter++,
            firstName: firstName,
            lastName: lastName,
            age: age
        };
        this.users.push(user);
    }

    getUserById(id) {
        let userIndex = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == id) {
                userIndex = i;
                break;
            }
        }
        if (userIndex === -1) {
           // throw new   Error("Wrong User ID");
            throw new class extends Error {
                constructor() {
                    super();
                    this.name = "WrongUserID";
                    this.message = "Wrong User ID";
                    this.statusCode = 404;
                }
            };
        }
        return this.users[userIndex];
    }

    deleteUserById(id) {
        let userIndex = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == id) {
                userIndex = i;
                break;
            }
        }
        if (userIndex === -1) {
        //    throw new   Error("Wrong User ID");
            throw new class extends Error {
                constructor() {
                    super();
                    this.name = "WrongUserID";
                    this.message = "Wrong User ID";
                    this.statusCode = 404;
                }
            };
        }

        this.users.splice(userIndex, 1);


    }

    updateUser(id, args) {

        let userIndex = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == id) {
                userIndex = i;
                break;
            }
        }
        validate();
        this.users.splice(userIndex, 1, Object.assign(this.users[userIndex], args));


        function validate() {
            if (userIndex === -1) {
                throw new class extends Error {
                    constructor() {
                        super();
                        this.name = "Wrong User ID";
                        this.message = "Wrong User ID";
                        this.statusCode = 404;
                    }
                };
            }

            function InvalidParameterError(par) {
                Error.call(this, par);
                this.name = "InvalidParameterError";
                this.message = `Field ${par} should not be empty`;
                this.code = 404;
            }

            if (args.hasOwnProperty("firstName") & args.firstName === ``) {
                throw new InvalidParameterError("firstName");
            }

            if (args.hasOwnProperty("lastName") & args.lastName === ``) {
                throw new InvalidParameterError("lastName");
            }

            if (args.hasOwnProperty("age") & args.age === undefined) {
                throw new InvalidParameterError("age");
            }

        }

    }

    getAllUsers() {
        return this.users;
    }
}


module.exports = User;
