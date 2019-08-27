let resturant = {
    name: 'ASB',
    guestCapacity: 75,
    guestCount: 0,
    checkAvailability: function(partySize) {
        let seatsLeft = this.guestCapacity -this.guestCount
        return partySize <= seatsLeft
    },
    seatParty: function(partySize) {
        this.guestCount+=partySize
    },
    removeParty: function(partySize) {
        this.guestCount-=partySize
    }
}


resturant.seatParty(73)
console.log(resturant.checkAvailability(4))
resturant.removeParty(5)
console.log(resturant.checkAvailability(4))