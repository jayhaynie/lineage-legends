document.addEventListener('DOMContentLoaded', () => {
	
})

const titleButton = document.getElementById("title-button");
const createHeader = document.getElementById("create-header");
const createButton = document.getElementById("create-button");
const logHeader = document.getElementById("log-header");
const logButton = document.getElementById("log-button");

//change background, hide old button, show headers and new buttons
titleButton.addEventListener('click', function() {
    document.body.style.backgroundImage = "url('images/account-background.png')";
    titleButton.style.display = "none";
    createHeader.style.display = "block";
    createButton.style.display = "block";
    logHeader.style.display = "block";
    logButton.style.display = "block";
});

createButton.addEventListener('click', function() {
    createHeader.style.display = "none";
    createButton.style.display = "none";
    logHeader.style.display = "none";
    logButton.style.display = "none";
});

logButton.addEventListener('click', function() {
    createHeader.style.display = "none";
    createButton.style.display = "none";
    logHeader.style.display = "none";
    logButton.style.display = "none";
});