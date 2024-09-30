const validateCpfBefore = require("./validate_cpf");

console.log(validateCpfBefore.validate("00000000000"));     //false
console.log(validateCpfBefore.validate("86446422799"));     //false
console.log(validateCpfBefore.validate("86446422784"));     //true
console.log(validateCpfBefore.validate("864.464.227-84"));  //true
console.log(validateCpfBefore.validate("91720489726"));     //true
console.log(validateCpfBefore.validate("a1720489726"));     //false