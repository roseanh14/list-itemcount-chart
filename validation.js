const {body} = require("express-validator");

const userValidator = [
    body("username", "Username is missing").isString(),
    body("password", "password is missing").isString()
]

module.exports = {
    userValidator
}

