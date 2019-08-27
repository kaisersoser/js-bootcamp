const Person = function (firstname, lastname, age, likes) {
    this.firstName = firstname
    this.lastName = lastname
    this.age = age
    this.likes = likes
}

Person.prototype.getBio = function() {
    let bio = `My Name is ${me.firstName} ${me.lastName} and I am ${me.age} years old.\n`
    
    this.likes.forEach((like) => {
        bio += ` ${this.firstName} likes ${like}.`
    });
    return bio
}

Person.prototype.setName = function(fullName) {
    let _fullName = fullName.split(' ')
    this.firstName = _fullName[0]
    this.lastName = _fullName[1]
}

const me = new Person('Charles', 'Vogt', 46, ['Programming', 'Gaming', 'Walking'])
console.log(me.getBio())

me.setName('Raphael Vogt')
console.log(me.getBio())
