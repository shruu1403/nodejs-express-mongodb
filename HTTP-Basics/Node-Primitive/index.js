const fs = require("fs");

// complete the following fubctions

function isNumber(num) {
  const result =
    typeof num === "number" && !isNaN(num)
      ? "it is a Number."
      : "it is Not a Number.";

  fs.writeFileSync("test.txt", result);
}

function isStr(str) {
  const result =
    typeof str === "string" && isNaN(Number(str))
      ? "it is a String."
      : "it is Not a String.";

  fs.writeFileSync("test.txt", result);
}

function isArray(arr) {
  const result = Array.isArray(arr) ? "it is a Array." : "it is Not a Array.";

  fs.writeFileSync("test.txt", result);
}

function isObj(obj) {
  const result =
    typeof obj === "object" && obj !== null && !Array.isArray(obj)
      ? "this is a object."
      : "this is not a object.";

  fs.writeFileSync("test.txt", result);
}

function cls() {
  if (fs.existsSync("test.txt")) {
    fs.unlinkSync("test.txt");
  }
}

// Export All the functions
module.exports = {
  isNumber,
  isArray,
  isStr,
  isObj,
  cls,
};

isNumber(10);
isStr("hello");
isArray([1, 2, 3]);
isObj({ name: "Shruti" });
cls();
