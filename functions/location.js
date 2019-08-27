const ipInfoToken = 'b376d401ce5c8e'
const fetch = require("node-fetch");


const getLocation = async () => {
    const response = await fetch(`http://ipinfo.io/json?token=${ipInfoToken}`);
    if (response.status === 200) {
        return response.json()
    }
    else {
        throw new Error(`Unable to get proper response: ${response.status} Error`);
    }
}

/**
 * Returns a JSON Object (Promise object) defining the country object result
 * @param {Country Code to use in search} countryCode 
 */
const getCountryByCode = async (countryCode) => {
    const response = await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${countryCode}`);
        if (response.status === 200) {
            const parsedResponse = await response.json()
            return parsedResponse[0]            
        } else {
            throw new Error(`Unable to get proper response: ${response.status} Error`)
        }    
}

/**
 * Calls 2 different async services and returns a string with the country details
 */
const getLocationDetails = async () => {
    try {
        const location = await getLocation()
        const country = await getCountryByCode(location.country)
        return `You are in the city of ${location.city}, in the region of ${location.region} and the country of ${country.name}`    
    } catch (err)
    {
        throw err
    }
}
    

// Uses a static method in the HangmanWord class to initialize a random Hangman word
getLocationDetails().then((locationDetails) => {        
    console.log(locationDetails)    
}).catch((err) => {
    console.log(`Error: ${err}`)
})