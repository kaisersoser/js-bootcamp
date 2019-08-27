const notes = ["Note 1", "Note 2", "Note 3"]

console.log(notes)
console.log(notes.length)
console.log(notes[1])

notes.forEach(function(item, index){
    console.log("%s: %s", index, item)
})


for(let count=0; count<notes.length; count++)
{
    console.log(notes[count])    
}