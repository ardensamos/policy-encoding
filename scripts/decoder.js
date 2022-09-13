function base35_to_int(x) {
    var num_let = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = [];
    var upper_x = x.toUpperCase()

    for (var i = 0; i < upper_x.length; i++) {
        
        var char_pos = num_let.search(upper_x.slice(i, i+1));
        result.push(num_let.slice(char_pos - 1, char_pos));
      }

    //convert to base 10
    return parseInt(result.join(''), 35);
}

function bin_length_helper(x, bits) {
    //adds zeros to front of strings to get desired length 
    var add_zeros = Math.abs(bits - x.length);
    var y = "0".repeat(add_zeros);

    return y + x;
}

function id_decoder(x) {
    const type_bit = 4;
    const partner_bit = 7;
    const region_bit = 8;

    var policy = x.split('-')[0];
    var time_id = x.split('-')[1];

    //base 35 to base 2 for policy 
    var policy_bin = base35_to_int(policy).toString(2);
    //addition of leading zeros 
    //+1 is for parity 
    var policy_bin_full = bin_length_helper(policy_bin, type_bit + partner_bit + region_bit + 1);
    
    var type = parseInt(policy_bin_full.slice(0, type_bit), 2);
    var partner = parseInt(policy_bin_full.slice(type_bit, type_bit + partner_bit), 2);
    var region = parseInt(policy_bin_full.slice(type_bit + partner_bit, type_bit + partner_bit + region_bit), 2);

    return [type, partner, region];
}

//2JX6-QUOB5K7V
console.log(id_decoder('P4L2-QUOBUDN2'));