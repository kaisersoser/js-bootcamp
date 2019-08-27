'use strict'

const tempCelciusElement = document.querySelector('#tempCelcius')
const tempFahrenheitElement = document.querySelector('#tempFahrenheit')
const tempKelvinElement = document.querySelector('#tempKelvin')

const errCelciusLabel = document.querySelector('#errorMsgCelcius')
const errFahrenheitLabel = document.querySelector('#errorMsgFahrenheit')
const errKelvinLabel = document.querySelector('#errorMsgKelvin')

const TempTypes = {
	"CELCIUS":1, 
	"FAHRENHEIT":2, 
	"KELVIN":3
}

/**
 * Add event listener to see if we need to hid finished todo items
 */
tempCelciusElement.addEventListener('change', (e) => {
	refreshErrMsgs()

	if (isNaN(tempCelciusElement.value)) {
		errCelciusLabel.textContent = `Celius must be a number!`
	}
	else {
		convertTemp(TempTypes.CELCIUS)
	}
})

tempFahrenheitElement.addEventListener('change', (e) => {
	refreshErrMsgs()

	if (isNaN(tempFahrenheitElement.value)) {
		errFahrenheitLabel.textContent = `Fahrenheit must be a number!`
	}
	else {
		convertTemp(TempTypes.FAHRENHEIT)
	}
})


tempKelvinElement.addEventListener('change', (e) => {
	refreshErrMsgs()

	if (tempKelvinElement === 'number') {
		errKelvinLabel.textContent = `Kelvin must be a number!`
	}
	else {
		convertTemp(TempTypes.KELVIN)
	}
})


const CelciusToFahrenheit = (temp) => (temp*1.8)+32
const CelciusToKelvin = (temp) => (temp*1)+273.15
const KelvinToCelcius = (temp) => (temp*1)-273.15
const KelvinToFahrenheit = (temp) => ((9/5)*temp) - 459.67
const FahrenheitToCelcius = (temp) => (temp-32) * (5/9)
const FahrenheitToKelvin = (temp) => (temp-32)/1.8 + 273.15

const refreshErrMsgs = () => {
	errCelciusLabel.textContent = ''
	errFahrenheitLabel.textContent = ''
	errKelvinLabel.textContent = ''
}

/**
 * Function to convert temperatures and update fields with the right values
 * @param {The temperature to convert} tempType 
 */
const convertTemp = (tempType) => {
	if(tempType === TempTypes.CELCIUS)
	{
		tempFahrenheitElement.value = CelciusToFahrenheit(tempCelciusElement.value)
		tempKelvinElement.value = CelciusToKelvin(tempCelciusElement.value)
	}
	else if (tempType === TempTypes.FAHRENHEIT)
	{
		tempCelciusElement.value = FahrenheitToCelcius(tempFahrenheitElement.value)
		tempKelvinElement.value = FahrenheitToKelvin(tempFahrenheitElement.value)
	}
	else if (tempType === TempTypes.KELVIN)
	{
		tempCelciusElement.value = KelvinToCelcius(tempKelvinElement.value)
		tempFahrenheitElement.value = KelvinToFahrenheit(tempKelvinElement.value)
	}
}