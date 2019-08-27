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

function ConvertCelciusToFahrenheitAndKelvin(temp)
{
    if (temp === undefined || temp === null)
    {
        console.log(`You must provide a valid temperature in Celcius...:${temp} is invalid`)
        return
    }

    return {
        tempInCelcius: `${Number(temp)} degrees Celcius which is`,
        tempInFahrenheit: `${CelciusToFahrenheit(Number(temp))} degrees Fahrenheit and`,
        tempInKelvin: `${CelciusToKelvin(Number(temp))} degrees Kelvin`
    }
}


var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What is the current temprature in Celcius? ", function(answer) {
  // TODO: Log the answer in a database
  let answers = ConvertCelciusToFahrenheitAndKelvin(answer)
  console.log("The temprature is %s %s %s :", answers.tempInCelcius, answers.tempInFahrenheit, answers.tempInKelvin);

  rl.close();
});