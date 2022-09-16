const out2 = document.getElementById("output2");
const out3 = document.getElementById("output3");
const out4 = document.getElementById("output4");

function base35_to_int(x) {
  var num_let = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = [];
  //ensures that the input policy number is in all caps for letters
  var upper_x = x.toUpperCase();
  //upcase when decoding string
  for (var i = 0; i < upper_x.length; i++) {
    var char_pos = num_let.search(upper_x.slice(i, i + 1));
    result.push(num_let.slice(char_pos - 1, char_pos));
  }

  //convert to base 10
  return parseInt(result.join(""), 35);
}

function id_decoder() {
  var x = document.getElementById("policy-number").value;
  x = x.replace(/0/g, "O");
  const type_bit = 4;
  const partner_bit = 7;
  const region_bit = 8;

  var policy = x.split("-")[0];
  var time_id = x.split("-")[1];

  //base 35 to base 2 for policy
  var policy_bin = base35_to_int(policy).toString(2);
  //addition of leading zeros
  //+1 is for parity
  var policy_bin_full = bin_length_helper(
    policy_bin,
    type_bit + partner_bit + region_bit + 1
  );

  if (sumStr(policy_bin_full) % 2) {
    // if the sum of the digits is odd, decode the number
    var type = parseInt(policy_bin_full.slice(0, type_bit), 2);
    var partner = parseInt(
      policy_bin_full.slice(type_bit, type_bit + partner_bit),
      2
    );
    var region = parseInt(
      policy_bin_full.slice(
        type_bit + partner_bit,
        type_bit + partner_bit + region_bit
      ),
      2
    );
  } else {
    // if the sum of the digits is even, some error has occured
    var type = "Check sum failed";
    var partner = "Please check if the policy number was inputted correctly";
    var region = "";
  }

  //return [type, partner, region];
  out2.innerHTML = "type value: " + type;
  out3.innerHTML = "partner value: " + partner;
  out4.innerHTML = "region value: " + region;
}

function bin_length_helper(x, bits) {
  //adds zeros to front of strings to get desired length
  var add_zeros = Math.abs(bits - x.length);

  var y = "0".repeat(add_zeros);
  return y + x;
}

function sumStr(str) {
  //fucntion used to compute the sum of the binary string for parity validation
  let strArr = str.split("");
  let sum = strArr.reduce(function (total, num) {
    return parseFloat(total) + parseFloat(num);
  });
  return sum;
}

//2JX6-QUOB5K7V
//console.log(id_decoder("B0RG"));
