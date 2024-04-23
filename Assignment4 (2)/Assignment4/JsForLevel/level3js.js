    window.addEventListener('load', function () {
        let mainContainer = document.getElementById("container");
    

        fetch('qusLevel3.json')
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
         console.log("question length",questions.length);
          console.log("inex",index);
            if (index < questions.length) {
                debugger
                console.log(questions[index].QuestionType)
                if (questions[index].QuestionType === 'level3') {
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
                
                // Append elements to the quiz box
                quizBox.appendChild(questionNo);
                quizBox.appendChild(questionText);
                quizBox.appendChild(optionContainer);
                quizBox.appendChild(submitBtn);
                // quizBox.appendChild(currentScore);

                // Append quiz box to the main container
                mainContainer.innerHTML = ""; // Clear previous content
                mainContainer.appendChild(quizBox);

                // Start the timer for the current question
                showTimerForEachQuestion(questions, index);

                // Event listener for option buttons
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

            // Create elements to display the final score information
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

            let table = document.createElement("table");
            table.id = "leaderboardBody";
            console.log("table",table)

            let thead = document.createElement("thead");
            let headerRow = document.createElement("tr");
            let tableheading=["S.No", "Email", "Total Score"]
           tableheading.forEach(headerText => {
                let tablehead = document.createElement("th");
                tablehead.textContent = headerText;
                headerRow.appendChild(tablehead);
            });
            thead.appendChild(headerRow);

        
        let tablebody = document.createElement("tbody");

       
        table.appendChild(thead);
        table.appendChild(tablebody);

        let userEmail = localStorage.getItem("user.email") || "";
         //updateLeaderboard(userEmail,correctAns)
            
        card.appendChild(table);
       // displayLeaderboard();

                    
        }
    
            function displayLeaderboard() {
                // Retrieve scores from local storage
                debugger
                let leaderboardBody = document.getElementById('leaderboardBody');
                console.log(leaderboardBody)
                // Check if the element exists
                if (!leaderboardBody) {
                    console.error("Leaderboard body element not found.");
                    return;
                }
            
                let users = JSON.parse(localStorage.getItem('users')) || [];
                let leaderboard = [];
    
                // Iterate over each user
                users.forEach(user => {
                    // Retrieve scores for the current user
                    let userScores = JSON.parse(localStorage.getItem(user.email + 'scores')) || [];
                    let totalScore = userScores.reduce((acc, score) => acc + score, 0);
    
                    // Add the user's email and total score to the leaderboard
                    leaderboard.push({ email: user.email, totalScore: totalScore });
                });
    
                // Sort the leaderboard in descending order based on total score
                leaderboard.sort((a, b) => b.totalScore - a.totalScore);
    
                // Get the leaderboard body element
              
    
                // Clear previous leaderboard entries
                leaderboardBody.innerHTML = '';
    
                // Populate leaderboard table with sorted data
                leaderboard.forEach((user, index) => {
                    let row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${user.email}</td>
                        <td>${user.totalScore}</td>
                    `;
                    leaderboardBody.appendChild(row);
                });
            }
        

        function checkTheAns(selectedAns, currentIndex, totalQuestions) {
            fetch('qusLevel3.json')
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

    // Retrieve users and scores from local storage
    function updateLeaderboard(email,score) {
        debugger
        
        let userScores = JSON.parse(localStorage.getItem(email + 'scores')) || [];
        userScores.push(score);
        console.log(userScores);
        localStorage.setItem(email + 'scores', JSON.stringify(userScores));

        let users = JSON.parse(localStorage.getItem('users')) || [];
        let userIndex = users.findIndex(user => user.email === email);
        if (userIndex === -1) {
            users.push({ email: email });
            localStorage.setItem('users', JSON.stringify(users));
        }
        console.log("leaderboard");
    }
});
