function registerForQuiz(){

    alert("thank you for the registration")
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    console.log(name,email,password);
    let user=new Array();
    user=JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):[];
    if(user.some((a)=> {return a.email==email}))
{
    alert("Already Registered");
}    
else{
    user.push({
        "name":name,
        "email":email,
        "password":password
    })
    localStorage.setItem("users",JSON.stringify(user))
}
}



