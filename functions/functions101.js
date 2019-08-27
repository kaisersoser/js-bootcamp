let celciusToFahrenheit = function(temparatureInCelcius) {
    if(temparatureInCelcius === undefined)
    {
        console.log("You must provide a valid temperature, the variable 'currentTempInCelcius' is %d", temparatureInCelcius)
        return
    }

    return (temparatureInCelcius*1.8)+32
}

let currentTempInCelcius
console.log("%d degrees celcius is %d degrees fahrenheit", currentTempInCelcius, celciusToFahrenheit(currentTempInCelcius))