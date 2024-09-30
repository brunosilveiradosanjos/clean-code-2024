"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/cpf/validate_cpf.ts
var validate_cpf_exports = {};
__export(validate_cpf_exports, {
  validate: () => validate
});
module.exports = __toCommonJS(validate_cpf_exports);
var FACTOR_DIGIT_1 = 10;
var FACTOR_DIGIT_2 = 11;
var MAX_DIGITS_1 = 9;
var MAX_DIGITS_2 = 10;
function validate(cpf = "") {
  cpf = extractDigits(cpf);
  if (isInvalidLength(cpf)) return false;
  if (isBlocked(cpf)) return false;
  const digit1 = calculateDigit(cpf, FACTOR_DIGIT_1, MAX_DIGITS_1);
  const digit2 = calculateDigit(cpf, FACTOR_DIGIT_2, MAX_DIGITS_2);
  const calculatedCheckDigit = `${digit1}${digit2}`;
  return getCheckDigit(cpf) === calculatedCheckDigit;
}
function extractDigits(cpf) {
  return cpf.replace(/\D/g, "");
}
function isInvalidLength(cpf) {
  return cpf.length !== 11;
}
function isBlocked(cpf) {
  const [digit1] = cpf;
  return cpf.split("").every((digit) => digit === digit1);
}
function calculateDigit(cpf, factor, max) {
  let total = 0;
  for (const digit of toDigitArray(cpf).slice(0, max)) {
    total += digit * factor--;
  }
  return total % 11 < 2 ? 0 : 11 - total % 11;
}
function toDigitArray(cpf) {
  return [...cpf].map((digit) => parseInt(digit));
}
function getCheckDigit(cpf) {
  return cpf.slice(9);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validate
});
