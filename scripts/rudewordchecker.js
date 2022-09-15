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

function id_decoder(x) {
  // Convert to base 2
  var policy_bin = base35_to_int(x).toString(2);

  // If the sum of the digits is odd, print the word
  if (sumStr(policy_bin) % 2) {
    console.log(x);
  } 
}

function sumStr(str) {
  //fucntion used to compute the sum of the binary string for parity validation
  let strArr = str.split("");
  let sum = strArr.reduce(function (total, num) {
    return parseFloat(total) + parseFloat(num);
  });
  return sum;
}

var rudewords = ['ANAL','ANUS','BABE','BANG','BARF','BEER','BLOW','BONE','BONG','BOOB','BUNG','BUTT','CACA','CAWK','CL1T','CLIT','COCK','COON','CRAP','CUNT','CUNT','D1CK','DAGO','DAMN','DICK','DIKE','DONG','DYKE','FACK','FAGG','FAGS','FAIG','FART','FOAD','FUCK','FVCK','FXCK','GAYS','GHAY','GHEY','GOOK','GTFO','HE11','HEBE','HEEB','HELL','HEMP','HERP','HOMO','HOOR','HUMP','JAPS','JERK','JISM','JIZM','JIZZ','KIKE','KILL','KLAN','KYKE','LECH','LMAO','LOIN','LUBE','MAMS','MAXI','METH','MOFO','MUFF','NADS','NAZI','ORAL','ORGY','OVUM','PAKI','PEDO','PIMP','PISS','POON','PORN','PRIG','PUBE','PUSS','PUTO'];
for (var rudeword of rudewords) {
    id_decoder(rudeword);
}
