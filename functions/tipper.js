const createTipper = (tipRate) => {
    return (amount) => {
        return tipRate * amount
    }
}

const tip15pct = createTipper(0.15)
const tip20pct = createTipper(0.20)
const tip25pct = createTipper(0.25)

console.log(tip15pct(100))
console.log(tip20pct(100))
console.log(tip25pct(100))