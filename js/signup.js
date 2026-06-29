var signUpName = document.querySelector('#name');
var signUpEmail = document.querySelector('#email');
var signUpPassword = document.querySelector('#password');
var signUpButton = document.querySelector('#Button');
var signUpAlertMessage = document.querySelector('#alertMessage');

var usersList = [];


if(localStorage.getItem('usersList') != null){

    usersList = JSON.parse(localStorage.getItem('usersList'));

}



function signUp(){

    if(
        validation(signUpName) &&
        validation(signUpEmail) &&
        validation(signUpPassword)
    ){

        if(checkEmailExists(signUpEmail.value)){

            var user = {

                name: signUpName.value,
                email: signUpEmail.value,
                password: signUpPassword.value

            };


            usersList.push(user);


            localStorage.setItem(
                'usersList',
                JSON.stringify(usersList)
            );


            signUpAlertMessage.classList.remove('d-none');

            signUpAlertMessage.classList.remove('text-danger');

            signUpAlertMessage.classList.add('text-success');

            signUpAlertMessage.innerText =
            'Successfully signed up!';


            clearForm();

        }


    }
    else{

        signUpAlertMessage.classList.remove('d-none');

        signUpAlertMessage.classList.remove('text-success');

        signUpAlertMessage.classList.add('text-danger');


        signUpAlertMessage.innerText =
        'Please enter valid data.';

    }

}





if(signUpButton != null){

    signUpButton.addEventListener('click', function(e){

        e.preventDefault();

        signUp();

    });

}





function validation(input){

    var regex = new RegExp(
        input.getAttribute('data-regex')
    );


    return regex.test(input.value);

}





function clearForm(){

    signUpName.value = '';

    signUpEmail.value = '';

    signUpPassword.value = '';

}





function checkEmailExists(email){


    for(var i = 0; i < usersList.length; i++){


        if(
            usersList[i].email.toLowerCase()
            ===
            email.toLowerCase()
        ){


            signUpAlertMessage.classList.remove('d-none');

            signUpAlertMessage.classList.remove('text-success');

            signUpAlertMessage.classList.add('text-danger');


            signUpAlertMessage.innerText =
            'Email already exists. Please use a different email.';


            return false;

        }

    }


    return true;

}