document.addEventListener('DOMContentLoaded', () => {
	
})

const createProfileButtonDiv = document.getElementById("create-profile-div");
const createProfileButton = document.getElementById("create-profile-button");
const createUsernameDiv = document.getElementById("create-username-div");
const createHeader = document.getElementById("create-header");
const logInButtonDiv = document.getElementById("log-in-div");
const logInButton = document.getElementById("log-in-button");
const logInUsernameDiv = document.getElementById("log-in-username-div");
const logHeader = document.getElementById("log-header");

createProfileButton.addEventListener('click', function() {
    createProfileButtonDiv.style.display = "none";
    logInButtonDiv.style.display = "none";
    createUsernameDiv.style.display = "block";
    createHeader.style.display = "block";
});

logInButton.addEventListener('click', function() {
    createProfileButtonDiv.style.display = "none";
    logInButtonDiv.style.display = "none";
    logInUsernameDiv.style.display = "block";
    logHeader.style.display = "block";
});