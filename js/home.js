var welcomeUserName = document.querySelector('h1');

if(localStorage.getItem('loggedInUserName') != null){
    welcomeUserName.innerText = 'Welcome ' + localStorage.getItem('loggedInUserName');
}