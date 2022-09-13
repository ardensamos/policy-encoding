function intToBase35p1(x) {
  //converts a base 10 number to base 35, then increments by 1 (avoid zero/O confusion)

  const num = Array.from(Array(10).keys()).map(String);
  const alpha = Array.from(Array(26)).map((e,i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  const num_letter = num.concat(alphabet);

  /*
  var num_letter = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  */

  var result = [];

  while (x > 0) {
    result.unshift(num_letter[(x % 35) + 1]);
    x = Math.floor(x / 35);
  }

  return result.join("");
}

function id_maker() {
  const type = +document.getElementById("type").value;
  const partner = +document.getElementById("partner").value;
  const region = +document.getElementById("region").value;

  const out1 = document.getElementById("output1");

  const type_bit = 4;
  const partner_bit = 7;
  const region_bit = 8;
  const d = new Date();

  //convert to binary
  var type_bin = bin_length_helper(type.toString(2), type_bit);
  var partner_bin = bin_length_helper(partner.toString(2), partner_bit);
  var region_bin = bin_length_helper(region.toString(2), region_bit);

  var bin_str = type_bin + partner_bin + region_bin;

  //compute odd bit parity
  if (sumStr(bin_str) % 2) {
    bin_str = bin_str + "0";
  } else {
    bin_str = bin_str + "1";
  }

  var encode = intToBase35p1(parseInt(bin_str, 2));

  var time_num = d.getTime();
  var time_encode = intToBase35p1(time_num);

  //return encode + "-" + time_encode;
  out1.innerHTML = encode + "-" + time_encode;
}

function sumStr(str) {
  //fucntion used to compute the sum of the binary string for parity validation
  let strArr = str.split("");
  let sum = strArr.reduce(function (total, num) {
    return parseFloat(total) + parseFloat(num);
  });
  return sum;
}

function bin_length_helper(x, bits) {
  //adds zeros to front of strings to get desired length
  var add_zeros = Math.abs(bits - x.length);

  var y = "0".repeat(add_zeros);
  return y + x;
}
//16, 128, 256
//console.log(id_maker(15, 98, 80));
