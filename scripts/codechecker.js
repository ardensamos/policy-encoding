function is_valid(x) {
  // Fetch user inputted policy number, replace any zeroes with O's
  x = x.toString().replace(/0/g, "O");
  x = x.toUpperCase();

  // Define the lengths of various parts of the encoded/decoded policy numbers
  const type_bit = 4;
  const partner_bit = 7;
  const region_bit = 8;

  // Split the encoded policy into its policy portion, and time portion
  // Currently, the time portion is not used
  var policy = x.split("-")[0];
  var time_id = x.split("-")[1];

  // Convert the encoded policy number from base 35 to base 2
  var policy_bin = base35_to_int(policy).toString(2);
  // Add leading zeroes to the binary policy number to make sure it is equal to its standard length
  // The standard length is equal to the length of the type, partner, and region portions, plus an additional digit for the parity bit
  var policy_bin_full = bin_length_helper(policy_bin, type_bit + partner_bit + region_bit + 1);

  // Regex used to validate format of input
  // This expression basically says "Precisely four alphanumeric characters (where letters are uppercase), with the option of having
  // that be followed by a dash, and precisely eight alphanumeric characters (uppercase letters). If the eight alphanumeric characters
  // are there, there is also the option of having another dash, and another alphanumeric block of undefined length (policy specific codes)"
  // In other words, the input should either be the first part of a full policy number (the bit with the information)
  // Or the full policy number (including the timestamp)
  const regex = /^[0-9A-Z]{4}(|-[0-9A-Z]{8}(|-[0-9A-Z]+))$/;
  
  if (x==="") { // Returns blank on empty input
      var type = "";
      var partner = "";
      var region = "";
  }
  // Returns error if policy ID does not match the format prescribed in the regex above
  else if (!regex.test(x)) {
      var type = "Invalid policy number format";
      var partner = "A policy number should either have the format XXXX or XXXX-XXXXXXXX";
      var region = "Where each digit is a number (1-9) or an uppercase letter (A-Z)";
  }
  else if (sumStr(policy_bin_full) % 2) { // If the sum of the digits in the binary number is odd, the number passes the parity test and is decoded
      var type = parseInt(policy_bin_full.slice(0, type_bit), 2) + 1;
      var partner = parseInt(policy_bin_full.slice(type_bit, type_bit + partner_bit),2) + 1;
      var region = parseInt(policy_bin_full.slice(type_bit + partner_bit,type_bit + partner_bit + region_bit),2) + 1;
  } else { // If the sum of the digits is even, the number fails the parity test and an error message is returned
      var type = "Check sum failed";
      var partner = "Please check if the policy number was inputted correctly";
      var region = "";
  }
}

// Converts a base 10 number to modified base 35
// The returned number will be of length len, so if the converted number is usually of a shorter length than len, leadings 1's (the smallest digit in modified base 35)
// will be added until it reaches the length len
function intToBase35p1(x, len) {
  // Create an array of the digits 0-9, then of the letters A-Z  
  const num = Array.from(Array(10).keys()).map(String);
  const alpha = Array.from(Array(26)).map((e,i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  const num_letter = num.concat(alphabet);
  // const num_letter = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  
  // Create an array that will store the digits of the converted number
  var result = [];

  // Convert to modified base 35
  while (x > 0) {
    result.unshift(num_letter[(x % 35) + 1]);
    x = Math.floor(x / 35);
  }

  // Join the digits of the converted number, which are stored as elements in an array, to form a string
  result = result.join("")

  // Add leading 1's to make sure the converted number has a length no shorter than len
  result = "1".repeat(Math.abs(len - result.length)) + result

  return result;  
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

// Adds 0's to the front of strings to reach the desired length, bits
// Intended for making sure binary strings are of the correct length to create the policy number
function bin_length_helper(x, bits) {
  var add_zeros = Math.abs(bits - x.length);
  var y = "0".repeat(add_zeros);
  return y + x;
}

// console.log(id_decoder("L1XV-QUUU4U4R"));