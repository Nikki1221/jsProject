function login()
{
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let userLogin=new Array();
    userLogin=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem('users')):[];
    if(userLogin.some((a)=>{
        return a.email==email&&a.password==password;

    })){
        alert("you login successfully");
        let currentUser=userLogin.filter((x)=>{
            return x.email==email&&x.password==password;
        })[0];
        localStorage.setItem("name",currentUser.name);
        localStorage.setItem("email",currentUser.email);
        window.location.href="./mainQuizPage/MainQuizPage.html";
    }
    else{
        alert("Invalid Email and Password");
    }
}