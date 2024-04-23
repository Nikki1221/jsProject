console.log("Fetching data...");

fetch('quizQuestions.json')
  .then(response => {
    console.log(response);
    return response.json(); // Add parentheses to call response.json()
  })
  .then(data => {
    console.log("data", data);
    if (data && Array.isArray(data.questions)) {
      data.questions.forEach(question => {
          // Create quiz card elements
          const quizCard = document.createElement('div');
          quizCard.classList.add('quiz-card');
  
          const questionElement = document.createElement('div');
          questionElement.classList.add('question');
          questionElement.textContent = question.question;
  
          const optionsElement = document.createElement('div');
          optionsElement.classList.add('options');
          question.options.forEach((option, index) => {
              const label = document.createElement('label');
              const radioInput = document.createElement('input');
              radioInput.type = 'radio';
              radioInput.name = `question${question.questionNo}`;
              radioInput.value = option;
              label.appendChild(radioInput);
              label.appendChild(document.createTextNode(` ${option}`));
              optionsElement.appendChild(label);
          });
  
          const submitBtn = document.createElement('button');
          submitBtn.classList.add('submit-btn');
          submitBtn.textContent = 'Submit';
  
          // Append elements to quiz card
          quizCard.appendChild(questionElement);
          quizCard.appendChild(optionsElement);
          quizCard.appendChild(submitBtn);
  
          // Append quiz card to document body or a container element
          document.body.appendChild(quizCard);
  
          // Add event listener to submit button (assuming showQuestion is a function to handle submission)
          submitBtn.addEventListener('click', () => {
              const selectedOption = optionsElement.querySelector('input:checked');
              if (selectedOption) {
                  showQuestion(question, selectedOption.value);
              } else {
                  alert('Please select an option.');
              }
          });
      });
  }
  
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
  function showquestion(num)
  {
    console.log(num)
  }
