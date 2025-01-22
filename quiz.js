const questions = [
  {
    question: "Which HTML element is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: 1
  },
  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"],
    correctAnswer: 1
  },
  {
    question: "Which JavaScript method is used to add an element at the end of an array?",
    options: ["push()", "append()", "add()", "insert()"],
    correctAnswer: 0
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    options: ["<h1>", "<heading>", "<head>", "<h6>"],
    correctAnswer: 0
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "font-color", "color", "text-style"],
    correctAnswer: 2
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    options: ["var colors = (1:'red', 2:'blue')", "var colors = ['red', 'blue']", "var colors = 'red', 'blue'", "var colors = {red, blue}"],
    correctAnswer: 1
  },
  {
    question: "Which CSS property controls the spacing between elements?",
    options: ["spacing", "margin", "padding", "border"],
    correctAnswer: 1
  },
  {
    question: "What does API stand for in web development?",
    options: ["Advanced Programming Interface", "Application Programming Interface", "Advanced Program Integration", "Application Process Integration"],
    correctAnswer: 1
  },
  {
    question: "Which operator is used for strict equality comparison in JavaScript?",
    options: ["==", "===", "=", "equals"],
    correctAnswer: 1
  },
  {
    question: "What is the purpose of the HTML <meta> tag?",
    options: ["Display images", "Define metadata", "Create links", "Style content"],
    correctAnswer: 1
  }
];

class QuizGame {
  constructor() {
    this.currentQuestion = 0;
    this.score = 0;
    this.isAnswered = false;

    // DOM elements
    this.questionEl = document.getElementById('question');
    this.optionsContainer = document.getElementById('options-container');
    this.feedbackEl = document.getElementById('feedback');
    this.nextBtn = document.getElementById('next-btn');
    this.scoreEl = document.getElementById('scoreValue');
    this.questionNumberEl = document.getElementById('questionNumber');
    this.finalScreen = document.getElementById('final-screen');
    this.finalScoreEl = document.getElementById('final-score');
    this.restartBtn = document.getElementById('restart-btn');

    // Event listeners
    this.nextBtn.addEventListener('click', () => this.nextQuestion());
    this.restartBtn.addEventListener('click', () => this.restartQuiz());

    this.loadQuestion();
  }

  loadQuestion() {
    this.isAnswered = false;
    this.feedbackEl.classList.add('hidden');
    this.nextBtn.classList.add('hidden');
    
    const question = questions[this.currentQuestion];
    this.questionEl.textContent = question.question;
    this.questionNumberEl.textContent = this.currentQuestion + 1;
    
    this.optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
      const button = document.createElement('div');
      button.className = 'option';
      button.textContent = option;
      button.addEventListener('click', () => this.checkAnswer(index));
      this.optionsContainer.appendChild(button);
    });
  }

  checkAnswer(selectedIndex) {
    if (this.isAnswered) return;
    
    this.isAnswered = true;
    const question = questions[this.currentQuestion];
    const options = [...this.optionsContainer.children];
    
    options.forEach(option => option.classList.add('disabled'));
    
    if (selectedIndex === question.correctAnswer) {
      options[selectedIndex].classList.add('correct');
      this.feedbackEl.textContent = 'Correct! ';
      this.feedbackEl.classList.add('correct');
      this.score++;
      this.scoreEl.textContent = this.score;
    } else {
      options[selectedIndex].classList.add('wrong');
      options[question.correctAnswer].classList.add('correct');
      this.feedbackEl.textContent = 'Wrong! Try the next question';
      this.feedbackEl.classList.add('wrong');
    }
    
    this.feedbackEl.classList.remove('hidden');
    
    if (this.currentQuestion < questions.length - 1) {
      this.nextBtn.classList.remove('hidden');
    } else {
      this.showFinalScreen();
    }
  }

  nextQuestion() {
    this.currentQuestion++;
    this.feedbackEl.classList.remove('correct', 'wrong');
    this.loadQuestion();
  }

  showFinalScreen() {
    document.getElementById('question-container').classList.add('hidden');
    this.finalScoreEl.textContent = this.score;
    this.finalScreen.classList.remove('hidden');
  }

  restartQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.scoreEl.textContent = 0;
    this.finalScreen.classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    this.loadQuestion();
  }
}

// Start the quiz when the page loads
new QuizGame();