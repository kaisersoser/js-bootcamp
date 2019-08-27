function CheckCharacters(src, restricted) {
   return src.split("").some(ch => restricted.indexOf(ch) !== -1);
}

function CheckMinLength(src, minLength) {
   return src.length >= minLength
}

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let specialCharacters = "~!@#$%^&*()_+"
let upperCaseNormal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let numbersNormal = "0123456789"
let minLength = 8

rl.question("Enter a Password: ", function(answer) {
   // TODO: Log the answer in a database
   console.log("Meets min length: %s", CheckMinLength(answer, minLength))
   console.log("Has at least 1 UpperCase: %s", CheckCharacters(answer, upperCaseNormal))
   console.log("Has at least 1 Number: %s", CheckCharacters(answer, numbersNormal))
   console.log("Has at least 1 special character: %s", CheckCharacters(answer, specialCharacters))
   rl.close();
 });

