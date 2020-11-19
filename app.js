/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'When Diogenese saw a boy use his hands to drink water, he:',
      answers: [
        'Gave the boy a cup',
        'Walked away like a normal person',
        'Threw away his wooden bowl and used his hands too',
        'Also drank some water'
      ],
      correctAnswer: 'Threw away his wooden bowl and used his hands too'
    },
    {
      question: 'What great leader said he wanted to be Diogenese?',
      answers: [
        'Cyrus The Great',
        'Julius Caesar',
        'The Burger King',
        'Alexander The Great'
      ],
      correctAnswer: 'Alexander The Great'
    },
    {
      question: "When Diogenese's town was attacked and everyone started panicking, Diogenese:",
      answers: [
        'Rolled a rock up and down a hill',
        'Also started panicking',
        'Packed his things and ran',
        'Wet himself'
      ],
      correctAnswer: 'Rolled a rock up and down a hill'
    },
    {
      question: 'What famous philosopher did Diogenese completely embarrass in a debate?',
      answers: [
        'Plato',
        '2pac',
        'Aristotle',
        'Socrates'
      ],
      correctAnswer: 'Plato'
    },
    {
      question: 'Diogenese is the father of what philosophy?',
      answers: [
        'YOLO',
        'Cynicism',
        'Optimism',
        'Nihilism'
      ],
      correctAnswer: 'Cynicism'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

let finalScore = 0

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function generateMainPage() {
  return `
    <div class="mainPage">
      <h2>Diogenese The Dog</h2>
      <h4>This is my quiz on the most insane philisopher who ever lived. This is all true</h4>
      <button id="startQuiz">Start Quiz</button>
    </div>
    `
}



function generateQuestion(number) {
  let question = store.questions[store.questionNumber]
  return `
    <div class="mainPage">
      <h2>${question.question}</h2>
        <ul class="answers">
          <li>
            <input type="radio" id="answer1" name="a" value="${question.answers[0]}" required>
            <label for="answer1">${question.answers[0]}</label><br>
          </li>
          <li>
            <input type="radio" id="answer2" name="a" value="${question.answers[1]}" required>
            <label for="answer2">${question.answers[1]}</label><br>
          </li>
          <li>
            <input type="radio" id="answer3" name="a" value="${question.answers[2]}" required>
            <label for="answer3">${question.answers[2]}</label><br>
          </li>
          <li>
            <input type="radio" id="answer4" name="a" value="${question.answers[3]}" required>
            <label for="answer4">${question.answers[3]}</label><br>
          </li>
        </ul>
      <button id="check">Check Answer</button>
    </div>
    `
}

function correct() {
  finalScore += 1
  return `
    <div class="correct">
      <h2>Congrats You Got It Right!</h2>
      <h5>The correct answer is "${store.questions[store.questionNumber].correctAnswer}."</h5>
      <button class="button" id="next">Next Question</button>
    </div
  `
}

function incorrect() {
  return `
    <div class="incorrect">
      <h2>Oof Better Luck Next Time Bud :(</h2>
      <h5>The correct answer is "${store.questions[store.questionNumber].correctAnswer}."</h5>
      <button class="button" id="next">Next Question</button>
    </div
  `
}

function renderFinalPage() {
  return `
  <div class="mainPage">
    <h2>Congrats you made it through the quiz!</h2>
    <h5>You got ${finalScore}/${store.questions.length} questions correct!</h5>
    <form id="submit">
      <input class="button" type="submit" value="Restart test">
    </form>
  </div>
  `
}

function status() {
  $('.status').html(`Question Number: ${(store.questionNumber + 1)}/${store.questions.length}<br> Your Score Is: ${finalScore}/${store.questions.length}`)
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function checkAnswer() {
  let html = ""
  let input = $("input[name = a]:checked").val()
  if (!input) {
    $('main').append(`<h4>Please select an answer</h4>`)
    return
  }
  if (store.questions[store.questionNumber].correctAnswer == input) {
    html = correct()
  } else {
    html = incorrect()
  }
  $('main').html(html)
}

function finalCheck() {
  html = renderFinalPage()
  $('main').html(html)
}

function main() {
  $("header").append(`<h4 class="status"></h4>`)
  handleStartQuiz()
  getQuestion()
  handleRestartQuiz()
  render()
}

function render() {
  let html = ''
    if (store.quizStarted === false) {
      html = generateMainPage()
    }else {
      html = generateQuestion()
    }
  $('main').html(html)
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartQuiz() {
  $('main').on('click', '#startQuiz', function(evt) {
    store.quizStarted = true
    status()
    render()
  })
}

function handleRestartQuiz() {
  $('#submit').submit(function(event) {
  })
}

function getQuestion() {
  $('main').on('click', '#next', function(event){
    let number = store.questionNumber++
    if (store.questionNumber == store.questions.length) {
      finalCheck()
      
    }
    else {
      generateQuestion(number)
      status()
      render()
    }
  })
  $('main').on('click', '#check', function(event){
    checkAnswer()
  })
}



main()
