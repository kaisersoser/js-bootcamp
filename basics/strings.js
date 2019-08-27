let address1 = "2050 rue chomedey"
let address2 = "Apt 5"
let city = "Montreal"
let state_province = "Quebec"
let zip_postalcode = "H3H 2A9"
let country = "Canada"
let seperator = ", "

let fulladdress = address1.concat(seperator).concat(address2).concat(seperator).concat(city).concat(seperator).concat(state_province).concat(" ").concat(zip_postalcode).concat(seperator).concat(country)


console.log("%s", fulladdress)