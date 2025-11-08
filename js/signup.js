var signUpName = document.querySelector('#name');
var signUpEmail = document.querySelector('#email');
var signUpPassword = document.querySelector('#password');
var signUpButton = document.querySelector('#Button'); 
var signUpAlertMessage = document.querySelector('#alertMessage');
var usersList = [];

if(localStorage.getItem('usersList')){
    usersList = JSON.parse(localStorage.getItem('usersList'));
}

function signUp(){

    if( validation(signUpName)&&
        validation(signUpEmail)&&  
        validation(signUpPassword)){

    var user = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value
    };    

    if(checkEmailExists(signUpEmail.value)){
        usersList.push(user);
        localStorage.setItem('usersList', JSON.stringify(usersList));

        if(signUpAlertMessage.classList.contains('text-danger')){
            signUpAlertMessage.classList.remove('text-danger');
            signUpAlertMessage.classList.add('text-success');
        }
        signUpAlertMessage.classList.remove('d-none');
        signUpAlertMessage.innerText = 'Successfully signed up!';

        clearForm();
    }

    }
    else if(!validation(signUpName)){
        signUpAlertMessage.classList.remove('d-none');
        signUpAlertMessage.classList.add('text-danger');
        signUpAlertMessage.innerText = 'Please enter a valid name.';
    }
    else if(!validation(signUpEmail)){
        signUpAlertMessage.classList.remove('d-none');
        signUpAlertMessage.classList.add('text-danger');
        signUpAlertMessage.innerText = 'Please enter a valid email.';
    }
    else if(!validation(signUpPassword)){
        signUpAlertMessage.classList.remove('d-none');
        signUpAlertMessage.classList.add('text-danger');
        signUpAlertMessage.innerText = 'Please enter a valid password.';
    }
    else{
        signUpAlertMessage.classList.remove('d-none');
        signUpAlertMessage.classList.add('text-danger');
        signUpAlertMessage.innerText = 'Please enter valid data.';
    }

    
    
}

if(signUpButton != null){
    signUpButton.addEventListener('click', function(e){
    e.preventDefault();
    signUp();
})
}

function validation(input){

    var regex = new RegExp(input.getAttribute('data-regex'));

    if(regex.test(input.value)){
        return true;
    } else {
        return false;
    }

}

function clearForm(){
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
}

function checkEmailExists(email){

    var flag = '';

    if(usersList.length !== 0){
        for(var i=0; i<usersList.length; i++){
            if(usersList[i].email.toLowerCase() === email.toLowerCase()){
                alertMessage.classList.remove('d-none');
                alertMessage.classList.add('text-danger');
                alertMessage.innerText = 'Email already exists. Please use a different email.';
                
                flag = false;
                return;
            }
            else{
                flag = true;
            }            
        }
    }
     else{
        flag = true;
    }
    return flag;
}