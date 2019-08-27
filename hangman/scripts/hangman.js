
/**
 * Enum defining the length of words to guess and the category based on each length
 */
const GuessCountTypes = {
    EASY : {wordLength: 5, retryAttempts: 3},
    MEDIUM : {wordLength: 10, retryAttempts: 5},
    HARD : {wordLength: 15, retryAttempts: 7},
    VERYHARD : {wordLength: 99, retryAttempts: 10}
}

/**
 * Default class to encapsulate any word.
 * The HangmanWord class extends this class for the hangman game
 */
class Word {
    constructor (_word)
    {
        this.word = _word.toLowerCase().split("")
    }
}

class HangmanWord extends Word {

    /**
     * Constructor for HangmanWord game.
     * Initializes all variables to start the game
     * @param {Word to guess} _word 
     * @param {# of tries to guess} _guesscount 
     */
    constructor (_word, _guesscount) 
    {
        super(_word)
        
        this.guessedWord = _word.toLowerCase()
        this.solvedWord = _word.toLowerCase()
        this.defaultletters = [' ','.',';','?','-','_','/','\\','\,']
        this.guessedLetters = []
        this.allGuessedLetters = this.defaultletters.concat(this.guessedLetters)
        this.guessCount = _guesscount       
    }

    static InitializeHangmanWordUsingInternalDict()
    {
        let _wordsList = []

        try {
            const wordsListJSON = localStorage.getItem('hangmanWordsList')
            _wordsList = JSON.parse(wordsListJSON)  
        }
        catch (e) {
            _wordsList = defaultWordsList
        }

        
        // Gets a random word to use for this game
        let pos = Math.floor(Math.random() * _wordsList.length)
        const wordObj = _wordsList[pos]   

        return wordObj;
    }

    /**
     * Initialize the HangmanWord class game with a word to guess
     * @param {Determines which dictionary to use to initialize the hangman word; USE_INTERNAL_DICT or USE_HTTP_SERVICE} InitializeType 
     * @param {Callback function to run once we receive the WordObj} callback 
     */
    static async InitializeHangmanWordUsingService() 
    {          
        const response = await fetch('https://puzzle.mead.io/puzzle');
        if (response.status === 200) {
            return response.json();
        }
        else {
            throw new Error(`Unable to get proper response: ${response.status} Error`);
        }
    }

    /**
     * Create as HangmanWord Object from the JSON response received.
     * @param {The parsed JSON response we get back from the service} responseJSON 
     */
    static CreateWordObject(responseJSON)
    {
        const data = responseJSON
        const puzzleWord = data["puzzle"]
        let guessCount = 0
        if (puzzleWord.length < GuessCountTypes.EASY['wordLength'])
        {
            guessCount = GuessCountTypes.EASY['retryAttempts']
        }
        else if (puzzleWord.length >= GuessCountTypes.EASY['wordLength'] && puzzleWord.length < GuessCountTypes.MEDIUM['wordLength'])
        {
            guessCount = GuessCountTypes.MEDIUM['retryAttempts']
        } 
        else if (puzzleWord.length >= GuessCountTypes.MEDIUM['wordLength'] && puzzleWord.length < GuessCountTypes.HARD['wordLength'])
        {
            guessCount = GuessCountTypes.HARD['retryAttempts']
        }
        else 
        {
            guessCount = GuessCountTypes.VERYHARD['retryAttempts']
        }

        const wordObj = {
            word : puzzleWord,
            guessCount : guessCount
        }

        return wordObj
    }


    /**
     * Returns all guessed characters (including default letters which shouldnt be rendered)
     */
    getAllGuessedLetters () 
    {
        this.allGuessedLetters = this.defaultletters.concat(this.guessedLetters)
        return this.allGuessedLetters
    }

    /**
     * Returns all guessed characters by the player (mins the default internal letters)
     */
    getGuessedLetters() { 
        return this.guessedLetters
    }

    /**
     * Returns the number of guesses left
     */
    getGuessCount() {
        return this.guessCount
    }

    /**
     * Uses up a guessCount
     */
    useAvailableGuessCount() {
        this.guessCount--

        if (this.guessCount>0)
        {
            return true
        }
        else
        {
            this.guessCount = 0
            return false
        }
    }
   
    /**
     * Checks if a letter is already guessed
     * @param {letter to check if already guessed} val 
     */
    isAlreadyGuessed(val) {
        return this.getGuessedLetters().includes(val)
    }

    /**
     * Updates the list of guessed letters
     */
    updateGuessedLetters() {
        this.allGuessedLetters = this.defaultletters.concat(this.guessedLetters)
    }

    /**
     * Adds a guessed letter
     * @param {letter to add} letter 
     */
    addGuessedLetter(letter) {
        this.guessedLetters.push(letter)
        this.updateGuessedLetters()
    }

    /**
     * Returns the current guessed word(s) including guessed and missing letters
     */
    getHangmanWord() {
        this.guessedWord = this.solvedWord
        this.word.forEach((letter) => {
            if (this.getAllGuessedLetters().indexOf(letter) === -1)
            {
                this.guessedWord = this.guessedWord.replace(letter, "*")
            }        
        });

        return this.guessedWord
    }

}

