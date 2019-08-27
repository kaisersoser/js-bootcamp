let a = 4
let b = 10
let c = -7

function quad_formular(a, b, c)
{
    return  (-b + (Math.sqrt(Math.pow(b,2))) - (4*a*c)) / (2*a)
}

function quad_eq(a, b, c, x)
{
    return  (a*Math.pow(x,2)) + (b*x) + c
}


let x = quad_formular(a,b,c) 
let y = quad_eq(a,b,c,x)

console.log("Solving for x:%d", x)
console.log("Solving for y:%d", y)
