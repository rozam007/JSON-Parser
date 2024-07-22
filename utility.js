export const isBooleanTrue = (value) => value === "true";
export const isBooleanFalse = (value) => value === "false";
export const isNull = (value) => value === "null";
export const isNumber = (value) => !isNaN(Number(value));
