    window.addEventListener('load', function () {
        let mainContainer = document.getElementById("container");
    

        fetch('qusLevel2.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
              
                if (data && Array.isArray(data.questions)) {
                    let currentIndex = 0;
                    data.questions.forEach(question=>
                        {
                                debugger
                               
                                displayNextEasyQuestion(data.questions, currentIndex);
                              
                            
                        })
               

                    
                }
            }

            )
            .catch(error => {
                console.error('Error fetching questions:', error);
            });

       
        let correctAns = 0;
        let count=1;
            let totalEasyQuestion=0;
        function  displayNextEasyQuestion(questions, index) {
            debugger
         console.log("question length",questions.length);
          console.log("inex",index);
            if (index < questions.length) {
                debugger
                console.log(questions[index].QuestionType)
                if (questions[index].QuestionType === 'level2') {
                    totalEasyQuestion++;
                
                // let currentScore=document.createElement("div");
                // currentScore.id="displayCurrentScore";
                // currentScore.classList.add("displayCurrentScore");
                // //currentScore.textContent=`Score: ${correctAns}/${totalEasyQuestion}`
                // console.log("currentscore",currentScore)


                let mainQuestion = questions[index];
                console.log("maincontainer",mainContainer)
                let quizBox = document.createElement("div");
                quizBox.id = "quizBox";
                quizBox.classList.add("quizBox");
            

                let questionNo = document.createElement("div");
                questionNo.id = "questionNo";
                questionNo.classList.add("questionNo");
                questionNo.textContent =questions[index].questionNo ;
                count++;

                let questionText = document.createElement("div");
                questionText.id = "questionText";
                questionText.classList.add("questionText");
                questionText.textContent =   mainQuestion.question;

                let optionContainer = document.createElement("div");
                optionContainer.classList.add("optionContainer");
                optionContainer.id = "optionContainer";

                // Create buttons for options
                mainQuestion.options.forEach((option, index) => {
                    let optionButton = document.createElement("button");
                    optionButton.classList.add("option" + (index + 1));
                    optionButton.textContent = option;
                    optionButton.innerHTML = option;
                    optionContainer.appendChild(optionButton);
                });

                let submitBtn = document.createElement("button");
                submitBtn.id = "submitBtn";
                submitBtn.textContent = "Submit";
                
               
                quizBox.appendChild(questionNo);
                quizBox.appendChild(questionText);
                quizBox.appendChild(optionContainer);
                quizBox.appendChild(submitBtn);
               

              
                mainContainer.innerHTML = ""; 
                mainContainer.appendChild(quizBox);

             
                showTimerForEachQuestion(questions, index);

             
                let optionButtons = optionContainer.querySelectorAll("button");
                optionButtons.forEach(optionButton => {
                    optionButton.addEventListener("click", function () {
                        checkTheAns(optionButton.textContent, index, questions.length);
                    });
                });

                
                submitBtn.addEventListener("click", function () {
                    if (index + 1 < questions.length) {
                        displayNextEasyQuestion(questions, index + 1);
                    } else {
                       finalScore(correctAns, questions.length);
                    }
                });
            } 
        }
        else{
            debugger
            finalScore(correctAns, questions.length);
        }
        }

        function showTimerForEachQuestion(questions, index) {
            debugger
            let mainQuestion = questions[index];
            let timeLeft = 15; 
        
            let timerBox = document.createElement("div");
            timerBox.textContent = formatTime(timeLeft);
        
            let quizBox = document.getElementById("quizBox");
            quizBox.appendChild(timerBox);
        
            let timerInterval = setInterval(() => {
                timeLeft--;
                timerBox.textContent = formatTime(timeLeft);
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    console.log(index);
                    displayNextEasyQuestion(questions, index + 1); 
                }
                clearInterval(timeLeft)
            }, 1000);
        }
        

        function finalScore(correctans, totalquestion) {
           debugger
            let card = document.createElement("div");
            card.classList.add("scoreCard");

          
            let scoreTitle = document.createElement("h2");
            scoreTitle.textContent = "Quiz Completed!";
            let scoreMessage = document.createElement("p");
            scoreMessage.textContent = `Your final score is ${correctans} out of ${totalquestion}.`;

            //feedback of the quiz
            let feedBackContainer=document.createElement("div");
            feedBackContainer.id="feedback";

            let feedback=document.createElement("textarea");
            feedback.classList.add("feedback");

            let feedbacksubmitbtn=document.createElement("button");
            feedbacksubmitbtn.textContent="Submit";
            feedbacksubmitbtn.id="feedbackSubmit";
           
            feedBackContainer.appendChild(feedback);
            feedBackContainer.appendChild(feedbacksubmitbtn);

            card.appendChild(feedBackContainer)
            card.appendChild(scoreTitle);
            card.appendChild(scoreMessage);

           
            mainContainer.innerHTML = ""; 
            mainContainer.appendChild(card);
        
        }
    
           

        function checkTheAns(selectedAns, currentIndex, totalQuestions) {
            fetch('qusLevel2.json')
                .then(response => response.json())
                .then(data => {
                    let correctAnswer = data.questions[currentIndex].correctAnswer;
                   // let currentScore=document.getElementById("displayCurrentScore");
                    let quizBox=document.getElementById("quizBox");
                    debugger
                    if (selectedAns === correctAnswer) {
                        correctAns++; 
                    }
                   debugger
                   console.log("current index+1 in checkans",currentIndex+1);
                    // displayNextEasyQuestion(data.questions, currentIndex + 1); // Display the next question
                })
                .catch(error => {
                    console.error('Error fetching questions:', error);
                });
        }
        function formatTime(seconds) {
            let minutes = Math.floor(seconds / 60);
            let remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }

   
});
