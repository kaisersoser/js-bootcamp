'use strict'

/**
 * Loads notes from local storage
 */
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return (notesJSON) ? JSON.parse(notesJSON) :  []    
    }
    catch (e)
    {
        return []
    }    
}

/**
 * Generates a note paragraph to render to the dom
 * @param {Title of note} title 
 * @param {Body of note} body 
 */
const generateNote = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    // const button = document.createElement('button')
    const statusEl = document.createElement('p')

    // button.textContent = 'x'
    // button.addEventListener('click', (e) => {
    //     removeNote(note.id)
    // })

    noteEl.setAttribute('href', `/editNote.html#${note.id}`)
    noteEl.classList.add('list-item')
    
    // The classname is important because it is used in removeAllNotes() to remove all notes
    // For now, the note claass is set to 'note'
    textEl.classList.add('list-item__title')
    textEl.textContent = " " + note.title + " : " + note.body + " "

    // Setup status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    //noteEl.appendChild(button)
    noteEl.appendChild(textEl)
    noteEl.appendChild(statusEl)

    return noteEl
}

/**
 * Generates and returns the last edited statement
 * @param {pass in note.updatedAt} noteInfo 
 */
const generateLastEdited = (noteInfo) => `last edited ${moment(noteInfo).fromNow()}`

/**
 * Sort the Notes using the sortBy filter type
 * @param {notes array} notes 
 * @param {sort filter type} sortBy 
 */
const sortNotes = (notes, sortBy) => {

    if (sortBy === 'byEdited') // Sort using updatedAt
    {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }

        })
    }
    else if (sortBy === 'byCreated')  // Sort using updatedAt
    {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }

        })
    }
    else // Sort alphabetically
    {
        return notes.sort((a, b) => {
            if (a.title > b.title) {
                return -1
            } else if (a.title < b.title) {
                return 1
            } else {
                return 0
            }

        })
    }

}

/**
 * Renders the application notes
 * @param {Notes object} notes 
 * @param {search filters to select only searched notes} filters 
 */
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    

    document.querySelector('#notes').innerHTML = ''

    if(filteredNotes.length > 0)
    {
        filteredNotes.forEach( (note) => {
            let noteElement = generateNote(note)
            document.querySelector('#notes').appendChild(noteElement)
        })
    }
    else{
        const noteEl = document.createElement('div')
        const textEl = document.createElement('p')
    
        // The classname is important because it is used in removeAllNotes() to remove all notes
        // For now, the note claass is set to 'note'
        textEl.className = "note"
        textEl.textContent = "No notes to show."
        noteEl.classList.add("empty-message")
        noteEl.appendChild(textEl)
    
        document.querySelector('#notes').appendChild(noteEl)
    }

}

/**
 * Saves the current note object to localStorage
 */
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

/**
 * Removes a specific note using the Note ID
 * @param {*} id 
 */
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex >= 0) {
        notes.splice(noteIndex, 1)

        saveNotes(notes)
        renderNotes(notes, filters)
    }
}

/**
 * Removes all notes in the list
 */
const removeAllNotes = () => {
    document.querySelectorAll('.note').forEach((note) => {
        note.remove()
    })

    localStorage.clear()
}

/**
 * Searches for a todo item
 * @param {search filter value} el 
 */
const searchChanged = (el) => {
    filters.searchText = el.value
    renderNotes(notes, filters)
}
