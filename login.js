function opensignin(){
    const open__1=document.getElementsByClassName("modal");
    const open__2=document.getElementsByClassName("none");
    const open__3=document.getElementsByClassName("block");
    open__1[0].style.display="block";
    open__2[0].style.display="none";
    open__3[0].style.display="block";

}

function opensignup(){
    const open__1=document.getElementsByClassName("modal");
    const open__2=document.getElementsByClassName("none");
    const open__3=document.getElementsByClassName("block");
    open__1[0].style.display="block";
    open__2[0].style.display="block";
    open__3[0].style.display="none";

}

function hideall(){
    const hide=document.getElementsByClassName("modal");
    hide[0].style.display='none';
}

function changetoSingup() {
    document.getElementById("login-up").style.display="block";
    document.getElementById("login-in").style.display="none";
}

function changetoSingin() {
    document.getElementById("login-up").style.display="none";
    document.getElementById("login-in").style.display="block";
}


function admin(){
    var userArray=[];
    if(localStorage.getItem('user')==null){
        var user1={
            username:"admin",
            email:"admin@gmail.com",
            password:"admin",
            usertype:1
            }
            userArray.push(user1);
            localStorage.setItem('user',JSON.stringify(userArray));
    }
    
}

function signUp(){
    userArray = JSON.parse(localStorage.getItem('user'));

    var username = document.getElementById("username__dk").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password__dk").value;
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!username.replace(/\s+/,'').length){
        alert("User rong");
        return false;
    }else if(!email.match(mailformat)){
        alert('Input is not valid type');
        return false
     }
    if(!password.replace(/\s+/,'').length){
        alert("Password rong");
        return false;
    }


    let user={
        username:username,
        email:email,
        password:password,
        usertype:0
    }
    
    userArray.push(user);
    localStorage.setItem('user',JSON.stringify(userArray));
}

function checklogin() {
    var username = document.getElementById("username__dn").value.toString();
    var password = document.getElementById("password__dn").value.toString();
    var flag=false;

    var userArray = JSON.parse(localStorage.getItem('user'));
    for (i = 0; i < userArray.length; i++) {
     if( userArray[i].username.toString() === username && userArray[i].password.toString() === password)
     {
        flag = true;
        break;

     }else{
        flag=false;
     }
    }
    return flag;
}

function signIn(){
let isLoginSuccess = checklogin();
if(isLoginSuccess==true){
    hideall();
    const name = document.getElementsByClassName("header__user-sig")
    name[0].innerHTML=document.getElementById("username__dn").value;
    
}else{
    alert("fail")
}
    
      
}

window.onload=function(){
    admin();
}