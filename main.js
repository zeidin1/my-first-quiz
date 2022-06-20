//всі варіанти відповідей
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// всі варіанти відповідей
const optionElements = document.querySelectorAll('.option');
console.log(optionElements);

const question = document.getElementById('question'); //питання

const numberOfQuestion = document.getElementById('number-of-question'), // номер питання
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // загальне чисто питань

let indexOfQuestion, //індекс активного питання
    indexOfPage = 0; // індекс сторінки

const answersTracker = document.getElementById('answers-tracker'); // зовнішня частина трекера
const btnNext = document.getElementById('btn-next'); // кнопка дальше

let score = 0; // загальний результат віктрорини

const correctAnswer = document.getElementById('correct-answer'), //кількість правильних відповідей
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'); // кількість всіх питань ( в модальному вікні)
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка почати все заново

const questions = [
    {
        question: 'Як в JavaScript вичислити % від числа?',
        options: [
            'Так не можна зробити в JS',
            'Оператор : %',
            'Помножити на кк-сть процентів і розділити на 100',
            'Визвати метод findPrecent()',
             
        ],
        rightAnswer: 1
    },
    {
        question: '2+2 = ?',
        options: [
            '12400010',
            'неправильна дія',
            '4',
            '22',
             
        ],
        rightAnswer: 2
    },
    {
        question: 'що краще?',
        options: [
            'BMW',
            'Audi',
            'Toyota',
            'Honda Dio',
             
        ],
        rightAnswer: 1
    },
    {
        question: 'як вийти сухим з води?',
        options: [
            'ніяк',
            'поняття "сухим" відносне',
            'надіти на себе водолазний костюм',
            'не заходити у воду',
             
        ],
        rightAnswer: 3
    }
];

numberOfAllQuestions.innerHTML = questions.length; // вивід кількості питань

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //саме питання
    
    //мапінг відповідей

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера теперішньої сторінки
    indexOfPage++; // збільшення індекса сторінки 
};

let completedAnswers = [] // масив для уже заданих питань

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для провірки одинакових питань

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber ) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}


//зачистка всіх класів перед наступними питаннями
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled','correct','wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Виберіть один з варіантів відповіді')
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});