'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#note-form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    let _noteTitle = e.target.elements.noteTitle.value
    let _noteBody = e.target.elements.noteBody.value
    let note = null

    if(_noteTitle.length > 0)
    {
        const timeStamp = moment().valueOf()

        note = {
            id: uuidv4(),
            title: _noteTitle,
            body: _noteBody,
            createdAt: timeStamp,
            updatedAt: timeStamp
        }
        notes.push(note)
    
        saveNotes(notes)
        //renderNotes(notes, filters)
        location.assign(`/editNote.html#${note.id}`)

    } else {
        alert('You must provide a valid title')
    }
})


document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes')
    {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

