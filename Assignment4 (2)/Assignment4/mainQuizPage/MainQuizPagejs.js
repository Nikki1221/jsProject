// function startQuiz()
// {
//     debugger
//     let start=confirm("Do you want to start the quiz")
//     if(start==true){
//     let startQuiz=document.getElementById("afterQuizStart");
//     if(startQuiz!=null)
//     {
//         if(startQuiz.style.display==='block')
//         {startQuiz.style.display = 'none';}
//         else{
//             startQuiz.style.display='block';
//         }
 
//     }
// }

//     else{
//         console.log("not found")
//     }
   
// }
function startQuiz() {
    debugger;
    let start = confirm("Do you want to start the quiz");
    if (start == true) {
        let startQuiz = document.getElementById("afterQuizStart");
        if (startQuiz != null) {
            if (startQuiz.style.display === 'block') {
                startQuiz.style.display = 'none';
            } else {
                startQuiz.style.display = 'block';
            }
        }
    } else {
        console.log("Quiz not started");
    }
}
