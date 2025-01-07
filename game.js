
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0 
let availableQuestions = []

let questions = [
    {
        question: 'What is the capital of Wisconsin?',
        choice1: 'Washington DC',
        choice2: 'Madison',
        choice3: 'Seattle',
        choice4: 'New York',
        answer: '2'
    },
    {
        question: "What was your first pet's name?",
        choice1: 'Milkshake',
        choice2: 'Skip',
        choice3: 'Waffles',
        choice4: 'Tuffy',
        answer: '4'
    },
    {
        question: 'What was your first phone?',
        choice1: 'Razor',
        choice2: 'Chocolate',
        choice3: 'Nokia',
        choice4: 'Blackberry',
        answer: '1'
    },
    {
        question: 'What color was my childhood house?',
        choice1: 'Blue',
        choice2: 'Brown',
        choice3: 'Yellow',
        choice4: 'Red',
        answer: '3'
    },
    {
        question: 'Where were you born?',
        choice1: 'Germantown',
        choice2: 'Menomonee Falls',
        choice3: 'Grafton',
        choice4: 'Milwaukee',
        answer: '2'
    },
    {
        question: "What is your mom's name?",
        choice1: 'Tracy',
        choice2: 'Karen',
        choice3: 'Kelly',
        choice4: 'Kathy',
        answer: '4'
    },
    {
        question: 'What was the first sport you played?',
        choice1: 'Track',
        choice2: 'Swimming',
        choice3: 'Soccer',
        choice4: 'Basketball',
        answer: '3'
    },
    {
        question: 'What color are your eyes?',
        choice1: 'Brown',
        choice2: 'Black',
        choice3: 'Green',
        choice4: 'Blue',
        answer: '1'
    },
    {
        question: 'What bad habit do you have?',
        choice1: 'Pull hair',
        choice2: 'Bite nails',
        choice3: 'Crack knuckles',
        choice4: 'Itch balls',
        answer: '2'
    },
    {
        question: 'Why is a year 365 days?',
        choice1: 'Earth orbits Sun',
        choice2: 'Sun orbits Earth',
        choice3: 'Earth rotates once',
        choice4: 'Eclipes occurs',
        answer: '1'
    },
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

function startGame(){
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    //progress bar
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    // end progress bar

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()