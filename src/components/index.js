export function isValidHourString(value) {
  const expression = /^(([01]?[0-9]|2[0-3])((:[0-5][0-9])|([,/.][0-9][0-9]?)|([0-9][0-9])?))?$/g;
  return expression.test(value);
}
