var signInEmail = document.querySelector('#email');
var signInPassword = document.querySelector('#password');
var signInButton = document.querySelector('#Button'); 
var signInAlertMessage = document.querySelector('#alertMessage');
var usersList = [];

if(localStorage.getItem('usersList') != null){
    usersList = JSON.parse(localStorage.getItem('usersList'));
}

function signIn(){

    var userEmail = '';

    if(usersList.length != 0){

        for(var i = 0; i < usersList.length; i++){

            if(usersList[i].email.toLowerCase() === signInEmail.value.toLowerCase() &&
               usersList[i].password === signInPassword.value){

                userEmail = signInEmail.value;
                getUserNameByEmail(userEmail);

                signInAlertMessage.classList.remove('d-none');

                if(signInAlertMessage.classList.contains('text-danger')){
                    signInAlertMessage.classList.remove('text-danger');
                }

                signInAlertMessage.classList.add('text-success');
                signInAlertMessage.innerText = 'Login successful. Redirecting...';

                setTimeout(function(){
                    window.location.href = 'pages/home.html';
                },1000);

                return;
            }
            else{

                signInAlertMessage.classList.remove('d-none');
                signInAlertMessage.classList.add('text-danger');
                signInAlertMessage.innerText = 'Invalid email or password.';
            }
        }
    }

    else{

        signInAlertMessage.classList.remove('d-none');
        signInAlertMessage.classList.add('text-danger');
        signInAlertMessage.innerText = 'Invalid email or password.';
    }

}


if(signInButton != null){

    signInButton.addEventListener('click', function(e){

        e.preventDefault();
        signIn();

    })

}



function getUserNameByEmail(email){

    for(var i = 0; i < usersList.length; i++){

        if(usersList[i].email.toLowerCase() === email.toLowerCase()){

            localStorage.setItem('loggedInUserName', usersList[i].name);

            return;
        }
    }
}