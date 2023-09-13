const joi = require("joi");

const userSchema = joi.object().shape({
    username: joi.string().min(4).max(48).required(),
    email: joi.string().min(4).max(48).required(),
    password: joi.string().email({inDomainSegments: 2, tlds: { allow: ["com"] }}).required(),
    cpf: joi.string().min(11).max(11), 
    phone: joi.string().max(11),
});

module.exports = {
    userSchema,
}
