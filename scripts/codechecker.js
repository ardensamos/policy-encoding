// Checks if a four digit alphanumeric code (uppercase letters) is a valid policy number
function is_valid(x) {
  // Convert the encoded policy number from base 35 to base 2
  var policy_bin = base35_to_int(x).toString(2);
  
  return sumStr(policy_bin) % 2;
}

// Converts a number in modified base 35 to base 10
function base35_to_int(x) {
  var num_let = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = [];

  // Ensure the policy number is all uppercase before converting
  var upper_x = x.toUpperCase();

  // Convert from modified base 35 (1-Z) back to standard base 35 (0-Y)
  for (var i = 0; i < upper_x.length; i++) {
    var char_pos = num_let.search(upper_x.slice(i, i + 1));
    result.push(num_let.slice(char_pos - 1, char_pos));
  }

  // Convert from standard base 35 to base 10
  return parseInt(result.join(""), 35);
}

// Returns the sum of the digits of a binary string
// This method is used primarily for parity validation
function sumStr(str) {
  let strArr = str.split("");
  let sum = strArr.reduce(function (total, num) {
      return parseFloat(total) + parseFloat(num);
  });
  return sum;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

var digits = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var num_valid = 0;

for (let i = 0; i < 10000; i++) {
  var num = "";
  for (let j = 0; j < 4; j++) {
    num = num + digits.charAt(getRandomInt(0,35));
  }
  if (is_valid(num)) {
    num_valid++;
  }
}

console.log(num_valid);

// console.log(id_decoder("L1XV-QUUU4U4R"));