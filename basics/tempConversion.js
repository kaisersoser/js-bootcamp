let tempInCelcius = 35

function CelciusToFahrenheit(temp)
{
    return (temp*1.8)+32
}

function CelciusToKelvin(temp)
{
    return (temp+273.15)
}

function KelvinToCelcius(temp)
{
    return (temp - 273.15)
}

function FahrenheitToCelcius(temp)
{
    return (temp-32) * (5/9)
}

console.log("Temperature in Celcius:%s ", tempInCelcius)
console.log("Temperature in Fahrenheit:%s", CelciusToFahrenheit(tempInCelcius))
console.log("Temperature in Kelvin:%s", CelciusToKelvin(tempInCelcius))

if (tempInCelcius<= 0)
{
    console.log("Its freezing!!! Brrrrrr ")
}
else if (tempInCelcius>0 && tempInCelcius<=10)
{
    console.log("Its cold!!!")
}
else if (tempInCelcius>10 && tempInCelcius<=20)
{
    console.log("Its a bit chilly!!!")
}
else if (tempInCelcius>20 && tempInCelcius<=30)
{
    console.log("Its warm!!!")
}
else
{
    console.log("Feeling HOT HOT HOT!!!")
}



