let myBook = {
    title: '1984',
    author: "George Orwell",
    pageCount: 326
}

let myOtherBook = {
    title: 'A Peoples History of the US',
    author: "Howard Zinn",
    pageCount: 723
}

function getSummary(_book)
{
    return {
        summary: `${_book.title} by ${_book.author}`,
        pageCountSummary: `${_book.title} has ${_book.pageCount} pages` 
    }
}

let bookSummary = getSummary(myBook)
let otherBookSummary = getSummary(myOtherBook)

console.log(bookSummary.summary)
console.log(bookSummary.pageCountSummary)