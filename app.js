document.addEventListener('DOMContentLoaded', () => {
	
})

const titleButton = document.getElementById("title-button");
const createHeader = document.getElementById("create-header");
const createButton = document.getElementById("create-button");
const logHeader = document.getElementById("log-header");
const logButton = document.getElementById("log-button");

const menuMusic = document.getElementById("menu-music");
const musicIcon = document.getElementById("music-icon");
const musicOptions = document.getElementById("music-options");
const muteMusicButton = document.getElementById("mute-music-button");
const musicVolumeSlider = document.getElementById("music-volume-slider");
const closeMusicOptions = document.getElementById("close-music-options");

//change background, hide old button, show headers and new buttons
titleButton.addEventListener('click', function() {
    document.body.style.backgroundImage = "url('images/account-background.png')";
    titleButton.style.display = "none";
    createHeader.style.display = "block";
    createButton.style.display = "block";
    logHeader.style.display = "block";
    logButton.style.display = "block";

    // start playing music
    // menuMusic.play();
    // musicIcon.style.display = "block";
});

// Music stuff
musicIcon.addEventListener('click', () => {
    musicOptions.style.display = "block";
});
closeMusicOptions.addEventListener('click', () => {
    musicOptions.style.display = "none";
});

// Mute/unmute music
muteMusicButton.addEventListener('click', () => {
    menuMusic.muted = !menuMusic.muted;
    muteMusicButton.textContent = menuMusic.muted ? "Unmute" : "Mute";

    musicIcon.src = menuMusic.muted ? "images/white-note-mute.png" : "images/white-note.png";
});

// Change volume
musicVolumeSlider.addEventListener('input', () => {
    menuMusic.volume = musicVolumeSlider.value;
});

// log in or create account?
const entryMethod = {
    newAccount: 0,
    logIn: 0
}

const createHeaderTwo = document.getElementById("create-headerTwo");
const logHeaderTwo = document.getElementById("log-headerTwo");
const inputUsername = document.getElementById("input-username-div");
const inputPassword = document.getElementById("input-password-div");
const switchToLog = document.getElementById("switch-to-log");
const switchToCreate = document.getElementById("switch-to-create");
const submitButton = document.getElementById("submit-button");

const selectLeaderDiv = document.getElementById("select-leader-div");
const selectFcardDiv = document.getElementById("select-fcard-div");

createButton.addEventListener('click', function() {
    createHeader.style.display = "none";
    createButton.style.display = "none";
    logHeader.style.display = "none";
    logButton.style.display = "none";
    entryMethod.newAccount = 1;
    entryMethod.logIn = 0;

    createHeaderTwo.style.display = "block";
    inputUsername.style.display = "block";
    inputPassword.style.display = "block";
    switchToLog.style.display = "block";
    submitButton.style.display = "block";

    selectLeaderDiv.style.display = "block";
    selectFcardDiv.style.display = "block";

    console.log("New - " + entryMethod.newAccount + " Log - " + entryMethod.logIn);
});

logButton.addEventListener('click', function() {
    createHeader.style.display = "none";
    createButton.style.display = "none";
    logHeader.style.display = "none";
    logButton.style.display = "none";
    entryMethod.logIn = 1;
    entryMethod.newAccount = 0;

    logHeaderTwo.style.display = "block";
    inputUsername.style.display = "block";
    inputPassword.style.display = "block";
    switchToCreate.style.display = "block";
    submitButton.style.display = "block";

    console.log("New - " + entryMethod.newAccount + " Log - " + entryMethod.logIn);
});

switchToLog.addEventListener('click', function() {
    createHeaderTwo.style.display = "none";
    logHeaderTwo.style.display = "block";
    switchToLog.style.display = "none";
    switchToCreate.style.display = "block";
    entryMethod.logIn = 1;
    entryMethod.newAccount = 0;

    selectLeaderDiv.style.display = "none";
    selectFcardDiv.style.display = "none";

    console.log("New - " + entryMethod.newAccount + " Log - " + entryMethod.logIn);
});

switchToCreate.addEventListener('click', function() {
    createHeaderTwo.style.display = "block";
    logHeaderTwo.style.display = "none";
    switchToLog.style.display = "block";
    switchToCreate.style.display = "none";
    entryMethod.logIn = 0;
    entryMethod.newAccount = 1;

    selectLeaderDiv.style.display = "block";
    selectFcardDiv.style.display = "block";

    console.log("New - " + entryMethod.newAccount + " Log - " + entryMethod.logIn);
});


//write and read from database for creat or log in
const submitUsername = document.getElementById("input-username").value;
const submitPassword = document.getElementById("input-password").value;

submitButton.addEventListener('click', function() {
    const submitUsername = document.getElementById("input-username").value;
    const submitPassword = document.getElementById("input-password").value;

    if (entryMethod.newAccount === 1) {
        fetch('http://localhost:3000/api/players', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: submitUsername, password: submitPassword })
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }
    
    if (entryMethod.logIn === 1) {
        fetch(`http://localhost:3000/api/players/${submitUsername}`)
            .then(res => res.json())
            .then(data => {
                if (data.password === submitPassword) {
                    console.log("Login successful!");
                    // Proceed to next step in your app
                } else {
                    console.log("Incorrect password.");
                }
            })
            .catch(err => console.log("User not found or error:", err));
    }
});

