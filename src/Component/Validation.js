/**
 * (c) Weblink Technology. All rights reserved.
 **/
export const isEmptyObject = (object) => {
  return (
    object === undefined || object === null || Object.keys(object).length === 0
  );
};

export const isEmptyArray = (value) => {
  return value === undefined || value === null || value.length === 0;
};

export const isEmptyString = (value) => {
  return (
    value === undefined || value === null || value.toString().trim() === ""
  );
};

export const isString = (value) => {
  return value !== undefined && value !== null && typeof value === "string";
};

export const isObject = (value) => {
  return value !== undefined && value !== null && typeof value === "object";
};
export const isSpecialCharacter = (value) => {
  return value !== undefined && value !== null && value.match(/[^A-Za-z0-9]+/g);
};

export const isEmailSpecialChar = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,4}/gim)
  );
};

export const isValidNumberDot = (value) => {
  return (
    value !== undefined && value !== null && value.match(/^\d+(\.\d+){0,2}$/)
  );
};

export const isValdAlpNumSpcUdscrHyph = (value) => {
  return (
    value !== undefined && value !== null && value.match(/^\w+([\s-_]\w+)*$/)
  );
};

export const ErrorMessage = {
  NetworkError: "Network Error",
};

export const isValidation = (value, fieldName) => {
  if (value === undefined || value === null || value.trim() === "") {
    return {
      fieldName: fieldName,
      msg: "this field is required",
    };
  } else {
    return {
      fieldName: fieldName,
      msg: "this field is required",
    };
  }
};

export const isNumber = (evt) => {
  return (evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57;
};

export const isAlpha = (evt) => {
  var keyCode = evt.which ? evt.which : evt.keyCode;
  return (
    (keyCode < 65 || keyCode > 90) &&
    (keyCode < 97 || keyCode > 123) &&
    keyCode != 32
  );
};

export const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\[0-9]{1,3}\[0-9]{1,3}\[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
