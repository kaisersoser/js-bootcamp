// Get the Note Title and Body elements
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
let createdAtTimeStamp = null
let updatedAtTimeStamp = null

// Retrieve the note identifier from the hash
const noteId = location.hash.substring(1)
// load the saved notes
let notes = getSavedNotes()
let note = null


/**
 * Finds the note using the specified NoteID and sets the title and body elements with the note values
 * @param {noteID to search for} noteId 
 */
const getNoteInfo = (_noteId) => {
    // Get the note for this noteId
    note = notes.find((note) => note.id === _noteId)

    // If we dont find a note for this ID, return to the home page

    if (!note)
    {
        location.assign('/index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body

    // Save the createdAt & updatedAt timestamps
    createdAtTimeStamp = note.createdAt
    updatedAtTimeStamp = note.updatedAt
}

// Update the Note fields using the Note ID
getNoteInfo(noteId)
lastEditedInfoEl = document.querySelector('#lastEdited')
lastEditedInfoTextEl = document.createElement('span')
lastEditedInfoTextEl.textContent = generateLastEdited(note.updatedAt) // `last edited ${moment(note.updatedAt).fromNow()}`
lastEditedInfoEl.appendChild(lastEditedInfoTextEl)


document.querySelector('#remove-note').addEventListener('click', (e) => {    
    removeNote(note.id)    
})
    

document.querySelector('#editNote-form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    note.title = document.querySelector('#note-title').value
    note.body = document.querySelector('#note-body').value
    
    // Created at timestamp remains the same but we update the updatedAt timestamp
    note.createdAt = createdAtTimeStamp
    note.updatedAt = moment().valueOf()
    
    if(note.title.length > 0)
    {
        saveNotes(notes)
        location.assign('/index.html')
    } else {
        alert('You must provide a valid title')
    }
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes')
    {
        // Get the note for this noteId
        notes = getSavedNotes()
        note = notes.find((note) => note.id === noteId)

        if (!note)
        {
            location.assign('/index.html')
        }

        notes = JSON.parse(e.newValue)
        getNoteInfo(noteId)
    }
})
