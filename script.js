document.addEventListener('DOMContentLoaded', function () {
  const quizData = [{
      question: "Скільки слів має сучасна українська мова?",
      answers: [{
          id: 1,
          label: "20 тисяч",
          correct: false
        },
        {
          id: 2,
          label: "100 тисяч",
          correct: false
        },
        {
          id: 3,
          label: "150 тисяч",
          correct: false
        },
        {
          id: 4,
          label: "260 тисяч",
          correct: true
        }
      ]
    },
    {
      question: "Скільки слів має сучасна українська мова?",
      answers: [{
          id: 1,
          label: "20 тисяч",
          correct: false
        },
        {
          id: 2,
          label: "100 тисяч",
          correct: false
        },
        {
          id: 3,
          label: "150 тисяч",
          correct: false
        },
        {
          id: 4,
          label: "260 тисяч",
          correct: true
        }
      ]
    },
    {
      question: "Скільки слів має сучасна українська мова?",
      answers: [{
          id: 1,
          label: "20 тисяч",
          correct: false
        },
        {
          id: 2,
          label: "100 тисяч",
          correct: false
        },
        {
          id: 3,
          label: "150 тисяч",
          correct: false
        },
        {
          id: 4,
          label: "260 тисяч",
          correct: true
        }
      ]
    }
  ];

  const quizFormElem = document.getElementById("quiz-form");
  const quizContainerElem = document.getElementById("quiz-container");
  const quizTimerElem = document.getElementById("quiz-timer");
  const quizStartBtn = document.getElementById("quiz-start-btn");
  const quizRestartBtn = document.getElementById("quiz-restart-btn");
  const contact = document.querySelector('#contact');

  let quizTime = 0;
  let quizIndex = 0;
  let quizScore = 0;
  let intervalId = null;

  const nicknameInput = document.querySelector('input[placeholder="Вигадайте нікнейм"]');
  const phoneInput = document.querySelector('input[placeholder="Мобільний телефон"]');

  const input1 = document.getElementById('nickname');
  const input2 = document.getElementById('mobile');

  // check if values are already stored in local storage
  const storedValue1 = localStorage.getItem('input1Value');
  const storedValue2 = localStorage.getItem('input2Value');

  if (storedValue1 && storedValue2) {
    // if values are already stored, set the inputs' values to the stored values
    input1.value = storedValue1;
    input2.value = storedValue2;

    quizStartBtn.removeAttribute('disabled');
  }



  const inputList = Array.from(document.querySelector('.container').querySelectorAll('input'));

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      const allInputsFilled = inputList.every(input => input.value.trim() !== '');

      if (allInputsFilled) {
        quizStartBtn.removeAttribute('disabled');
      } else {
        quizStartBtn.setAttribute('disabled', 'disabled');
      }
    });
  });

  quizFormElem.addEventListener("submit", (e) => {
    e.preventDefault();

    const quizInputsElems = document.querySelectorAll("input[name='answer']");
    const correctAnswer = findCorrectAnswer(quizInputsElems);
    quizIndex++;

    if (quizIndex >= quizData.length) {
      clearInterval(intervalId);
      intervalId = null;

      quizContainerElem.innerHTML = evaluateScore(quizScore, quizData.length);
    } else {
      renderQuiz(quizData[quizIndex], quizIndex);
    }
  });

  quizStartBtn.addEventListener("click", (e) => {
    if (nicknameInput.checkValidity() && phoneInput.checkValidity()) {
      localStorage.setItem('input1Value', input1.value);
      localStorage.setItem('input2Value', input2.value);

      contact.classList.add("hide");
      quizFormElem.classList.remove("hide");

      // Call function to set timer
      setTimer();

      // Call function to render quiz
      renderQuiz(quizData[quizIndex], quizIndex);
    }
  });

  quizRestartBtn.addEventListener("click", () => {
    quizIndex = 0;
    quizScore = 0;

    clearInterval(intervalId);
    intervalId = null;
    setTimer();

    renderQuiz(quizData[quizIndex], quizIndex);
  });




  function renderQuiz(data, index) {
    if (!data) return;

    const output = `<h3 class="quiz__question"><span class="quiz__number">${
      index + 1
    }.</span> ${data.question}</h3>
      <div class="quiz__answers">
        ${renderQuizAnswers(data.answers)}
      </div>`;

    quizContainerElem.innerHTML = output;
  }

  function renderQuizAnswers(answers) {
    let output = "";

    answers.forEach((answer) => {
      output += `<div class="quiz__answer">
        <input type="radio" id="answer${answer.id}" name="answer" data-correct="${answer.correct}" required />
        <label for="answer${answer.id}">${answer.label}</label>
      </div>`;
    });

    return output;
  }

  function findCorrectAnswer(quizInputs) {
    for (let i = 0, l = quizInputs.length; i < l; i++) {
      // If answer is correct
      if (quizInputs[i].checked && quizInputs[i].dataset.correct === "true") {
        quizScore++;
        return quizInputs[i];
      }
    }

    return null;
  }

  function evaluateScore(correctAnswers, questions) {
    const scoreInPercent = Math.floor((correctAnswers / questions) * 100);

    return `<h3>Вітаємо!</h3>
            <p>Ви набрали ${scoreInPercent}% правильних відповідей</p>`;
  }



  function setTimer() {
    const formatTime = (num, str = "0") => num.toString().padStart(2, str);

    let seconds = 0;
    let minutes = 0;

    if (!intervalId) {
      intervalId = setInterval(() => {
        if (seconds == 60) {
          seconds = 0;
          minutes++;
        }

        quizTimerElem.innerHTML = `${formatTime(minutes)}:${formatTime(seconds)}`;
        seconds++;
      }, 1000); // 1000ms = 1s
    }
  }
});
