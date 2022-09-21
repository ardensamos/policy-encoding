# policy-encoding

##Purpose 
To generate and decode policy numbers based on a given set of type, partner, and region

##Helper Functions <a name='Helper Functions'></a>
###`sumStr()`
Utilized for encoding and decoding policy numbers. Takes in said policy number to validate parity by summing binary digits. 

###`bin_length_helper()`
Appends the necessary number of `0` to the front of binary strings to ensure correct bit length. Takes in string parameter and the bit length.

###`intToBase35p1()`
Converts a binary base 10 policy number into a base 35 length. The returned number will be of parameter length.

###`base35_to_int()`
Converts a number in modified base 35 to base 10.

##Primary Functions
###`id_encoder()`
Generates a unique policy number based on parameters type, partner, and region values. 
<br>
The function creates the necessary bit length for said individual parameters by utilizing the `bin_length_helper()` function. Variable `bin_str` creates a master binary string of parameters and adds the odd bit parity to the end of the master string. It is then converted to a modified base 35 bit using the `intToBase35p1()` function and assigned to variable `encode`.
<br>
The variable `time_encode` is created by utilizing the `intToBase35p1()` function. Used to add a unique millisecond time identifier to the end of the policy number.

###`id_decoder()`
Takes a policy number and decodes it by identifying the type, partner, and region values
<br>
The function splits the policy number by the policy and time portions. Values located to the left of the hyphen represent the policy portion. The time portion is currently not being used. 
<br>
Converts the encoded policy portion from base 35 to base 2 by utilizing the `base35_to_int` function. Leading zeros are then appended to the base 2 policy portion by utilizing the `bin_length_helper` function. This ensures a standard length is created to equate the length of the type, partner, region, and parity bit. 
<br>
If the modified policy portion is validated against the parity (sum of digits equate an odd value), then decoding begins. 

#Live Site 
Test site: https://ardensamos.github.io/policy-encoding/- [policy-encoding](#policy-encoding)
