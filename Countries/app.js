const renderCountry = (data) => {
    const countryObject = document.querySelector('#countryObj')
    const countryCode = document.querySelector('#countryCode')
    const countryName = document.querySelector('#countryName')

    countryObject.style.display = 'block'
    countryCode.innerHTML = ''
    countryName.innerHTML = ''

    const countryCodeEl = document.createElement('span')
    countryCodeEl.textContent = data[0].alpha3Code
    countryCode.appendChild(countryCodeEl)

    const countryNameEl = document.createElement('span')
    countryNameEl.textContent = data[0].name
    countryName.appendChild(countryNameEl)
}

/**
 * Returns a JSON Object (Promise object) defining the country object result
 * @param {Country Code to use in search} countryCode 
 */
const getCountryByCode = (countryCode) => {
    return fetch(`https://restcountries.eu/rest/v2/alpha?codes=${countryCode}`).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error(`Unable to get proper response: ${response.status} Error`)
        }
    })
}

/**
 * Add event listener to search field
 * Searches for a country by its country code (typed into the search field)
 */
document.getElementById("c_code").addEventListener("change", (e) => {

    getCountryByCode(e.target.value).then((country) => {
        renderCountry(country)
    }).catch((err) => {
        console.log(`Error: ${err}`)
    })

})
