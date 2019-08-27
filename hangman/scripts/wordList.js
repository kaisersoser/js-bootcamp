const defaultWordsList = [
    {
        word: 'application',
        guessCount: 5
    },
    {
        word: 'cat in the hat',
        guessCount: 6
    }, 
    {
        word: 'obnoxious',
        guessCount: 6
    },
    {
        word: 'cat',
        guessCount: 4
    },
    {
        word: 'javascript',
        guessCount: 5
    },
    {
        word: 'paris',
        guessCount: 4
    },
    {
        word: 'financial',
        guessCount: 5
    },
    {
        word: "indigineous",
        guessCount: 5
    }, 
    {
        word: 'a stitch in time, saves 9',
        guessCount: 7
    },
    {
        word: 'under the sea',
        guessCount: 6
    },
    {
        word: 'supercalifragilisticexpialidocious',
        guessCount: 10
    },
    {
        word: 'individual',
        guessCount: 5
    },
    {
        word: 'airplane',
        guessCount: 4
    },
    {
        word: 'asparagus',
        guessCount: 4 
    },
    {
        word: 'roblox',
        guessCount: 4
    },
    {
        word: 'reflection',
        guessCount: 5
    },
    {
        word: 'abracadabra',
        guessCount: 4
    },
    {
        word: 'polite',
        guessCount: 4
    },
    {
        word: 'new jersey',
        guessCount: 4
    },
    {
        word: 'planet',
        guessCount: 4
    }
]

localStorage.setItem('hangmanWordsList', JSON.stringify(defaultWordsList))