function intToBase35p1(x) {
    //converts a base 10 number to base 35, then increments by 1 (avoid zero/O confusion)

    var num_let = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    
    var result = [];

    while (x > 0) {
        result.unshift(num_let[(x % 35) + 1]);
        x = Math.floor(x/35);
    }

    return result.join('');
}

function id_maker(type) {
    const type_bit = 4;
    const partner_bit = 7;
    const region_bit = 8;
    
    var type_bin = type.toString(2);
    
    return type_bin;

}

/*

id_maker <- function(type, partner, region){
  # makes a unique 12 digit, base 36 ID
  # type, partner, region are all int, returns a string
  
  # makes string without parity bit
  bin_str <- paste("0", 
                   intToBin(type, 4), 
                   intToBin(partner, 7), 
                   intToBin(region, 8), sep = "")
  
  sum_bin_str <- sum(as.numeric(strsplit(bin_str, "")[[1]]))
  
  # adds partiy bit to end
  if((sum_bin_str %% 2) == 0) {
    parity_bit <- 1
  } else {
    parity_bit <- 0
  }
  
  bin_str <- paste(bin_str, parity_bit, sep="")
  
  # encodes type, partner, region in 4 digit base 36
  encode <- intToBase35p1(convert(bin_str, base=2L))
  
  # converts time to num
  time_num <- format(round(as.numeric(Sys.time())*1000, 13), scientific = FALSE)

  # converts time_num to 8 digit base 36
  time_id <- intToBase35p1(convert(time_num, base=10L))
  
  return(paste(encode, time_id, sep="-"))
}
*/
console.log(id_maker(100));