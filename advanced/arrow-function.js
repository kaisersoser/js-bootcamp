const people = [{
    Name: 'Charles',
    Age: 46
},
{
    Name: 'Raphael',
    Age: 9
},
{
    Name: 'Michel',
    Age: 76
}]

const square = (num) => num * num


const squareLong = (num) => {
    return num * num
}

function filterByAge(age) 
{
    return people.filter((person) => person.Age < age)
} 

console.log(square(5))
console.log(filterByAge(50))