// Fill create page card details
const selectLeaderImage = document.getElementById("select-leader-image");
const selectLeaderHealth = document.getElementById("select-leader-health");
const selectLeaderProtection = document.getElementById("select-leader-protection");
const selectLeaderAbility1Name = document.getElementById("select-leader-ability1-name");
const selectLeaderAbility1Desc = document.getElementById("select-leader-ability1-desc");
const selectLeaderAbility1Cost = document.getElementById("select-leader-ability1-cost");
const selectLeaderAbility1Uses = document.getElementById("select-leader-ability1-uses");
const selectLeaderAbility2Name = document.getElementById("select-leader-ability2-name");
const selectLeaderAbility2Desc = document.getElementById("select-leader-ability2-desc");
const selectLeaderAbility2Cost = document.getElementById("select-leader-ability2-cost");
const selectLeaderAbility2Uses = document.getElementById("select-leader-ability2-uses");
const selectLeaderType = document.getElementById("select-leader-type");

const selectFcardImage = document.getElementById("select-fcard-image");
const selectFcardHealth = document.getElementById("select-fcard-health");
const selectFcardProtection = document.getElementById("select-fcard-protection");
const selectFcardAbility1Name = document.getElementById("select-fcard-ability1-name");
const selectFcardAbility1Desc = document.getElementById("select-fcard-ability1-desc");
const selectFcardAbility1Cost = document.getElementById("select-fcard-ability1-cost");
const selectFcardAbility1Uses = document.getElementById("select-fcard-ability1-uses");
const selectFcardAbility2Name = document.getElementById("select-fcard-ability2-name");
const selectFcardAbility2Desc = document.getElementById("select-fcard-ability2-desc");
const selectFcardAbility2Cost = document.getElementById("select-fcard-ability2-cost");
const selectFcardAbility2Uses = document.getElementById("select-fcard-ability2-uses");
const selectFcardType = document.getElementById("select-fcard-type");

function loadLeader(image_id) {
  fetch(`http://localhost:3000/api/character/${image_id}`)
    .then(res => res.json())
    .then(data => {
        selectLeaderImage.src = `images/leader-characters/${data.image_id}Leader.png`;
        selectLeaderHealth.textContent = data.health_max;
        selectLeaderProtection.textContent = "0"; // characters don't start with protection
        selectLeaderAbility1Name.textContent = data.ability1_name;
        selectLeaderAbility1Desc.textContent = data.ability1_desc;
        selectLeaderAbility1Cost.textContent = data.ability1_cost;
        if (data.ability1_uses > 99) {
            selectLeaderAbility1Uses.innerHTML = '<img src="images/infinity-icon.png" style="width: 0.8em; height: 0.6em;">';
        } else {
            selectLeaderAbility1Uses.textContent = data.ability1_uses;
        };
        selectLeaderAbility2Name.textContent = data.ability2_name;
        selectLeaderAbility2Desc.textContent = data.ability2_desc;
        selectLeaderAbility2Cost.textContent = data.ability2_cost;
        selectLeaderAbility2Uses.textContent = data.ability2_uses;
        selectLeaderType.textContent = data.type;
    })
    .catch(err => console.log(err));
}

function loadFcard(image_id) {
  fetch(`http://localhost:3000/api/character/${image_id}`)
    .then(res => res.json())
    .then(data => {
        selectFcardImage.src = `images/base-characters/${data.image_id}Base.png`;
        selectFcardHealth.textContent = data.health_max;
        selectFcardProtection.textContent = "0"; // characters don't start with protection
        selectFcardAbility1Name.textContent = data.ability1_name;
        selectFcardAbility1Desc.textContent = data.ability1_desc;
        selectFcardAbility1Cost.textContent = data.ability1_cost;
        if (data.ability1_uses > 99) {
            selectFcardAbility1Uses.innerHTML = '<img src="images/infinity-icon.png" style="width: 0.8em; height: 0.6em;">';
        } else {
            selectFcardAbility1Uses.textContent = data.ability1_uses;
        };
        selectFcardAbility2Name.textContent = data.ability2_name;
        selectFcardAbility2Desc.textContent = data.ability2_desc;
        selectFcardAbility2Cost.textContent = data.ability2_cost;
        selectFcardAbility2Uses.textContent = data.ability2_uses;
        selectFcardType.textContent = data.type;
    })
    .catch(err => console.log(err));
}

//cycle through leaders or fcards
let imageIds = [];
let imageIdsIndex = 0;

const goldLeftArrow = document.getElementById("gold-left-arrow");
const goldRightArrow = document.getElementById("gold-right-arrow");
const silverLeftArrow = document.getElementById("silver-left-arrow");
const silverRightArrow = document.getElementById("silver-right-arrow");

// Fetch all character names on page load
fetch('http://localhost:3000/api/characters')
  .then(res => res.json())
  .then(names => {
    imageIds = names;
    if (imageIds.length > 0) {
        const randomIndex = Math.floor(Math.random() * imageIds.length);
        loadLeader(imageIds[randomIndex]);
        loadFcard(imageIds[randomIndex]);
    }
    console.log(imageIds);
    console.log(imageIdsIndex);
  });

// Left gold arrow button
goldLeftArrow.addEventListener('click', function() {
  if (imageIds.length === 0) return;
  imageIdsIndex = (imageIdsIndex - 1 + imageIds.length) % imageIds.length;
  loadLeader(imageIds[imageIdsIndex]);
});

// Right gold arrow button
goldRightArrow.addEventListener('click', function() {
  if (imageIds.length === 0) return;
  imageIdsIndex = (imageIdsIndex + 1) % imageIds.length;
  loadLeader(imageIds[imageIdsIndex]);
});

// Left silver arrow button
silverLeftArrow.addEventListener('click', function() {
  if (imageIds.length === 0) return;
  imageIdsIndex = (imageIdsIndex - 1 + imageIds.length) % imageIds.length;
  loadFcard(imageIds[imageIdsIndex]);
});

// Right silver arrow button
silverRightArrow.addEventListener('click', function() {
  if (imageIds.length === 0) return;
  imageIdsIndex = (imageIdsIndex + 1) % imageIds.length;
  loadFcard(imageIds[imageIdsIndex]);
});