// Game over flag
let gameOverFlag = false

// Grab the div elements where we render the hangman word to guess
const wordPlacementEl = document.querySelector('#wordToGuess')
// Grab the element to render # of tries left
const triesLeftEl = document.querySelector('#triesLeft')
// Grab the element where we display game messages
const messageEl = document.querySelector('#message')
// Grab the element where we displayed the guessed letter
const displayGuessedLetterEl = document.querySelector('#letterGuessed')
// Grab the retry button element
const retryButtonEl = document.querySelector('#retryButton')

// Gets a random word to use for this game
// let pos = Math.floor(Math.random() * wordList.length)
let game = null
let wordObj = null

// Uses a static method in the HangmanWord class to initialize a random Hangman word
HangmanWord.InitializeHangmanWordUsingService().then((responseJSON) => {
        const wordObj = HangmanWord.CreateWordObject(responseJSON)        
        game = new HangmanWord(wordObj['word'], wordObj['guessCount'])
        renderHangmanWord(game)
    }).catch((err) => {
        console.log(`Error: ${err}`)
    })

/**
 * Displays a custom message
 * @param {message to display} str 
 */
const displayMessage = (str) => {
    messageEl.innerHTML = ''

    // create and display the message to display
    const messageWordsEl = document.createElement('span')
    messageWordsEl.className = "messageWords"
    messageWordsEl.textContent = str
    messageEl.appendChild(messageWordsEl)
}


/**
 * Displays the entered letter
 * @param {letter to display} letter 
 */
const updateDisplayGuessedLetter = (_letter) => {
    displayGuessedLetterEl.innerHTML = ''
    // Create the display element tag  element 
    const displayLetterEl = document.createElement('b')
    displayLetterEl.textContent = _letter

    displayGuessedLetterEl.appendChild(displayLetterEl)
}


/**
 * Renders the current word to guess
 * @param {current hangman game object} _game 
 */
const renderHangmanWord = (_game) => {
    wordPlacementEl.innerHTML = ''
    triesLeftEl.innerHTML = ''

    // Now create hangman word element
    const hangmanWordEl = document.createElement('span')
    hangmanWordEl.className = "hangmanWord"
    hangmanWordEl.textContent = _game.getHangmanWord()

    // Create the tries left element 
    const hangmanTriesLeftEl = document.createElement('span')
    hangmanTriesLeftEl.className = "triesLeft"
    hangmanTriesLeftEl.textContent = _game.getGuessCount()

    wordPlacementEl.appendChild(hangmanWordEl)
    triesLeftEl.appendChild(hangmanTriesLeftEl)
}

/**
 * Compares 2 strings and returns true if they are the same
 * @param {string 1} a 
 * @param {string 2} b 
 */
const strcmp = (a, b) => (a<b?false:(a>b?false:true))

// Add an event listener for the retry button to restart the game
retryButtonEl.addEventListener('click', (e) => {
    location.reload()
})


/**
 * Add event listener to see if a new letter is added
 */
window.addEventListener('keypress', (e) => {

    // 1. Check if letter already guessed, if not, add to guessed letter array
    // 2. If not valid letter, then decrement tries left counter
    // 2. Render guessed word and tries left counter
    let guessedLetter = String.fromCharCode(e.charCode)
    updateDisplayGuessedLetter(guessedLetter)


    // First check if the game is over. If so, return
    if(gameOverFlag)
    {
        guessedLetter = ''
        updateDisplayGuessedLetter(guessedLetter)
        return
    }
 
    /**
     * If the game is not over, then check if the selected letter has already been guessed
     */
    if(game.isAlreadyGuessed(guessedLetter))
    {
        // Comment that the character is already guessed
        displayMessage(`The letter '${guessedLetter}' has already been guessed`)
    }
    else // If it is a new guessed letter,...
    {
        // Add character to the list of guessed letters
        game.addGuessedLetter(guessedLetter)
        
        // check to see if the guessed letter a valid letter or not.
        if (!game.solvedWord.includes(guessedLetter))
        {
            // Use an available guess count if the letter is not in the word(s) to guess
            if(game.useAvailableGuessCount())
            {
                displayMessage(`The letter '${guessedLetter}' is not in the word(s).\n${game.guessCount} tries left.`)
            }
            else // You have used up all available guess counts, game over!
            {
                displayMessage('You failed! Game over!!')
                game.guessedLetters = game.solvedWord.toLowerCase().split("")
                gameOverFlag = true
                retryButtonEl.disabled = false
            }
        }
    }

    // render the word(s) to guess with filled out and missing letters (*)
    renderHangmanWord(game)
    
    // Check to see if the guessed word is the same as the actual word. If it is, then you have solved the puzzle
    if (strcmp(game.guessedWord, game.solvedWord) && game.guessCount > 0)
    {
        displayMessage('Congratulations! You found the word(s)!')
        gameOverFlag = true
        retryButtonEl.disabled = false
    }

})
