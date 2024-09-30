import { validate } from './validate_cpf'

console.log(validate('00000000000')) // false
console.log(validate('86446422799')) // false
console.log(validate('86446422784')) // true
console.log(validate('864.464.227-84')) // true
console.log(validate('91720489726')) // true
console.log(validate('a1720489726')) // false
