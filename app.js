document.addEventListener('DOMContentLoaded', () => {
})


// Dynamic API base URL for local and deployed environments
const API_BASE_URL = (window.location.hostname === 'localhost' && window.location.port === '443')
    ? 'http://localhost:443'
    : 'https://lineage-legends.onrender.com';// tried process.env.DATABASE_URL

const titleButton = document.getElementById("title-button");
const createHeader = document.getElementById("create-header");
const createButton = document.getElementById("create-button");
const logHeader = document.getElementById("log-header");
const logButton = document.getElementById("log-button");

const menuMusic = document.getElementById("menu-music");
const combatMusic = document.getElementById("combat-music");
const travelMusic = document.getElementById("travel-music");
const victorySound = document.getElementById("victory-sound");
const musicIcon = document.getElementById("music-icon");
const settingsIcon = document.getElementById("settings-icon");
const settingsOptions = document.getElementById("settings-options");
const muteMusicButton = document.getElementById("mute-music-button");
const musicVolumeSlider = document.getElementById("music-volume-slider");

//change background, hide old button, show headers and new buttons
titleButton.addEventListener('click', function() {
    document.body.style.backgroundImage = "url('images/account-background.png')";
    titleButton.style.display = "none";
    createHeader.style.display = "block";
    createButton.style.display = "block";
    logHeader.style.display = "block";
    logButton.style.display = "block";

    // start playing music
    menuMusic.play();
    currentSound = menuMusic;
    // combatMusic.play();
    // travelMusic.play();
    settingsIcon.style.display = "block";
});

function crossfadeMusic(currentAudio, nextAudio, duration = 4000) {
    const steps = 40;
    const interval = duration / steps;
    let currentStep = 0;

    // Use currentVolume as the max volume
    const maxVolume = Number(currentVolume) || 1;

    // Start next music at volume 0 and play it
    nextAudio.volume = 0;
    nextAudio.play();

    const fade = setInterval(() => {
        currentStep++;
        // Calculate new volumes based on maxVolume
        const fadeOutVolume = Math.max(0, maxVolume * (1 - currentStep / steps));
        const fadeInVolume = Math.min(maxVolume, maxVolume * (currentStep / steps));

        currentAudio.volume = fadeOutVolume;
        nextAudio.volume = fadeInVolume;

        if (currentStep >= steps) {
            clearInterval(fade);
            currentAudio.pause();
            currentAudio.currentTime = 0; // Optional: reset to start
            nextAudio.volume = maxVolume;
        }
    }, interval);

    currentSound = nextAudio;
}

// Settings icon click
let optionsShowing = false;
settingsIcon.addEventListener('click', function() {
    if (optionsShowing === false) {
        settingsOptions.style.display = "block";
        optionsShowing = true;
    } else {
        settingsOptions.style.display = "none";
        optionsShowing = false;

        document.getElementById("help-page-div").style.display = "none";
        helpShowing = false;
    }
});

// help icon click
let helpShowing = false;
document.getElementById("help-icon").addEventListener('click', function() {
    if (helpShowing === false) {
    document.getElementById("help-page-div").style.display = "block";
    document.getElementById("help-page-img").src = `images/help-page-${helpPageId}.png`;
    helpShowing = true;
    } else {
        document.getElementById("help-page-div").style.display = "none";
        helpShowing = false;
    }
});

// help page click
let helpPageId = "char";
document.getElementById("help-page-img").addEventListener('click', function() {
    if (helpPageId === "char") {
        helpPageId = "sail";
        document.getElementById("help-page-img").src = `images/help-page-${helpPageId}.png`;
    } else if (helpPageId === "sail") {
        helpPageId = "how";
        document.getElementById("help-page-img").src = `images/help-page-${helpPageId}.png`;
    } else if (helpPageId === "how") {
        helpPageId = "shop";
        document.getElementById("help-page-img").src = `images/help-page-${helpPageId}.png`;
    } else if (helpPageId === "shop") {
        helpPageId = "char";
        document.getElementById("help-page-img").src = `images/help-page-${helpPageId}.png`;
    }
});

// music icon click
musicIcon.addEventListener('click', function() {
    if (menuMusic.muted === false) {
        menuMusic.muted = true;
        musicIcon.src = "images/white-note-mute.png";
    } else {
        menuMusic.muted = false;
        musicIcon.src = "images/white-note.png";
    }
    if (travelMusic.muted === false) {
        travelMusic.muted = true;
        musicIcon.src = "images/white-note-mute.png";
    } else {
        travelMusic.muted = false;
        musicIcon.src = "images/white-note.png";
    }
    if (combatMusic.muted === false) {
        combatMusic.muted = true;
        musicIcon.src = "images/white-note-mute.png";
    } else {
        combatMusic.muted = false;
        musicIcon.src = "images/white-note.png";
    }
    if (victorySound.muted === false) {
        victorySound.muted = true;
        musicIcon.src = "images/white-note-mute.png";
    } else {
        victorySound.muted = false;
        musicIcon.src = "images/white-note.png";
    }
});
let currentSound = menuMusic;
let currentVolume = 0;
// volume slider
musicVolumeSlider.addEventListener('input', function() {
    menuMusic.volume = musicVolumeSlider.value;
    travelMusic.volume = musicVolumeSlider.value;
    combatMusic.volume = musicVolumeSlider.value;
    victorySound.volume = musicVolumeSlider.value;

    currentVolume = musicVolumeSlider.value;
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

let dialogueProgress = "0.0";
let leaderName = 'leaderName';

const dialogueSpeakerImage = document.getElementById("dialogue-speaker-image");
const dialogueDiv = document.getElementById("dialogue-div");
const dialogueSpeaker = document.getElementById("dialogue-speaker");
const dialogueText = document.getElementById("dialogue-text");

let currentUsername = "";
let submitUsername = "";
let submitPassword = "";

submitButton.addEventListener('click', function() {
    submitUsername = document.getElementById("input-username").value;
    submitPassword = document.getElementById("input-password").value;
    const leaderImageId = leaderImageIds[leaderImageIdsIndex]; // currently selected leader
    const baseImageId = baseImageIds[baseImageIdsIndex];

    if (entryMethod.newAccount === 1 && bypassKey === null) {
        if (leaderImageId === baseImageId) {
            alert("Please choose 2 different characters");
            return;
        } else {
            crossfadeMusic(currentSound, travelMusic, 4000);
            splitShopCharacters();

            fetch(`${API_BASE_URL}/api/players`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: submitUsername,
                    password: submitPassword,
                    characterList: characterList,      
                    leaderImageId: leaderImageId,      
                    baseImageId: baseImageId,
                    shop1List: shop1List,
                    shop2List: shop2List,
                    shop3List: shop3List,           
                    shop4List: shop4List,
                    bypassKey: bypassKey
                })
            })
            .then(async res => {
                if (res.status === 409) {
                    const data = await res.json();
                    alert(data.error); // Or show a message in your UI
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data) {
                    currentUsername = submitUsername;
                    // Proceed with account creation success

                    document.body.style.backgroundImage = "url('images/background1.png')";
                    selectFcardDiv.style.display = "none";
                    selectLeaderDiv.style.display = "none";
                    createHeaderTwo.style.display = "none";
                    inputUsername.style.display = "none";
                    inputPassword.style.display = "none";
                    switchToLog.style.display = "none";
                    submitButton.style.display = "none";

                    dialogueDiv.style.display = "block";
                    dialogueSpeakerImage.style.display = "block";
                    dialogueSpeaker.textContent = "???";
                    dialogueText.textContent = `Thank you for showing up ${leaderName}, we could really use your help.`;

                    dialogueProgress = "1.1";
                }
            });
        }
    } else if (entryMethod.newAccount === 1 && bypassKey === true) {
        if (leaderImageId === baseImageId) {
            alert("Please choose 2 different characters");
            return;
        } else {
            splitShopCharacters();

            fetch(`${API_BASE_URL}/api/players`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: submitUsername,
                    password: submitPassword,
                    characterList: characterList,      
                    leaderImageId: leaderImageId,      
                    baseImageId: baseImageId,
                    shop1List: shop1List,
                    shop2List: shop2List,
                    shop3List: shop3List,           
                    shop4List: shop4List,
                    bypassKey: bypassKey
                })
            })
            .then(async res => {
                if (res.status === 409) {
                    const data = await res.json();
                    alert(data.error); // Or show a message in your UI
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (data) {
                    // currentUsername = submitUsername;
                    // Proceed with account creation success

                    document.body.style.backgroundImage = "url('images/background1.png')";
                    selectFcardDiv.style.display = "none";
                    selectLeaderDiv.style.display = "none";
                    createHeaderTwo.style.display = "none";
                    inputUsername.style.display = "none";
                    inputPassword.style.display = "none";
                    switchToLog.style.display = "none";
                    submitButton.style.display = "none";

                    dialogueDiv.style.display = "block";
                    dialogueSpeakerImage.style.display = "block";
                    dialogueSpeaker.textContent = "???";
                    dialogueText.textContent = `Thank you for showing up ${leaderName}, we could really use your help.`;

                    dialogueProgress = "1.1";
                }
                alert("Your Heirloom and new game info has been saved. The browser will now refresh. Log in with the same username and password to continue playing.");
                window.location.reload();
            });
        }
    }
    
    if (entryMethod.logIn === 1) {
        loadLogInVariables();
    }
});

async function loadLogInVariables() {
    const response = await fetch(`${API_BASE_URL}/api/players/${submitUsername}`);
    const data = await response.json();
    if (data.password === submitPassword) {
        console.log("Login successful!");
        crossfadeMusic(currentSound, travelMusic, 4000);
        currentUsername = data.username;

        selectFcardDiv.style.display = "none";
        selectLeaderDiv.style.display = "none";
        logHeaderTwo.style.display = "none";
        inputUsername.style.display = "none";
        inputPassword.style.display = "none";
        switchToCreate.style.display = "none";
        submitButton.style.display = "none";
        
        document.body.style.backgroundImage = "url('images/maps/map_home.png')";
        homeButtonsDiv.style.display = "block";
    } else {
        console.log("unable to log in");
        alert("Incorrect username or password, please try again or create a new account");
    }
    setLeaderName();
    //load progress from DB
    await pullFactionProgress();
    await pullOwnedHeirloomsFromDB();
    // load bribed traders variables from DB
    await pullBribedTradersFromDB();
    showBribedTraders();
}

async function setLeaderName() {
    const res = await fetch(`${API_BASE_URL}/api/${currentUsername}/cards/leader`);
    const data = await res.json();
    leaderName = data.name;
}

async function pullBribedTradersFromDB() {
    const res = await fetch(`${API_BASE_URL}/api/players/${currentUsername}/bribedTraders`);
    const data = await res.json();
    if (data.ghoul_bribed === "true") {
        ghoulTraderBribed = true;
    }
    if (data.legion_bribed === "true") {
        legionTraderBribed = true;
    }
    if (data.arcane_bribed === "true") {
        arcaneTraderBribed = true;
    }
}

//creation alden dialogue
const dialogueArrow = document.getElementById("dialogue-arrow");
const homeButtonsDiv = document.getElementById("home-buttons-div");
dialogueArrow.addEventListener('click', function() {
    if (dialogueProgress === "1.1") {
        dialogueSpeaker.textContent = "ALDEN";
        dialogueText.textContent = "I am Alden. Over the years enemy factions have been taking our land for themselves. We are simple farmers and traders without real leaders to protect us."
        dialogueProgress = "1.2";
    } else if (dialogueProgress === "1.2") {
        document.body.style.backgroundImage = "url('images/maps/map_home.png')";
        dialogueText.textContent = "This island is all we have been able to keep from them, but I fear not for much longer. I know little of war, but this island was once a meeting location for the land's greatest warriors."
        dialogueProgress = "1.3";
    } else if (dialogueProgress === "1.3") {
        dialogueText.textContent = "You will need to fight the enemy factions and defeat their leaders. This will not be easy and you will need to gather more allies. Find them at Traders along your journey. It seems warriors are always looking for new weapons and armor.";
        dialogueProgress = "1.4";
    } else if (dialogueProgress === "1.4") {
        dialogueText.textContent = `Heavens bless you on this adventure ${leaderName}. Return to the island when you have defeated all the faction leaders and collected all your allies. We will FORGE a mighty heirloom and display it in the armory to remember your legacy.`;
        dialogueProgress = "1.5";
    } else if (dialogueProgress === "1.5") {
        dialogueDiv.style.display = "none";
        dialogueSpeakerImage.style.display = "none";

        homeButtonsDiv.style.display = "block";
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
    fetch(`${API_BASE_URL}/api/leader/${image_id}`)
    .then(res => res.json())
    .then(data => {
        selectLeaderImage.src = `images/leader-characters/${data.image_id}Leader.png`;
        selectLeaderHealth.textContent = data.health_max;
        selectLeaderProtection.textContent = data.initial_protection;
        selectLeaderAbility1Name.textContent = data.ability1_name;
        selectLeaderAbility1Desc.textContent = data.ability1_desc;
        selectLeaderAbility1Cost.textContent = data.ability1_cost;
        if (data.ability1_uses > 99) {
            selectLeaderAbility1Uses.innerHTML = '<img src="images/infinity-icon.png" style="width: 0.8em; height: 0.6em;">';
        } else {
            selectLeaderAbility1Uses.textContent = data.ability1_uses;
        }
        selectLeaderAbility2Name.textContent = data.ability2_name;
        selectLeaderAbility2Desc.textContent = data.ability2_desc;
        selectLeaderAbility2Cost.textContent = data.ability2_cost;
        selectLeaderAbility2Uses.textContent = data.ability2_uses;
        selectLeaderType.textContent = data.type;
        leaderName = data.name;
    })
    .catch(err => console.log(err));
}

function loadFcard(image_id) {
    fetch(`${API_BASE_URL}/api/character/${image_id}`)
    .then(res => res.json())
    .then(data => {
        selectFcardImage.src = `images/base-characters/${data.image_id}Base.png`;
        selectFcardHealth.textContent = data.health_max;
        selectFcardProtection.textContent = data.initial_protection;
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
let baseImageIds = [];
let baseImageIdsIndex = 0;

let leaderImageIds = [];
let leaderImageIdsIndex = 0;

const goldLeftArrow = document.getElementById("gold-left-arrow");
const goldRightArrow = document.getElementById("gold-right-arrow");
const silverLeftArrow = document.getElementById("silver-left-arrow");
const silverRightArrow = document.getElementById("silver-right-arrow");

let characterList = [];
let shop1List = []; // home
let shop2List = []; // ghoul
let shop3List = []; // legion
let shop4List = []; // arcane

function splitShopCharacters() { // remove leader and fcard, split rest into 4 shops randomly
    let pullFromList = characterList.slice();
    pullFromList = pullFromList.filter(id => id !== leaderImageIds[leaderImageIdsIndex] && id !== baseImageIds[baseImageIdsIndex]);

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * pullFromList.length);
        shop1List.push(pullFromList[randomIndex]);
        pullFromList.splice(randomIndex, 1);
    }
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * pullFromList.length);
        shop2List.push(pullFromList[randomIndex]);
        pullFromList.splice(randomIndex, 1);
    }
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * pullFromList.length);
        shop3List.push(pullFromList[randomIndex]);
        pullFromList.splice(randomIndex, 1);
    }
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * pullFromList.length);
        shop4List.push(pullFromList[randomIndex]);
        pullFromList.splice(randomIndex, 1);
    }
}

// Fetch all character names on page load

fetch(`${API_BASE_URL}/api/characters`)
    .then(res => res.json())
    .then(names => {
        baseImageIds = names;
        if (baseImageIds.length > 0) {
                const randomIndex = Math.floor(Math.random() * baseImageIds.length);
                loadFcard(baseImageIds[randomIndex]);
                baseImageIdsIndex = randomIndex; // <-- Set index
                // list of all names
                characterList = names;
        }
    });

fetch(`${API_BASE_URL}/api/characters`)
    .then(res => res.json())
    .then(names => {
        leaderImageIds = names;
        if (leaderImageIds.length > 0) {
                const randomIndex = Math.floor(Math.random() * leaderImageIds.length);
                loadLeader(leaderImageIds[randomIndex]);
                leaderImageIdsIndex = randomIndex; // <-- Set index
        }
    });

// Left gold arrow button
goldLeftArrow.addEventListener('click', function() {
  if (leaderImageIds.length === 0) return;
  leaderImageIdsIndex = (leaderImageIdsIndex - 1 + leaderImageIds.length) % leaderImageIds.length;
  loadLeader(leaderImageIds[leaderImageIdsIndex]);
});

// Right gold arrow button
goldRightArrow.addEventListener('click', function() {
  if (leaderImageIds.length === 0) return;
  leaderImageIdsIndex = (leaderImageIdsIndex + 1) % leaderImageIds.length;
  loadLeader(leaderImageIds[leaderImageIdsIndex]);
});

// Left silver arrow button
silverLeftArrow.addEventListener('click', function() {
  if (baseImageIds.length === 0) return;
  baseImageIdsIndex = (baseImageIdsIndex - 1 + baseImageIds.length) % baseImageIds.length;
  loadFcard(baseImageIds[baseImageIdsIndex]);
});

// Right silver arrow button
silverRightArrow.addEventListener('click', function() {
  if (baseImageIds.length === 0) return;
  baseImageIdsIndex = (baseImageIdsIndex + 1) % baseImageIds.length;
  loadFcard(baseImageIds[baseImageIdsIndex]);
});

//home buttons
// homeButtonsDiv already defined above
const legionButtonsDiv = document.getElementById("legion-buttons-div");
const banditButtonsDiv = document.getElementById("bandit-buttons-div");
const ghoulButtonsDiv = document.getElementById("ghoul-buttons-div");
const arcaneButtonsDiv = document.getElementById("arcane-buttons-div");

const homeSailButton = document.getElementById("home-sail-button");
const homeTradeButton = document.getElementById("home-trade-button");
const homeBuildButton = document.getElementById("home-build-button");
const homeAldenButton = document.getElementById("home-alden-button");

const banditSailButton = document.getElementById("bandit-sail-button");

const ghoulSailButton = document.getElementById("ghoul-sail-button");

const legionSailButton = document.getElementById("legion-sail-button");

const arcaneSailButton = document.getElementById("arcane-sail-button");

const sailingMapDiv = document.getElementById("sailing-map-div");
const sailingHomeImg = document.getElementById("sailing-home-img");
const sailingBanditImg = document.getElementById("sailing-bandit-img");
const sailingGhoulImg = document.getElementById("sailing-ghoul-img");
const sailingLegionImg = document.getElementById("sailing-legion-img");
const sailingArcaneImg = document.getElementById("sailing-arcane-img");

const battleDivs = document.getElementById("battle-divs");

// sailing buttons logic
let currentlyAt = "home";

homeSailButton.addEventListener('click', function() {
    sailingMapDiv.style.display = "block";
    sailingArcaneImg.style.filter = "blur(5px)";
    sailingBanditImg.style.filter = "blur(0px)";
    sailingGhoulImg.style.filter = "blur(0px)";
    sailingLegionImg.style.filter = "blur(0px)";
    sailingHomeImg.style.filter = "blur(0px)";


});
banditSailButton.addEventListener('click', function() {
    sailingMapDiv.style.display = "block";
    sailingArcaneImg.style.filter = "blur(5px)";
    sailingBanditImg.style.filter = "blur(0px)";
    sailingGhoulImg.style.filter = "blur(0px)";
    sailingLegionImg.style.filter = "blur(5px)";
    sailingHomeImg.style.filter = "blur(0px)";


});
ghoulSailButton.addEventListener('click', function() {
    sailingMapDiv.style.display = "block";
    sailingArcaneImg.style.filter = "blur(5px)";
    sailingBanditImg.style.filter = "blur(0px)";
    sailingGhoulImg.style.filter = "blur(0px)";
    sailingLegionImg.style.filter = "blur(5px)";
    sailingHomeImg.style.filter = "blur(0px)";


});
legionSailButton.addEventListener('click', function() {
    sailingMapDiv.style.display = "block";
    sailingArcaneImg.style.filter = "blur(0px)";
    sailingBanditImg.style.filter = "blur(5px)";
    sailingGhoulImg.style.filter = "blur(5px)";
    sailingLegionImg.style.filter = "blur(0px)";
    sailingHomeImg.style.filter = "blur(0px)";


});
arcaneSailButton.addEventListener('click', function() {
    sailingMapDiv.style.display = "block";
    sailingArcaneImg.style.filter = "blur(0px)";
    sailingBanditImg.style.filter = "blur(5px)";
    sailingGhoulImg.style.filter = "blur(5px)";
    sailingLegionImg.style.filter = "blur(0px)";
    sailingHomeImg.style.filter = "blur(5px)";


});
//clickable images for sailing
let sailingTo = "";

function pirateEncounterChance() {
    const chance = Math.random();
    const chance2 = Math.random();

    console.log("sailed to " + sailingTo);
    console.log("chance was ", chance);

    if (sailingTo === "home") {
        if (chance < 0.1) { // 10% chance
            currentlyAt = "pirate";
            leaderBattle = false;
            difficulty = 1;
            document.body.style.backgroundImage = "url('images/battlegrounds/ground_pirate.png')";

            initializeBattle();
        } else {
            document.body.style.backgroundImage = "url('images/maps/map_home.png')";
            homeButtonsDiv.style.display = "block";
            currentlyAt = "home";

            showFactionButtons();
        }
    }
    if (sailingTo === "bandit") {
        if (chance < 0.2) { // 20% chance
            currentlyAt = "pirate";
            leaderBattle = false;
            difficulty = 2;
            document.body.style.backgroundImage = "url('images/battlegrounds/ground_pirate.png')";

            initializeBattle();
        } else {
            document.body.style.backgroundImage = "url('images/maps/map_bandit.png')";
            banditButtonsDiv.style.display = "block";
            currentlyAt = "bandit";
            showFactionButtons();
        }
    }
    if (sailingTo === "ghoul") {
        if (chance < 0.3) { // 30% chance
            currentlyAt = "pirate";
            leaderBattle = false;
            difficulty = 3;
            document.body.style.backgroundImage = "url('images/battlegrounds/ground_pirate.png')";

            initializeBattle();
        } else {
            document.body.style.backgroundImage = "url('images/maps/map_ghoul.png')";
            ghoulButtonsDiv.style.display = "block";
            currentlyAt = "ghoul";
            showFactionButtons();
        }
    }
    if (sailingTo === "legion") {
        if (chance < 0.4) { // 40% chance
            console.log("chance2 was ", chance2);
            if (chance2 < 0.05) { // 5% chance (2% overall)
                currentlyAt = "pirate";
                leaderBattle = true;
                difficulty = 6;
                document.body.style.backgroundImage = "url('images/battlegrounds/ground_pirate.png')";

                initializeBattle();
            } else {
                currentlyAt = "pirate";
                leaderBattle = false;
                difficulty = 4;
                document.body.style.backgroundImage = "url('images/battlegrounds/ground_pirate.png')";

                initializeBattle();
            }
        } else {
            document.body.style.backgroundImage = "url('images/maps/map_legion.png')";
            legionButtonsDiv.style.display = "block";
            currentlyAt = "legion";
            showFactionButtons();
        }
    }
    if (sailingTo === "arcane") {
        if (chance < 0.5) { // 50% chance
            console.log("chance2 was ", chance2);
            if (chance2 < 0.1) { // 10% chance (5% overall)
                currentlyAt = "pirate";
                leaderBattle = true;
                difficulty = 6;
                document.body.style.backgroundImage = "url('images/battlegrounds/ground_pirate.png')";

                initializeBattle();
            } else {
               currentlyAt = "pirate";
                leaderBattle = false;
                difficulty = 5;
                document.body.style.backgroundImage = "url('images/battlegrounds/ground_pirate.png')";

                initializeBattle(); 
            }
        } else {
            document.body.style.backgroundImage = "url('images/maps/map_arcane.png')";
            arcaneButtonsDiv.style.display = "block";
            currentlyAt = "arcane";
            showFactionButtons();
        }
    }
}

sailingHomeImg.addEventListener('click', function() {
    if (currentlyAt === "arcane") {
        // do nothing
    } else {
        sailingMapDiv.style.display = "none";
        ghoulButtonsDiv.style.display = "none";
        legionButtonsDiv.style.display = "none";
        banditButtonsDiv.style.display = "none";
        arcaneButtonsDiv.style.display = "none";
        sailingTo = "home";

        pirateEncounterChance();
    }
});
sailingArcaneImg.addEventListener('click', function() {
    if (currentlyAt === "home" || currentlyAt === "ghoul" || currentlyAt === "bandit") {
        //do nothing
    } else {
        sailingMapDiv.style.display = "none";
        homeButtonsDiv.style.display = "none";
        legionButtonsDiv.style.display = "none";
        banditButtonsDiv.style.display = "none";
        ghoulButtonsDiv.style.display = "none";
        sailingTo = "arcane";

        pirateEncounterChance();
    }
});
sailingBanditImg.addEventListener('click', function() {
    if (currentlyAt === "arcane" || currentlyAt === "legion") {
        // do nothing
    } else {
        sailingMapDiv.style.display = "none";
        homeButtonsDiv.style.display = "none";
        legionButtonsDiv.style.display = "none";
        arcaneButtonsDiv.style.display = "none";
        ghoulButtonsDiv.style.display = "none";
        sailingTo = "bandit";

        pirateEncounterChance();
    }
});
sailingGhoulImg.addEventListener('click', function() {
    if (currentlyAt === "arcane" || currentlyAt === "legion") {
        // do nothing
    } else {
        sailingMapDiv.style.display = "none";
        homeButtonsDiv.style.display = "none";
        legionButtonsDiv.style.display = "none";
        banditButtonsDiv.style.display = "none";
        arcaneButtonsDiv.style.display = "none";
        sailingTo = "ghoul";

        pirateEncounterChance();
    }
});
sailingLegionImg.addEventListener('click', function() {
    if (currentlyAt === "bandit" || currentlyAt === "ghoul") {
        // do nothing
    } else {
        sailingMapDiv.style.display = "none";
        homeButtonsDiv.style.display = "none";
        ghoulButtonsDiv.style.display = "none";
        banditButtonsDiv.style.display = "none";
        arcaneButtonsDiv.style.display = "none";
        sailingTo = "legion";

        pirateEncounterChance();
    }
});



function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let difficulty = 1;

const difficulties = {
    bandit: {
        1: { minEnemies: 1, maxEnemies: 3, reward: 100 },
        2: { minEnemies: 2, maxEnemies: 4, reward: 200 },
        3: { minEnemies: 3, maxEnemies: 5, reward: 300 },
        4: { minEnemies: 4, maxEnemies: 6, reward: 400 },
        5: { minEnemies: 5, maxEnemies: 7, reward: 500 },
        6: { minEnemies: 6, maxEnemies: 6, reward: 600 }
    },
    pirate: {
        1: { minEnemies: 1, maxEnemies: 3, reward: 300 },
        2: { minEnemies: 2, maxEnemies: 4, reward: 400 },
        3: { minEnemies: 3, maxEnemies: 5, reward: 500 },
        4: { minEnemies: 4, maxEnemies: 6, reward: 600 },
        5: { minEnemies: 5, maxEnemies: 7, reward: 700 },
        6: { minEnemies: 6, maxEnemies: 6, reward: 800 }
    },
    ghoul: {
        1: { minEnemies: 1, maxEnemies: 3, reward: 500 },
        2: { minEnemies: 2, maxEnemies: 4, reward: 600 },
        3: { minEnemies: 3, maxEnemies: 5, reward: 700 },
        4: { minEnemies: 4, maxEnemies: 6, reward: 800 },
        5: { minEnemies: 5, maxEnemies: 7, reward: 900 },
        6: { minEnemies: 6, maxEnemies: 6, reward: 1000 }
    },
    legion: {
        1: { minEnemies: 1, maxEnemies: 3, reward: 700 },
        2: { minEnemies: 2, maxEnemies: 4, reward: 800 },
        3: { minEnemies: 3, maxEnemies: 5, reward: 900 },
        4: { minEnemies: 4, maxEnemies: 6, reward: 1000 },
        5: { minEnemies: 5, maxEnemies: 7, reward: 1100 },
        6: { minEnemies: 6, maxEnemies: 6, reward: 1200 }
    },
    arcane: {
        1: { minEnemies: 1, maxEnemies: 3, reward: 900 },
        2: { minEnemies: 2, maxEnemies: 4, reward: 1000 },
        3: { minEnemies: 3, maxEnemies: 5, reward: 1100 },
        4: { minEnemies: 4, maxEnemies: 6, reward: 1200 },
        5: { minEnemies: 5, maxEnemies: 7, reward: 1300 },
        6: { minEnemies: 6, maxEnemies: 6, reward: 1400 }
    }
};

let leaderBattle = false;

function randomEnemy(difficulty) {
    const settings = difficulties[difficulty];
    let numEnemies = randomBetween(settings.minEnemies, settings.maxEnemies);

    if (leaderBattle === true) {
        document.getElementById(`enemy1-ability2-name`).style.display = "block";
        document.getElementById(`enemy1-ability2-desc`).style.display = "block";
        document.getElementById(`enemy1-ability3-name`).style.display = "block";
        document.getElementById(`enemy1-ability3-desc`).style.display = "block";
        playEnemyLeader();

        for (let i = 2; i <= 7; i++) {
            fetch(`${API_BASE_URL}/api/enemies/type/${currentlyAt}`)
                .then(res => res.json())
                .then(enemies => {
                    chosenEnemy = enemies[randomBetween(0, enemies.length - 1)];

                    document.getElementById(`enemy${i}-div`).style.display = "block";
                    document.getElementById(`enemy${i}-img`).src = `images/enemies/${chosenEnemy.image_id}.png`;
                    document.getElementById(`enemy${i}-health`).textContent = chosenEnemy.health_max;
                    document.getElementById(`enemy${i}-protection`).textContent = chosenEnemy.initial_protection;
                    document.getElementById(`enemy${i}-ability1-name`).textContent = chosenEnemy.ability1_name;
                    document.getElementById(`enemy${i}-ability1-desc`).textContent = chosenEnemy.ability1_desc;

                })
                .catch(err => console.log(err));
        }
    } else {
        //code debt (improvement) fetch data once then use to random select
        for (let i = 1; i <= numEnemies; i++) {
            fetch(`${API_BASE_URL}/api/enemies/type/${currentlyAt}`)
            .then(res => res.json())
            .then(enemies => {
                chosenEnemy = enemies[randomBetween(0, enemies.length - 1)];

                document.getElementById(`enemy${i}-div`).style.display = "block";
                document.getElementById(`enemy${i}-img`).src = `images/enemies/${chosenEnemy.image_id}.png`;
                document.getElementById(`enemy${i}-health`).textContent = chosenEnemy.health_max;
                document.getElementById(`enemy${i}-protection`).textContent = chosenEnemy.initial_protection;
                document.getElementById(`enemy${i}-ability1-name`).textContent = chosenEnemy.ability1_name;
                document.getElementById(`enemy${i}-ability1-desc`).textContent = chosenEnemy.ability1_desc;
                document.getElementById(`enemy1-ability2-name`).style.display = "none";
                document.getElementById(`enemy1-ability2-desc`).style.display = "none";
                document.getElementById(`enemy1-ability3-name`).style.display = "none";
                document.getElementById(`enemy1-ability3-desc`).style.display = "none";
            })
            .catch(err => console.log(err));
        }
    }
}

async function playEnemyLeader() {
    try {
    const response = await fetch(`${API_BASE_URL}/api/enemy_leader/${currentlyAt}`);
        const data = await response.json();
        // If data is an array, use the first element
        const leader = Array.isArray(data) ? data[0] : data;

        document.getElementById(`enemy1-div`).style.display = "block";
        document.getElementById(`enemy1-img`).src = `images/enemies/${leader.image_id}.png`;
        document.getElementById(`enemy1-health`).textContent = leader.health_max;
        document.getElementById(`enemy1-protection`).textContent = leader.initial_protection;
        document.getElementById(`enemy1-ability1-name`).textContent = leader.ability1_name;
        document.getElementById(`enemy1-ability1-desc`).textContent = leader.ability1_desc;
        document.getElementById(`enemy1-ability2-name`).textContent = leader.ability2_name;
        document.getElementById(`enemy1-ability2-desc`).textContent = leader.ability2_desc;
        document.getElementById(`enemy1-ability3-name`).textContent = leader.ability3_name;
        document.getElementById(`enemy1-ability3-desc`).textContent = leader.ability3_desc;
    } catch (err) {
        console.log(err);
    }
}


//not normal to create tables per user (for larger use applications)
//upgrades purchased in a different table applied to character as they're played
async function playLeader(username) {
    const response = await fetch(`${API_BASE_URL}/api/${username}/cards/leader`);
    const data = await response.json();
    leaderName = data.name;
    await checkAbilityStatus(data);

    document.getElementById('char1-div').style.display = 'block';
    document.getElementById(`char1-img`).src = `images/leader-characters/${data.image_id}Leader.png`;
    document.getElementById(`char1-health`).textContent = data.health_max;
    document.getElementById(`char1-protection`).textContent = data.initial_protection;
    if (ab1Upgraded === true) {
        document.getElementById(`char1-ability1-name`).style.color = "goldenrod";
    } else {
        document.getElementById(`char1-ability1-name`).style.color = "blue";
    }
    document.getElementById(`char1-ability1-name`).textContent = data.ability1_name;
    document.getElementById(`char1-ability1-desc`).textContent = data.ability1_desc;
    document.getElementById(`char1-ability1-cost`).textContent = data.ability1_cost;
    if (data.ability1_uses > 99) {
        document.getElementById(`char1-ability1-uses`).innerHTML = '<img src="images/infinity-icon.png" style="width: 1.2em; height: 0.8em;">';
    } else {
        document.getElementById(`char1-ability1-uses`).textContent = data.ability1_uses;
    }
    if (ab2Upgraded === true) {
        document.getElementById(`char1-ability2-name`).style.color = "goldenrod";
    } else {
        document.getElementById(`char1-ability2-name`).style.color = "purple";
    }
    document.getElementById(`char1-ability2-name`).textContent = data.ability2_name;
    document.getElementById(`char1-ability2-desc`).textContent = data.ability2_desc;
    document.getElementById(`char1-ability2-cost`).textContent = data.ability2_cost;
    document.getElementById(`char1-ability2-uses`).textContent = data.ability2_uses;
}
        

let deckCount = 1;
let deckCards = [];

let energyCount = 4;
let maxEnergy = 4;

let openCharDivs = [];
let nextOpenCharDiv = null;


function showDeck() {
    if (deckCount > 2) {
        document.getElementById("deck-img").src = "images/deckplus.png"; 
        document.getElementById("deck-img").style.filter = "blur(0px)";
    } else if (deckCount === 2) {
        document.getElementById("deck-img").src = "images/deck2.png";
        document.getElementById("deck-img").style.filter = "blur(0px)";
    } else if (deckCount === 1) {
        document.getElementById("deck-img").src = "images/deck1.png";
        document.getElementById("deck-img").style.filter = "blur(0px)";
    } else if (deckCount === 0) {
        document.getElementById("deck-img").src = "images/deck1.png";
        document.getElementById("deck-img").style.filter = "blur(2px)";
    }
}

//find next open character div
function findNextOpenCharDiv() {
    openCharDivs = [];
    for (let i = 1; i <= 7; i++) {
        const charDiv = document.getElementById(`char${i}-div`);
        if (charDiv && window.getComputedStyle(charDiv).display === "none") {
            openCharDivs.push(i);
        }
    }
    if (openCharDivs.length === 0) {
        nextOpenCharDiv = null;
        alert("No more space in this battle");
    } else {
        nextOpenCharDiv = Math.min(...openCharDivs);
    }
}

//find all base character cards, populate deckCards
async function findBaseCharacterCards() {
    const res = await fetch(`${API_BASE_URL}/api/${currentUsername}/cards/base`);
    const data = await res.json();
    deckCards = data;
}

function updateBattleVariables() {
    energyCount = maxEnergy;
    document.getElementById("energy-count").textContent = energyCount;
}

async function initializeBattle() {
    battleDivs.style.display = "block";
    crossfadeMusic(currentSound, combatMusic, 4000);

    await findBaseCharacterCards();
    await findCanineSummonCards();
    await findStrongCanineSummonCards();
    await findHelperSummonCards();
    await findSmallCreatureSummonCards();
    await findLargeCreatureSummonCards();
    await findEnemySummonCards();

    maxEnergy = 3 + deckCards.length;
    deckCount = deckCards.length;

    for (let i = 1; i <= 7; i++) {
        document.getElementById(`char${i}-ability2-name`).style.display = "block";
        document.getElementById(`char${i}-ability2-desc`).style.display = "block";
        document.getElementById(`char${i}-ability2-cost`).style.display = "block";
        document.getElementById(`char${i}-ability2-uses`).style.display = "block";
    }

    updateBattleVariables();

    showDeck();

    randomEnemy(difficulty);

    playLeader(currentUsername);


    document.getElementById("enemy-turn-img").style.display = "none";
    document.getElementById("player-turn-img").style.display = "block";
}

async function checkAbilityStatus(cardData) {
    if (cardData.ability2_name === "Prime Guard" || cardData.ability2_name === "Blaze of Truth" || cardData.ability2_name === "Prime Aim" || cardData.ability2_name === "Complete Circuit" || cardData.ability2_name === "Call Large Creature" || cardData.ability2_name === "Ethereal Wound" || cardData.ability2_name === "Guardian Archangel" || cardData.ability2_name === "Richer Recipe" || cardData.ability2_name === "Rock Out" || cardData.ability2_name === "Tsunami" || cardData.ability2_name === "Extra Morphine" || cardData.ability2_name === "More Helpers" || cardData.ability2_name === "Agile Defense" || cardData.ability2_name === "Cortana" || cardData.ability2_name === "Whistle" || cardData.ability2_name === "Favorable Timeline" || cardData.ability2_name === "Prime Speed" || cardData.ability2_name === "Monkey Do Better") {
        ab2Upgraded = true;
    } else {
        ab2Upgraded = false;
    }

    if (cardData.ability1_name === "Triple Gate" || cardData.ability1_name === "Searing Blade" || cardData.ability1_name === "High Caliber" || cardData.ability1_name === "Amp Up" || cardData.ability1_name === "Wave of Light" || cardData.ability1_name === "Blur of Arrows" || cardData.ability1_name === "Holy Blades" || cardData.ability1_name === "Potion Volley" || cardData.ability1_name === "Jam Out" || cardData.ability1_name === "Blood Bending" || cardData.ability1_name === "I.C.U." || cardData.ability1_name === "Upload Virus" || cardData.ability1_name === "Elven Strength" || cardData.ability1_name === "Spartan Accuracy" || cardData.ability1_name === "Howl of the Alpha" || cardData.ability1_name === "Predictor" || cardData.ability1_name === "Relocation" || cardData.ability1_name === "Monekey See Better") {
        ab1Upgraded = true;
    } else {
        ab1Upgraded = false;
    }
}

ab1Upgraded = false;
ab2Upgraded = false;

//play card drawn from deck
async function playDrawnCard() {

    const randomDraw = Math.floor(Math.random() * deckCards.length);
    const drawnCard = deckCards[randomDraw];
    await checkAbilityStatus(drawnCard);

    document.getElementById(`char${nextOpenCharDiv}-div`).style.display = "block";
    document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/base-characters/${drawnCard.image_id}Base.png`;
    document.getElementById(`char${nextOpenCharDiv}-health`).textContent = drawnCard.health_max;
    document.getElementById(`char${nextOpenCharDiv}-protection`).textContent = drawnCard.initial_protection;
    document.getElementById(`char${nextOpenCharDiv}-ability1-name`).textContent = drawnCard.ability1_name;
    if (ab1Upgraded === true) {
        document.getElementById(`char${nextOpenCharDiv}-ability1-name`).style.color = "goldenrod";
    } else {
        document.getElementById(`char${nextOpenCharDiv}-ability1-name`).style.color = "blue";
    }
    document.getElementById(`char${nextOpenCharDiv}-ability1-desc`).textContent = drawnCard.ability1_desc;
    document.getElementById(`char${nextOpenCharDiv}-ability1-cost`).textContent = drawnCard.ability1_cost;
    if (drawnCard.ability1_uses > 99) {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).innerHTML = '<img src="images/infinity-icon.png" style="width: 1.2em; height: 0.8em;">';
    } else {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).textContent = drawnCard.ability1_uses;
    }
    
    document.getElementById(`char${nextOpenCharDiv}-ability2-name`).style.display = "block";
    if (ab2Upgraded === true) {
        document.getElementById(`char${nextOpenCharDiv}-ability2-name`).style.color = "goldenrod";
    } else {
        document.getElementById(`char${nextOpenCharDiv}-ability2-name`).style.color = "purple";
    }
    document.getElementById(`char${nextOpenCharDiv}-ability2-desc`).style.display = "block";
    document.getElementById(`char${nextOpenCharDiv}-ability2-cost`).style.display = "block";
    document.getElementById(`char${nextOpenCharDiv}-ability2-uses`).style.display = "block";

    document.getElementById(`char${nextOpenCharDiv}-ability2-name`).textContent = drawnCard.ability2_name;
    document.getElementById(`char${nextOpenCharDiv}-ability2-desc`).textContent = drawnCard.ability2_desc;
    document.getElementById(`char${nextOpenCharDiv}-ability2-cost`).textContent = drawnCard.ability2_cost;
    document.getElementById(`char${nextOpenCharDiv}-ability2-uses`).textContent = drawnCard.ability2_uses;
    

    deckCards.splice(randomDraw, 1);
};

smallCreatureCards = [];

// find creature summon cards
async function findSmallCreatureSummonCards() {
    const res = await fetch(`${API_BASE_URL}/api/summons/small-creature`);
    const data = await res.json();
    smallCreatureCards = data;
}

// play a small creature card
function summonSmallCreature() {
    const randomSmallCreature = Math.floor(Math.random() * smallCreatureCards.length);
    const drawnSmallCreature = smallCreatureCards[randomSmallCreature];

    document.getElementById(`char${nextOpenCharDiv}-div`).style.display = "block";
    // if leaderName = Maggie
    if (leaderName === "Maggie") {
        document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/leader-summons/${drawnSmallCreature.image_id}Leader.png`;
    } else {
        document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/base-summons/${drawnSmallCreature.image_id}Base.png`;
    }
    document.getElementById(`char${nextOpenCharDiv}-health`).textContent = drawnSmallCreature.health_max;
    document.getElementById(`char${nextOpenCharDiv}-protection`).textContent = drawnSmallCreature.initial_protection;
    document.getElementById(`char${nextOpenCharDiv}-ability1-name`).textContent = drawnSmallCreature.ability1_name;
    document.getElementById(`char${nextOpenCharDiv}-ability1-desc`).textContent = drawnSmallCreature.ability1_desc;
    document.getElementById(`char${nextOpenCharDiv}-ability1-cost`).textContent = drawnSmallCreature.ability1_cost;
    if (drawnSmallCreature.ability1_uses > 99) {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).innerHTML = '<img src="images/infinity-icon.png" style="width: 1.2em; height: 0.8em;">';
    } else {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).textContent = drawnSmallCreature.ability1_uses;
    }

    document.getElementById(`char${nextOpenCharDiv}-ability2-name`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-desc`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-cost`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-uses`).style.display = "none";

    smallCreatureCards.splice(randomSmallCreature, 1);

    document.getElementById(`char${nextOpenCharDiv}-div`).style.border = "2px solid limegreen";
}

largeCreatureCards = [];

// find creature summon cards
async function findLargeCreatureSummonCards() {
    const res = await fetch(`${API_BASE_URL}/api/summons/large-creature`);
    const data = await res.json();
    largeCreatureCards = data;
}

// play a large creature card
function summonLargeCreature() {
    const randomLargeCreature = Math.floor(Math.random() * largeCreatureCards.length);
    const drawnLargeCreature = largeCreatureCards[randomLargeCreature];

    document.getElementById(`char${nextOpenCharDiv}-div`).style.display = "block";
    // if leaderName = Maggie
    if (leaderName === "Maggie") {
        document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/leader-summons/${drawnLargeCreature.image_id}Leader.png`;
    } else {
        document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/base-summons/${drawnLargeCreature.image_id}Base.png`;
    }
    document.getElementById(`char${nextOpenCharDiv}-health`).textContent = drawnLargeCreature.health_max;
    document.getElementById(`char${nextOpenCharDiv}-protection`).textContent = drawnLargeCreature.initial_protection;
    document.getElementById(`char${nextOpenCharDiv}-ability1-name`).textContent = drawnLargeCreature.ability1_name;
    document.getElementById(`char${nextOpenCharDiv}-ability1-name`).style.color = "goldenrod";
    document.getElementById(`char${nextOpenCharDiv}-ability1-desc`).textContent = drawnLargeCreature.ability1_desc;
    document.getElementById(`char${nextOpenCharDiv}-ability1-cost`).textContent = drawnLargeCreature.ability1_cost;
    if (drawnLargeCreature.ability1_uses > 99) {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).innerHTML = '<img src="images/infinity-icon.png" style="width: 1.2em; height: 0.8em;">';
    } else {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).textContent = drawnLargeCreature.ability1_uses;
    }

    document.getElementById(`char${nextOpenCharDiv}-ability2-name`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-desc`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-cost`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-uses`).style.display = "none";

    largeCreatureCards.splice(randomLargeCreature, 1);

    document.getElementById(`char${nextOpenCharDiv}-div`).style.border = "2px solid limegreen";
}

helperCards = [];

// find helper summon cards
async function findHelperSummonCards() {
    const res = await fetch(`${API_BASE_URL}/api/summons/helper`);
    const data = await res.json();
    helperCards = data;
}

// play a helper card
function summonHelper() {
    const randomHelper = Math.floor(Math.random() * helperCards.length);
    const drawnHelper = helperCards[randomHelper];

    document.getElementById(`char${nextOpenCharDiv}-div`).style.display = "block";
    // if leaderName = Pasha
    if (leaderName === "Pasha") {
        document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/leader-summons/${drawnHelper.image_id}Leader.png`;
    } else {
        document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/base-summons/${drawnHelper.image_id}Base.png`;
    }
    document.getElementById(`char${nextOpenCharDiv}-health`).textContent = drawnHelper.health_max;
    document.getElementById(`char${nextOpenCharDiv}-protection`).textContent = drawnHelper.initial_protection;
    document.getElementById(`char${nextOpenCharDiv}-ability1-name`).textContent = drawnHelper.ability1_name;
    if (charAbilitySelectedName === "More Helpers") {
        document.getElementById(`char${nextOpenCharDiv}-ability1-name`).style.color = "goldenrod";
    } else {
        document.getElementById(`char${nextOpenCharDiv}-ability1-name`).style.color = "purple";
    }
    document.getElementById(`char${nextOpenCharDiv}-ability1-desc`).textContent = drawnHelper.ability1_desc;
    document.getElementById(`char${nextOpenCharDiv}-ability1-cost`).textContent = drawnHelper.ability1_cost;
    if (drawnHelper.ability1_uses > 99) {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).innerHTML = '<img src="images/infinity-icon.png" style="width: 1.2em; height: 0.8em;">';
    } else {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).textContent = drawnHelper.ability1_uses;
    }

    document.getElementById(`char${nextOpenCharDiv}-ability2-name`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-desc`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-cost`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-uses`).style.display = "none";

    if (helperCards.length > 1) {
        helperCards.splice(randomHelper, 1);
    }

    document.getElementById(`char${nextOpenCharDiv}-div`).style.border = "2px solid limegreen";
}

canineCards = [];

// find canine summon cards
async function findCanineSummonCards() {
    const res = await fetch(`${API_BASE_URL}/api/summons/canine`);
    const data = await res.json();
    canineCards = data;
}

// play a canine card
function summonCanine() {
    const randomCanine = Math.floor(Math.random() * canineCards.length);
    const drawnCanine = canineCards[randomCanine];

    document.getElementById(`char${nextOpenCharDiv}-div`).style.display = "block";
    // if leaderName = wilder
    if (leaderName === "Wilder") {
        document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/leader-summons/${drawnCanine.image_id}Leader.png`;
    } else {
        document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/base-summons/${drawnCanine.image_id}Base.png`;
    }
    document.getElementById(`char${nextOpenCharDiv}-health`).textContent = drawnCanine.health_max;
    document.getElementById(`char${nextOpenCharDiv}-protection`).textContent = drawnCanine.initial_protection;
    document.getElementById(`char${nextOpenCharDiv}-ability1-name`).textContent = drawnCanine.ability1_name;
    document.getElementById(`char${nextOpenCharDiv}-ability1-desc`).textContent = drawnCanine.ability1_desc;
    document.getElementById(`char${nextOpenCharDiv}-ability1-cost`).textContent = drawnCanine.ability1_cost;
    if (drawnCanine.ability1_uses > 99) {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).innerHTML = '<img src="images/infinity-icon.png" style="width: 1.2em; height: 0.8em;">';
    } else {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).textContent = drawnCanine.ability1_uses;
    }

    document.getElementById(`char${nextOpenCharDiv}-ability2-name`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-desc`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-cost`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-uses`).style.display = "none";

    canineCards.splice(randomCanine, 1);

    document.getElementById(`char${nextOpenCharDiv}-div`).style.border = "2px solid limegreen";
}

strongCanineCards = [];

// find strong canine summon cards
async function findStrongCanineSummonCards() {
    const res = await fetch(`${API_BASE_URL}/api/summons/strong-canine`);
    const data = await res.json();
    strongCanineCards = data;
}

// play a  strong canine card
function summonStrongCanine() {
    const randomCanine = Math.floor(Math.random() * strongCanineCards.length);
    const drawnCanine = strongCanineCards[randomCanine];

    document.getElementById(`char${nextOpenCharDiv}-div`).style.display = "block";
    // if leaderName = wilder
    if (leaderName === "Wilder") {
        document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/leader-summons/${drawnCanine.image_id}Leader.png`;
    } else {
        document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/base-summons/${drawnCanine.image_id}Base.png`;
    }
    document.getElementById(`char${nextOpenCharDiv}-health`).textContent = drawnCanine.health_max;
    document.getElementById(`char${nextOpenCharDiv}-protection`).textContent = drawnCanine.initial_protection;
    document.getElementById(`char${nextOpenCharDiv}-ability1-name`).textContent = drawnCanine.ability1_name;
    document.getElementById(`char${nextOpenCharDiv}-ability1-name`).style.color = "goldenrod";
    document.getElementById(`char${nextOpenCharDiv}-ability1-desc`).textContent = drawnCanine.ability1_desc;
    document.getElementById(`char${nextOpenCharDiv}-ability1-cost`).textContent = drawnCanine.ability1_cost;
    if (drawnCanine.ability1_uses > 99) {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).innerHTML = '<img src="images/infinity-icon.png" style="width: 1.2em; height: 0.8em;">';
    } else {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).textContent = drawnCanine.ability1_uses;
    }

    document.getElementById(`char${nextOpenCharDiv}-ability2-name`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-desc`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-cost`).style.display = "none";
    document.getElementById(`char${nextOpenCharDiv}-ability2-uses`).style.display = "none";

    canineCards.splice(randomCanine, 1);

    document.getElementById(`char${nextOpenCharDiv}-div`).style.border = "2px solid limegreen";
}

//Clicking on the deck
document.getElementById("deck-img").addEventListener("click", async function() {
    if (waiting === true || abilityProgress !== 1) {
        return;
    } else {
        findNextOpenCharDiv();
        if (energyCount >= 2 && deckCount > 0 && nextOpenCharDiv !== null) {
            // Logic to draw a card from the deck
            await playDrawnCard();

            energyCount -= 2; //subtract 2 from current value of energyCount
            document.getElementById("energy-count").textContent = energyCount;
            deckCount -= 1;

            showDeck();

        } else if (energyCount <2) {
            alert("Not enough energy (2) to draw another card");
        } else if (deckCount <1) {
            alert("No more cards in the deck");
        } else if (nextOpenCharDiv > 6) {
            alert("No more battle space for another character");
        }
        // console.log("Deck Click! ----------------");
        // console.log(`energyCount: ${energyCount}`);
        // console.log(`deckCount: ${deckCount}`);
        // console.log(`nextOpenDiv: ${nextOpenCharDiv}`);
    }
});

let waiting = false;

function waitUntilFinished(status) {
    waiting = status;

    if (waiting === true) {
        return;
    }
}

let charClickSelected = false;
let charClickedDiv = null;
let charClickedApplyToDiv = null;
let charClickedDivNumber = null;
let charFirstClickedDivNumber = null;

let abilityProgress = 1;

let charAbilitySelected = false;
let charAbilitySelectedName = "";
let charAbilitySelectedUses = null;
let charAbilitySelectedNumber = null;
let charAbilitySelectedType = "";
let charHealthMax = null;

let enemyClicked = false;
let enemyClickedDiv = null;
let enemyClickedDivNumber = null;
let enemyHealthMax = null;

//reset borders, clear variables
function resetCharSelection() { //also resets ability selection and enemy target selection
    charClickSelected = false;
    charClickedDiv = null;
    charClickedApplyToDiv = null;
    charClickedDivNumber = null;
    charFirstClickedDivNumber = null;

    abilityProgress = 1;

    charAbilitySelected = false;
    charAbilitySelectedName = "";
    charAbilitySelectedUses = null;
    charAbilitySelectedNumber = null;
    charAbilitySelectedType = "";
    charHealthMax = null;

    enemyClicked = false;
    enemyClickedDiv = null;
    enemyClickedDivNumber = null;
    enemyHealthMax = null;

    for (let i = 1; i <= 7; i++) { // resets character borders, ability selections, health color
        const charDiv = document.getElementById(`char${i}-div`);
        if (charDiv) {
            charDiv.style.border = "";
            document.getElementById(`char${i}-ability1-name`).style.backgroundColor = "";
            document.getElementById(`char${i}-ability2-name`).style.backgroundColor = "";
        }
    }
    for (let i = 1; i <= 7; i++) { // resets enemy borders
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        if (enemyDiv) {
            enemyDiv.style.border = "";
        }
    }
}

//determine character's health_max
async function getCharMaxHealth() {
    const imgElem = charClickedApplyToDiv.querySelector('img');
    let src = imgElem.src.split('/').pop(); 
    let image_id = src.replace('Base.png', '').replace('Leader.png', '');

    const res = await fetch(`${API_BASE_URL}/api/character/${image_id}`);
    const data = await res.json();
    return data.health_max;
}

//determine enemy's health_max
async function getEnemyMaxHealth() {
    const imgElem = enemyClickedDiv.querySelector('img');
    let src = imgElem.src.split('/').pop(); 
    let image_id = src.replace('.png', '');

    if (leaderBattle === true && enemyClickedDivNumber === 1) {
    const res = await fetch(`${API_BASE_URL}/api/enemy_leader/health/${image_id}`);
        const data = await res.json();
        return data.health_max;
    } else {
    const res = await fetch(`${API_BASE_URL}/api/enemy/${image_id}`);
        const data = await res.json();
        return data.health_max;
    }
}



//determine ability type
function setAbilityType() {
    // attack abilities
    if (charAbilitySelectedName === "Slash" || charAbilitySelectedName === "Blood Bending" || charAbilitySelectedName === "Triple Gate" || charAbilitySelectedName === "Searing Blade" || charAbilitySelectedName === "High Caliber" || charAbilitySelectedName === "Acid Vial" || charAbilitySelectedName === "J.ustice O.r N.othing" || charAbilitySelectedName === "Hunt" || charAbilitySelectedName === "Tackle" || charAbilitySelectedName === "Scratch" || charAbilitySelectedName === "Howl" || charAbilitySelectedName === "Bark" || charAbilitySelectedName === "Hunt Command" || charAbilitySelectedName === "Tackle Command" || charAbilitySelectedName === "Scratch Command" || charAbilitySelectedName === "Howl Command" || charAbilitySelectedName === "Bark Command" || charAbilitySelectedName === "Cut" || charAbilitySelectedName === "Stab" || charAbilitySelectedName === "Flame Spear" || charAbilitySelectedName === "Slice" || charAbilitySelectedName === "Triple Stab" || charAbilitySelectedName === "Stomp" || charAbilitySelectedName === "Precision Shot" || charAbilitySelectedName === "Sharp Shot" || charAbilitySelectedName === "Bash" || charAbilitySelectedName === "Claw" || charAbilitySelectedName === "Gut" || charAbilitySelectedName === "Sever") {
        charAbilitySelectedType = "attack";
    }
    // attackTwo abilities
    if (charAbilitySelectedName === "Double Gate" || charAbilitySelectedName === "Rapid Fire" || charAbilitySelectedName === "Blur of Arrows" || charAbilitySelectedName === "Bash and Slash" || charAbilitySelectedName === "Elven Strength" || charAbilitySelectedName === "Spartan Accuracy" || charAbilitySelectedName === "Swinging Slash" || charAbilitySelectedName === "Crush" || charAbilitySelectedName === "Yowl" || charAbilitySelectedName === "Tail Whip" || charAbilitySelectedName === "Razor Talons" || charAbilitySelectedName === "Blade Volley" || charAbilitySelectedName === "Quick Fire" || charAbilitySelectedName === "Water Whip" || charAbilitySelectedName === "Potion Volley" || charAbilitySelectedName === "Wide Slash") {
        charAbilitySelectedType = "attackTwo";
    }
    // attackAll
    if (charAbilitySelectedName === "Overdrive" || charAbilitySelectedName === "Fireball" || charAbilitySelectedName === "Spinning Slash" || charAbilitySelectedName === "Rock Out" || charAbilitySelectedName === "Flood" || charAbilitySelectedName === "Tsunami" || charAbilitySelectedName === "Negative Charge" || charAbilitySelectedName === "Complete Circuit" || charAbilitySelectedName === "Dino Friends" || charAbilitySelectedName === "Quake" || charAbilitySelectedName === "Blade Tornado" || charAbilitySelectedName === "Growl" || charAbilitySelectedName === "Blast") {
        charAbilitySelectedType = "attackAll";
    }
    // Heal abilities
    if (charAbilitySelectedName === "Healthy Brew" || charAbilitySelectedName === "Richer Recipe" || charAbilitySelectedName === "Relocation" || charAbilitySelectedName === "Magic Tune" || charAbilitySelectedName === "Light of Heaven" || charAbilitySelectedName === "Guardian Archangel" || charAbilitySelectedName === "Spirit Water" || charAbilitySelectedName === "Surgery" || charAbilitySelectedName === "I.C.U." || charAbilitySelectedName === "Extra Hugs" || charAbilitySelectedName === "Smiley" || charAbilitySelectedName === "Force Heal" || charAbilitySelectedName === "Heal" || charAbilitySelectedName === "Listen") {
        charAbilitySelectedType = "heal";
    }
    // healTwo
    if (charAbilitySelectedName === "Life Mage" || charAbilitySelectedName === "Nature") {
        charAbilitySelectedType = "healTwo";
    }
    //healAll
    if (charAbilitySelectedName === "Emergency Medicine" || charAbilitySelectedName === "Yew Breeze" || charAbilitySelectedName === "Light of Creation" || charAbilitySelectedName === "Wave of Light" || charAbilitySelectedName === "Jam Out" || charAbilitySelectedName === "Inspire" || charAbilitySelectedName === "Cutie" || charAbilitySelectedName === "So Nice") {
        charAbilitySelectedType = "healAll";
    }
    // protect
    if (charAbilitySelectedName === "Foresight" || charAbilitySelectedName === "Armored Vehicle" || charAbilitySelectedName === "Obsidian Builder" || charAbilitySelectedName === "Defend" || charAbilitySelectedName === "Fly Up" || charAbilitySelectedName === "Parry") {
        charAbilitySelectedType = "protect";
    }
    // protectTwo abilities
    if (charAbilitySelectedName === "Prime Guard" || charAbilitySelectedName === "Amp Up" || charAbilitySelectedName === "Predictor" || charAbilitySelectedName === "Defensive Guard" || charAbilitySelectedName === "Shield" || charAbilitySelectedName === "Shock Shield") {
        charAbilitySelectedType = "protectTwo";
    }
    // protectAll
    if (charAbilitySelectedName === "Searing Truth" || charAbilitySelectedName === "Extra Morphine" || charAbilitySelectedName === "Blaze of Truth" || charAbilitySelectedName === "Howl of the Pack" || charAbilitySelectedName === "Howl of the Alpha" || charAbilitySelectedName === "Phalanx" || charAbilitySelectedName === "Agile Defense" || charAbilitySelectedName === "Sing" || charAbilitySelectedName === "Saber Edge") {
        charAbilitySelectedType = "protectAll";
    }
    // ignoreProtection
    if (charAbilitySelectedName === "AP Rounds" || charAbilitySelectedName === "Ice Blade" || charAbilitySelectedName === "Shock" || charAbilitySelectedName === "Frost Ray" || charAbilitySelectedName === "Prime Aim" || charAbilitySelectedName === "Ether Arrow" || charAbilitySelectedName === "Ethereal Wound" || charAbilitySelectedName === "Venom Bite" || charAbilitySelectedName === "Rush") {
        charAbilitySelectedType = "ignoreProtection";
    }
    // zeroProtection
    if (charAbilitySelectedName === "EMP" || charAbilitySelectedName === "AI Virus" || charAbilitySelectedName === "Upload Virus" || charAbilitySelectedName === "Cortana") {
        charAbilitySelectedType = "zeroProtection";
    }
    // summon 
    if (charAbilitySelectedName === "Canine Call" || charAbilitySelectedName === "Whistle" || charAbilitySelectedName === "Call for Helper" || charAbilitySelectedName === "More Helpers" || charAbilitySelectedName === "Call Small Creature" || charAbilitySelectedName === "Call Large Creature") {
        charAbilitySelectedType = "summon";
    }
    // stealHealth
    if (charAbilitySelectedName === "Fix Time" || charAbilitySelectedName === "Favorable Timeline" || charAbilitySelectedName === "Holy Blades" || charAbilitySelectedName === "Sword of Light" || charAbilitySelectedName === "Counter" || charAbilitySelectedName === "Siphon") {
        charAbilitySelectedType = "stealHealth";
    }
    // stealProtection
    if (charAbilitySelectedName === "Monkey Do" || charAbilitySelectedName === "Monkey Do Better") {
        charAbilitySelectedType = "stealProtection";
    }
    // addEnergy
    if (charAbilitySelectedName === "Expert Transport" || charAbilitySelectedName === "Prime Speed") {
        charAbilitySelectedType = "addEnergy";
    }
    // adaptAbility
    if (charAbilitySelectedName === "Monkey See" || charAbilitySelectedName === "Monkey See Better") {
        charAbilitySelectedType = "adaptAbility";
    }
}

//character ability applied to another character
async function applyCharAbilityToChar() {
    let abilityCost = parseInt(document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-cost`).textContent);
    let abilityUses = parseInt(document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent);

    // Cadenza Magic Tune ab1
    if (charAbilitySelectedName === "Magic Tune") {
        // restore 3 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 3;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // cadenza Jam Out ab1
    if (charAbilitySelectedName === "Jam Out") {
        // restore 5 health to all allies
        for (let i = 1; i <= 7; i++) {
            const charHealthElem = document.getElementById(`char${i}-health`);
            let charHealth = parseInt(charHealthElem.textContent);
            charHealth += 3;

            //make sure health doesn't exceed max, color correctly
            charClickedApplyToDiv = document.getElementById(`char${i}-div`);
            const charHealthMax = await getCharMaxHealth();
            if (charHealth >= charHealthMax) {
                charHealth = charHealthMax;
                charHealthElem.style.color = "green";
            } else {
                charHealthElem.style.color = "orange";
            }

            charHealthElem.textContent = charHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Tyrel Light of Heaven ab2
    if (charAbilitySelectedName === "Light of Heaven") {
        // restore 5 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 5;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take one away from ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Tyrel Guardian Archangel ab2
    if (charAbilitySelectedName === "Guardian Archangel") {
        // restore 10 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 10;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take one away from ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    //Kellbourne Defensive Guard ab2
    if (charAbilitySelectedName === "Defensive Guard") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 3;

        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;

            // take one away from ability uses
            abilityUses -= 1;
            document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
        }
    }
    if (charAbilitySelectedName === "Prime Guard") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 4;

        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;

            // take one away from ability uses
            abilityUses -= 1;
            document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
        }
    }
    // Veritan Searing Truth ab2
    if (charAbilitySelectedName === "Searing Truth") {
        // apply protection to all allies
        for (let i = 1; i <= 7; i++) {
            const charProtectionElem = document.getElementById(`char${i}-protection`);
            let charProtection = parseInt(charProtectionElem.textContent);
            charProtection += 3;
            charProtectionElem.textContent = charProtection;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take one away from ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Veritan Blaze of Truth ab2
    if (charAbilitySelectedName === "Blaze of Truth") {
        // apply protection to all allies
        for (let i = 1; i <= 7; i++) {
            const charProtectionElem = document.getElementById(`char${i}-protection`);
            let charProtection = parseInt(charProtectionElem.textContent);
            charProtection += 3;
            charProtectionElem.textContent = charProtection;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take one away from ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // wilder Howl of the Pack ab1
    if (charAbilitySelectedName === "Howl of the Pack") {
        // apply protection to all allies
        for (let i = 1; i <= 7; i++) {
            const charProtectionElem = document.getElementById(`char${i}-protection`);
            let charProtection = parseInt(charProtectionElem.textContent);
            charProtection += 2;
            charProtectionElem.textContent = charProtection;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // wilder Howl of the Alpha ab1
    if (charAbilitySelectedName === "Howl of the Alpha") {
        // apply protection to all allies
        for (let i = 1; i <= 7; i++) {
            const charProtectionElem = document.getElementById(`char${i}-protection`);
            let charProtection = parseInt(charProtectionElem.textContent);
            charProtection += 5;
            charProtectionElem.textContent = charProtection;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // observer Foresight ab1
    if (charAbilitySelectedName === "Foresight") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 5;
        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // clutch Armored Vehicle ab1
    if (charAbilitySelectedName === "Armored Vehicle") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 5;
        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // spect Healthy Brew ab2
    if (charAbilitySelectedName === "Healthy Brew") {
        // restore 5 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 5;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;

        // take one away from ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // spect Richer Recipe ab2
    if (charAbilitySelectedName === "Richer Recipe") {
        // restore 5 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 5;
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 5;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }
        charProtectionElem.textContent = charProtection;
        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;

        // take one away from ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // clutch relocation ab1
    if (charAbilitySelectedName === "Relocation") {
        // restore 5 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 5;
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 5;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }
        charProtectionElem.textContent = charProtection;
        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Liza Spirit Water ab1
    if (charAbilitySelectedName === "Spirit Water") {
        // restore 3 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 3;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // aris Surgery ab 1
    if (charAbilitySelectedName === "Surgery") {
        // restore 5 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 5;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // aris ICU ab 1
    if (charAbilitySelectedName === "I.C.U.") {
        // restore 10 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 10;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // aris Emergency Medicine ab2
    if (charAbilitySelectedName === "Emergency Medicine") {
        // restore 3 health to all allies
        for (let i = 1; i <= 7; i++) {
            const charHealthElem = document.getElementById(`char${i}-health`);
            let charHealth = parseInt(charHealthElem.textContent);
            charHealth += 3;

            //make sure health doesn't exceed max, color correctly
            charClickedApplyToDiv = document.getElementById(`char${i}-div`);
            const charHealthMax = await getCharMaxHealth();
            if (charHealth >= charHealthMax) {
                charHealth = charHealthMax;
                charHealthElem.style.color = "green";
            } else {
                charHealthElem.style.color = "orange";
            }

            charHealthElem.textContent = charHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take one away from ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // aris Extra Morphine ab2
    if (charAbilitySelectedName === "Extra Morphine") {
        // give 5 protection to all allies
        for (let i = 1; i <= 7; i++) {
            const charProtectionElem = document.getElementById(`char${i}-protection`);
            let charProtection = parseInt(charProtectionElem.textContent);
            charProtection += 3;
            charProtectionElem.textContent = charProtection;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take one away from ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // T`Risa Phalanx ab2
    if (charAbilitySelectedName === "Phalanx") {
        // apply protection to all allies
        for (let i = 1; i <= 7; i++) {
            const charProtectionElem = document.getElementById(`char${i}-protection`);
            let charProtection = parseInt(charProtectionElem.textContent);
            charProtection += 3;
            charProtectionElem.textContent = charProtection;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take one away from ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // T`Risa Agile Defense ab2
    if (charAbilitySelectedName === "Agile Defense") {
        // apply protection to all allies
        for (let i = 1; i <= 7; i++) {
            const charProtectionElem = document.getElementById(`char${i}-protection`);
            let charProtection = parseInt(charProtectionElem.textContent);
            charProtection += 3;
            charProtectionElem.textContent = charProtection;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take one away from ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Maggie Light of Creation ab1
    if (charAbilitySelectedName === "Light of Creation") {
        // restore 2 health to all allies
        for (let i = 1; i <= 7; i++) {
            const charHealthElem = document.getElementById(`char${i}-health`);
            let charHealth = parseInt(charHealthElem.textContent);
            charHealth += 2;

            //make sure health doesn't exceed max, color correctly
            charClickedApplyToDiv = document.getElementById(`char${i}-div`);
            const charHealthMax = await getCharMaxHealth();
            if (charHealth >= charHealthMax) {
                charHealth = charHealthMax;
                charHealthElem.style.color = "green";
            } else {
                charHealthElem.style.color = "orange";
            }

            charHealthElem.textContent = charHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Maggie Wave of Light ab1
    if (charAbilitySelectedName === "Wave of Light") {
        // restore 5 health to all allies
        for (let i = 1; i <= 7; i++) {
            const charHealthElem = document.getElementById(`char${i}-health`);
            let charHealth = parseInt(charHealthElem.textContent);
            charHealth += 3;

            //make sure health doesn't exceed max, color correctly
            charClickedApplyToDiv = document.getElementById(`char${i}-div`);
            const charHealthMax = await getCharMaxHealth();
            if (charHealth >= charHealthMax) {
                charHealth = charHealthMax;
                charHealthElem.style.color = "green";
            } else {
                charHealthElem.style.color = "orange";
            }

            charHealthElem.textContent = charHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Jo Nator Shock Shield ab1
    if (charAbilitySelectedName === "Shock Shield") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 2;

        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // Jo Nator Amp ab1
    if (charAbilitySelectedName === "Amp Up") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 8;

        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // Observer Predictor ab1
    if (charAbilitySelectedName === "Predictor") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 4;

        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // ian smiley / mayla Extra Hugs
    if (charAbilitySelectedName === "Smiley" || charAbilitySelectedName === "Extra Hugs") {
        // restore 2 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 2;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // pierre Obsidian Builder
    if (charAbilitySelectedName === "Obsidian Builder") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 2;

        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Calvin Sing
    if (charAbilitySelectedName === "Sing") {
        // apply protection to all allies
        for (let i = 1; i <= 7; i++) {
            const charProtectionElem = document.getElementById(`char${i}-protection`);
            let charProtection = parseInt(charProtectionElem.textContent);
            charProtection += 1;
            charProtectionElem.textContent = charProtection;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // tiri cutie / wallie so nice
    if (charAbilitySelectedName === "Cutie" || charAbilitySelectedName === "So Nice") {
        // restore 1 health to all allies
        for (let i = 1; i <= 7; i++) {
            const charHealthElem = document.getElementById(`char${i}-health`);
            let charHealth = parseInt(charHealthElem.textContent);
            charHealth += 1;

            //make sure health doesn't exceed max, color correctly
            charClickedApplyToDiv = document.getElementById(`char${i}-div`);
            const charHealthMax = await getCharMaxHealth();
            if (charHealth >= charHealthMax) {
                charHealth = charHealthMax;
                charHealthElem.style.color = "green";
            } else {
                charHealthElem.style.color = "orange";
            }

            charHealthElem.textContent = charHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // roran saber Edge
    if (charAbilitySelectedName === "Saber Edge") {
        // apply protection to all allies
        for (let i = 1; i <= 7; i++) {
            const charProtectionElem = document.getElementById(`char${i}-protection`);
            let charProtection = parseInt(charProtectionElem.textContent);
            charProtection += 3;
            charProtectionElem.textContent = charProtection;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // reylynn Force Heal
    if (charAbilitySelectedName === "Force Heal") {
        // restore 2 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 4;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // ear bat Listen
    if (charAbilitySelectedName === "Listen") {
        // restore 3 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 4;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Treant Nature 
    if (charAbilitySelectedName === "Nature") {
        // restore 4 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 4;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }
        
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }

        charHealthElem.textContent = charHealth;
    }
    // Rein Drake Fly Up
    if (charAbilitySelectedName === "Fly Up") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 6;
        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }

    // enemy (adapted) abilities added past here

    // bandit4 Mage Heal
    if (charAbilitySelectedName === "Heal") {
        // restore 5 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 3;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // bandit3 Armored Defend
    if (charAbilitySelectedName === "Defend") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 3;
        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // pirate3 Brigand Parry
    if (charAbilitySelectedName === "Parry") {
        // apply protection to target character
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 5;
        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // legion5 Banner Bearer Inspire / arcane5 Healer Hermit Yew Breeze
    if (charAbilitySelectedName === "Inspire" || charAbilitySelectedName === "Yew Breeze") {
        // restore 5 health to all allies
        for (let i = 1; i <= 7; i++) {
            const charHealthElem = document.getElementById(`char${i}-health`);
            let charHealth = parseInt(charHealthElem.textContent);
            charHealth += 5;

            //make sure health doesn't exceed max, color correctly
            charClickedApplyToDiv = document.getElementById(`char${i}-div`);
            const charHealthMax = await getCharMaxHealth();
            if (charHealth >= charHealthMax) {
                charHealth = charHealthMax;
                charHealthElem.style.color = "green";
            } else {
                charHealthElem.style.color = "orange";
            }

            charHealthElem.textContent = charHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // legion4 Guard Shield
    if (charAbilitySelectedName === "Shield") {
        // apply protection to target character twice
        const charProtectionElem = document.getElementById(`char${charClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += 6;

        charProtectionElem.textContent = charProtection;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // arcane2 Solar Sorceress Life Mage
    if (charAbilitySelectedName === "Life Mage") {
        // restore 4 health to target character
        const charHealthElem = document.getElementById(`char${charClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 5;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }
        
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }

        charHealthElem.textContent = charHealth;
    }
}










// character ability applied to an enemy
async function applyCharAbilityToEnemy() {
    let abilityCost = parseInt(document.getElementById(`char${charClickedDivNumber}-ability${charAbilitySelectedNumber}-cost`).textContent);
    let abilityUses = parseInt(document.getElementById(`char${charClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent);
    
    //Tyrel Slash ab1
    if (charAbilitySelectedName === "Slash") {
        // deal 5 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 5;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Tyrel Holy Blades ab1
    if (charAbilitySelectedName === "Holy Blades") {
        // deal 10 damage to selected enemy, heal self for 3
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        enemyHealth -= 7;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }
        
        enemyHealthElem.textContent = enemyHealth;

        // heal self
        const charHealthElem = document.getElementById(`char${charFirstClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 3;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Kellbourne Double Gate ab1
    if (charAbilitySelectedName === "Double Gate") {
        // deal 3 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 3;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // Kellbourne Triple Gate ab1
    if (charAbilitySelectedName === "Triple Gate") {
        // deal 10 damage
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 3;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
    }
    // Veritan Flame Strike ab1
    if (charAbilitySelectedName === "Flame Strike") {
        // deal 5 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 5;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Veritan Searing Blade ab1
    if (charAbilitySelectedName === "Searing Blade") {
        // deal 10 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 10;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // sayj Precision Shot ab1
    if (charAbilitySelectedName === "Precision Shot") {
        // deal 5 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 5;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // sayj High Caliber ab1
    if (charAbilitySelectedName === "High Caliber") {
        // deal 10 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 10;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // sayj AP Rounds ab2
    if (charAbilitySelectedName === "AP Rounds") {
        // deal 5 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        // ignoring protection
        enemyHealth -= 5;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // sayj Prime Aim ab2
    if (charAbilitySelectedName === "Prime Aim") {
        // deal 10 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        // ignoring protection
        enemyHealth -= 8;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // wilder Canine Call ab2
    if (charAbilitySelectedName === "Canine Call") {
        // summon a canine
        findNextOpenCharDiv();
        summonCanine();
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // wilder Whistle ab2
    if (charAbilitySelectedName === "Whistle") {
        // summon a canine
        findNextOpenCharDiv();
        summonStrongCanine();
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Corazon Rapid Fire ab1
    if (charAbilitySelectedName === "Rapid Fire") {
        // deal 3 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 3;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // Corazon Blur of Arrows ab1
    if (charAbilitySelectedName === "Blur of Arrows") {
        // deal 5 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 4;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // Corazon Ether Arrow ab2
    if (charAbilitySelectedName === "Ether Arrow") {
        // deal 5 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        // ignoring protection
        enemyHealth -= 5;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Corazon Ethereal Wound ab2
    if (charAbilitySelectedName === "Ethereal Wound") {
        // deal 10 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        // ignoring protection
        enemyHealth -= 8;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Observer Fix Time ab2
    if (charAbilitySelectedName === "Fix Time") {
        // deal 3 damage to selected enemy, heal self for 3
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        enemyHealth -= 3;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }
        
        enemyHealthElem.textContent = enemyHealth;

        // heal self
        const charHealthElem = document.getElementById(`char${charFirstClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 3;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Observer Favorable Timeline ab2
    if (charAbilitySelectedName === "Favorable Timeline") {
        // deal 3 damage to selected enemy, heal self for 3
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        enemyHealth -= 5;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }
        
        enemyHealthElem.textContent = enemyHealth;

        // heal self
        const charHealthElem = document.getElementById(`char${charFirstClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 5;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Clutch Expert Transport ab2
    if (charAbilitySelectedName === "Expert Transport") {
        // net +1 energy
        energyCount += 1;
        
        document.getElementById("energy-count").textContent = energyCount;

        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Clutch Prime Speed ab2
    if (charAbilitySelectedName === "Prime Speed") {
        // net +2 energy
        energyCount += 2;

        document.getElementById("energy-count").textContent = energyCount;

        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // spect Acid Vial ab1
    if (charAbilitySelectedName === "Acid Vial") {
        // deal 5 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 5;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // spect potion volley ab1
    if (charAbilitySelectedName === "Potion Volley") {
        // deal 5 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 4;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // Cadenza Overdrive ab2
    if (charAbilitySelectedName === "Overdrive") {
        // deal 2 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 2;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Cadenza Rock Out ab2
    if (charAbilitySelectedName === "Rock Out") {
        // deal 5 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 3;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Liza Blood Bending ab1
    if (charAbilitySelectedName === "Blood Bending") {
        // deal 10 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 10;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Liza Flood ab2
    if (charAbilitySelectedName === "Flood") {
        // deal 2 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 2;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Liza Tsunami ab2
    if (charAbilitySelectedName === "Tsunami") {
        // deal 5 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 3;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // pasha EMP ab1
    if (charAbilitySelectedName === "EMP") {
        // reduce enemy protection to 0
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        enemyProtectionElem.textContent = 0;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // pasha Call for Helper ab2
    if (charAbilitySelectedName === "Call for Helper") {
        // summon a helper
        findNextOpenCharDiv();
        summonHelper();
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // pasha More Helpers ab2
    if (charAbilitySelectedName === "More Helpers") {
        // summon 2 helpers
        findNextOpenCharDiv();
        summonHelper();

        findNextOpenCharDiv();
        summonHelper();
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Braynie Monkey See ab1
    if (charAbilitySelectedName === "Monkey See") {
        // adapt ability1 of target enemy
        const enemyAbilityName = document.getElementById(`enemy${enemyClickedDivNumber}-ability1-name`).textContent;
        const enemyAbilityDesc = document.getElementById(`enemy${enemyClickedDivNumber}-ability1-desc`).textContent;

        if (enemyAbilityName === "Arcane Knowledge") {
            let arcaneAbilities = ["FrostRay", "Life Mage", "Water Whip", "Fireball", "Yew Breeze", "Shock"];
            const randomIndex = Math.floor(Math.random() * arcaneAbilities.length);
            enemyAbilityName = arcaneAbilities[randomIndex];

            if (enemyAbilityName === "FrostRay") {
                enemyAbilityDesc = "Deal 10 damage ignoring protection";
            } 
            if (enemyAbilityName === "Life Mage") { 
                enemyAbilityDesc = "Heal an ally from 5 damage twice";
            }
            if (enemyAbilityName === "Water Whip") { 
                enemyAbilityDesc = "Deal 6 damage twice";
            }
            if (enemyAbilityName === "Fireball") {
                enemyAbilityDesc = "Deal 5 damage to all enemies";
            } 
            if (enemyAbilityName === "Yew Breeze") { 
                enemyAbilityDesc = "Heal all allies 5 damage";
            }
            if (enemyAbilityName === "Shock") { 
                enemyAbilityDesc = "Remove all protection from an enemy";
            }
            

        document.getElementById(`char${charFirstClickedDivNumber}-ability1-name`).textContent = enemyAbilityName;
        document.getElementById(`char${charFirstClickedDivNumber}-ability1-desc`).textContent = enemyAbilityDesc;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Braynie Monkey See Better ab1
    if (charAbilitySelectedName === "Monkey See Better") {
        // adapt ability1 of target enemy
        const enemyAbilityName = document.getElementById(`enemy${enemyClickedDivNumber}-ability1-name`).textContent;
        const enemyAbilityDesc = document.getElementById(`enemy${enemyClickedDivNumber}-ability1-desc`).textContent;
        document.getElementById(`char${charFirstClickedDivNumber}-ability1-name`).textContent = enemyAbilityName;
        document.getElementById(`char${charFirstClickedDivNumber}-ability1-desc`).textContent = enemyAbilityDesc;
    }
    // Braynie Monkey Do Better ab2
    if (charAbilitySelectedName === "Monkey Do Better") {
        // steal all protection from an enemy
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        enemyProtectionElem.textContent = 0;

        // add that protection to self
        const charProtectionElem = document.getElementById(`char${charFirstClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += enemyProtection;
        charProtectionElem.textContent = charProtection;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // braynie Monkey Do ab2
    if (charAbilitySelectedName === "Monkey Do") {
        // steal up to 5 protection from an enemy
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        enemyProtection -= 5;
        if (enemyProtection < 0) {
            protectionDifference = 5 - Math.abs(enemyProtection);
            enemyProtection = 0;
        }
        enemyProtectionElem.textContent = enemyProtection;

        // add that protection to self
        const charProtectionElem = document.getElementById(`char${charFirstClickedDivNumber}-protection`);
        let charProtection = parseInt(charProtectionElem.textContent);
        charProtection += protectionDifference;
        charProtectionElem.textContent = charProtection;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // T`Risa Bash and Slash ab1
    if (charAbilitySelectedName === "Bash and Slash") {
        // deal 3 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 3;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // T`Risa Elven Strength ab1
    if (charAbilitySelectedName === "Elven Strength") {
        // deal 5 damage twice
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 4;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // jon spartan accuracy ab1
    if (charAbilitySelectedName === "Spartan Accuracy") {
        // deal 5 damage twice
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 5;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // Maggie Call Small Creature ab2
    if (charAbilitySelectedName === "Call Small Creature") {
        // summon a creature
        findNextOpenCharDiv();
        summonSmallCreature();
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Maggie Call Large Creature ab2
    if (charAbilitySelectedName === "Call Large Creature") {
        // summon a creature
        findNextOpenCharDiv();
        summonLargeCreature();
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Jo Nator Negative Charge ab2
    if (charAbilitySelectedName === "Negative Charge") {
        // deal 2 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 2;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Jo Nator Complete Circuit ab2
    if (charAbilitySelectedName === "Complete Circuit") {
        // deal 5 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 3;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // J.O.N. J.ustice O.r N.othing ab1
    if (charAbilitySelectedName === "J.ustice O.r N.othing") {
        // deal 5 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 5;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // J.O.N. AI Virus ab2
    if (charAbilitySelectedName === "AI Virus") {
        // reduce enemy protection to 0
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        enemyProtectionElem.textContent = 0;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // J.O.N. Cortana ab2
    if (charAbilitySelectedName === "Cortana") {
        // reduce all enemy protection to 0
        for (let i = 1; i <= 7; i++) {
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            enemyProtectionElem.textContent = 0;
        }

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    // Pasha Upload Virus ab1
    if (charAbilitySelectedName === "Upload Virus") {
        // reduce all enemy protection to 0
        for (let i = 1; i <= 7; i++) {
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            enemyProtectionElem.textContent = 0;
        }

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }

    // wilder canine summon abilities
    if (charAbilitySelectedName === "Hunt" || charAbilitySelectedName === "Tackle" || charAbilitySelectedName === "Scratch" || charAbilitySelectedName === "Howl" || charAbilitySelectedName === "Bark") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 3;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // wilder strong canine summon abilities
    if (charAbilitySelectedName === "Hunt Command" || charAbilitySelectedName === "Tackle Command" || charAbilitySelectedName === "Scratch Command" || charAbilitySelectedName === "Howl Command" || charAbilitySelectedName === "Bark Command") {
        // deal 5 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 5;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Ethan Dino Friends
    if (charAbilitySelectedName === "Dino Friends") {
        // deal 2 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 2;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Thunder Cat Yowl / giant eagle razor talons
    if (charAbilitySelectedName === "Yowl" || charAbilitySelectedName === "Razor Talons") {
        // deal 3 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 3;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // elder bog Quake 
    if (charAbilitySelectedName === "Quake") {
        // deal 3 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 3;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    //drak Tail whip
    if (charAbilitySelectedName === "Tail Whip") {
        // deal 2 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 2;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // bog growl
    if (charAbilitySelectedName === "Growl") {
        // deal 1 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 1;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // snek Venom Bite
    if (charAbilitySelectedName === "Venom Bite") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        // ignoring protection
        enemyHealth -= 3;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // claw rat Claw
    if (charAbilitySelectedName === "Claw") {
        // deal 4 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 4;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }


    //Enemy (adapted) abilities past here

    // bandit1 Cloak Bandit Cut / bandit2 Stealth Bandit Stab
    if (charAbilitySelectedName === "Cut" || charAbilitySelectedName === "Stab") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 3;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // bandit 5 Polearm Swinging Slash
    if (charAbilitySelectedName === "Swinging Slash") {
        // deal 3 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 3;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // bandit6 Stout Crush
    if (charAbilitySelectedName === "Crush") {
        // deal 2 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 2;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // banditLeader Blade Volley
    if (charAbilitySelectedName === "Blade Volley") {
        // deal 7 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 7;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // pirateLeader Quick Fire
    if (charAbilitySelectedName === "Quick Fire") {
        // deal 8 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 8;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // pirate5 Boomer Blast
    if (charAbilitySelectedName === "Blast") {
        // deal 2 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 2;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // pirate6 First Mate Counter
    if (charAbilitySelectedName === "Counter") {
        // deal 4 damage to selected enemy, heal self for 4
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        enemyHealth -= 4;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }
        
        enemyHealthElem.textContent = enemyHealth;

        // heal self
        const charHealthElem = document.getElementById(`char${charFirstClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 4;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // pirate4 Long Sword Wide Slash
    if (charAbilitySelectedName === "Wide Slash") {
        // deal 5 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 5;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // pirate2 Runner Rush
    if (charAbilitySelectedName === "Rush") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        // ignoring protection
        enemyHealth -= 3;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    //pirate1 Thief Gut
    if (charAbilitySelectedName === "Gut") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 3;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // legion6 Swords Woman Spinning Slash
    if (charAbilitySelectedName === "Spinning Slash") {
        // deal 4 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 4;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // legion3 Captain Sword of Light
    if (charAbilitySelectedName === "Sword of Light") {
        // deal 4 damage to selected enemy, heal self for 4
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        enemyHealth -= 7;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }
        
        enemyHealthElem.textContent = enemyHealth;

        // heal self
        const charHealthElem = document.getElementById(`char${charFirstClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 7;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    //legion2 Berserk Bash
    if (charAbilitySelectedName === "Bash") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 6;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    //legion1 archer Sharp Shot
    if (charAbilitySelectedName === "Sharp Shot") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 7;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // ghoul6 Frozen Ghoul Ice Blade
    if (charAbilitySelectedName === "Ice Blade") {
        // deal 6 damage to selected enemy ignoring armor
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        // ignoring protection
        enemyHealth -= 6;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // ghoul5 geared Ghoul Blade Tornado
    if (charAbilitySelectedName === "Blade Tornado") {
        // deal 4 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 3;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    //ghoul4 Giant Ghoul Stomp
    if (charAbilitySelectedName === "Stomp") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 8;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    //ghoul3 3 Arm Ghoul Triple Stab
    if (charAbilitySelectedName === "Triple Stab") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 6;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    //ghoul2 Ember Ghoul Slice
    if (charAbilitySelectedName === "Slice") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 5;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    //ghoul1 Ember Ghoul Flame Spear
    if (charAbilitySelectedName === "Flame Spear") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 7;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // arcane6 Energy Evoker Shock
    if (charAbilitySelectedName === "Shock") {
        // reduce enemy protection to 0
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        enemyProtectionElem.textContent = 0;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // arccane4 Pyromancer Fireball
    if (charAbilitySelectedName === "Fireball") {
        // deal 4 damage to all enemies
        for (let i = 1; i <= 7; i++) {
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            const enemyProtectionElem = document.getElementById(`enemy${i}-protection`);
            let enemyHealth = parseInt(enemyHealthElem.textContent);
            let enemyProtection = parseInt(enemyProtectionElem.textContent);
            // if enemy has protection
            enemyProtection -= 5;
            if (enemyProtection < 0) {
                let remainder = Math.abs(enemyProtection);
                enemyProtection = 0;
                enemyHealth -= remainder;
            }

            //make sure health doesn't exceed max, color correctly
            const enemyHealthMax = await getEnemyMaxHealth();
            if (enemyHealth >= enemyHealthMax) {
                enemyHealth = enemyHealthMax;
                enemyHealthElem.style.color = "green";
            } else {
                enemyHealthElem.style.color = "orange";
            }

            enemyProtectionElem.textContent = enemyProtection;
            enemyHealthElem.textContent = enemyHealth;
        }
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // arcane1 Ice Mage Frost Ray
    if (charAbilitySelectedName === "Frost Ray") {
        // deal 6 damage to selected enemy ignoring armor
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        // ignoring protection
        enemyHealth -= 10;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // arcane3 Water Wizard Water Whip
    if (charAbilitySelectedName === "Water Whip") {
        // deal 5 damage to two enemies
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 6;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;
        }
    }
    // ghoulLeader Undead Summoner Siphon
    if (charAbilitySelectedName === "Siphon") {
        // deal 3 damage to selected enemy, heal self for 3
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        enemyHealth -= 10;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }
        
        enemyHealthElem.textContent = enemyHealth;

        // heal self
        const charHealthElem = document.getElementById(`char${charFirstClickedDivNumber}-health`);
        let charHealth = parseInt(charHealthElem.textContent);
        charHealth += 10;

        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await getCharMaxHealth();
        if (charHealth >= charHealthMax) {
            charHealth = charHealthMax;
            charHealthElem.style.color = "green";
        } else {
            charHealthElem.style.color = "orange";
        }

        charHealthElem.textContent = charHealth;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        // take away ability uses
        abilityUses -= 1;
        document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
    }
    //legionLeader Angel of the Legion Sever
    if (charAbilitySelectedName === "Sever") {
        // deal 3 damage to selected enemy
        const enemyHealthElem = document.getElementById(`enemy${enemyClickedDivNumber}-health`);
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        let enemyHealth = parseInt(enemyHealthElem.textContent);
        let enemyProtection = parseInt(enemyProtectionElem.textContent);
        // if enemy has protection
        enemyProtection -= 10;
        if (enemyProtection < 0) {
            let remainder = Math.abs(enemyProtection);
            enemyProtection = 0;
            enemyHealth -= remainder;
        }

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await getEnemyMaxHealth();
        if (enemyHealth >= enemyHealthMax) {
            enemyHealth = enemyHealthMax;
            enemyHealthElem.style.color = "green";
        } else {
            enemyHealthElem.style.color = "orange";
        }

        enemyProtectionElem.textContent = enemyProtection;
        enemyHealthElem.textContent = enemyHealth;
        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
        }
    }
}





function checkForDeadEnemies() {
    for (let i = 1; i <= 7; i++) {
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        if (enemyDiv) {
            const enemyHealth = parseInt(document.getElementById(`enemy${i}-health`).textContent);
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            // Only decrement if the enemy is alive (visible) and now dead
            if (enemyHealth <= 0 && enemyDiv.style.display !== "none") {
                enemyDiv.style.display = "none";
                enemyHealthElem.style.color = "green";
            }
        }
    }
}

function hideAllEnemyCharacterDivs() {
    for (let i = 1; i <= 7; i++) {
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        if (enemyDiv) {
            enemyDiv.style.display = "none";
            const enemyHealthElem = document.getElementById(`enemy${i}-health`);
            enemyHealthElem.style.color = "green";
        }
    }
    for (let i = 1; i <= 7; i++) {
        const charDiv = document.getElementById(`char${i}-div`);
        if (charDiv) {
            charDiv.style.display = "none";
            const charHealthElem = document.getElementById(`char${i}-health`);
            charHealthElem.style.color = "green";
        }
    }
}

function checkForVictory() {
    let enemyCount = 0;
    for (let i = 1; i <= 7; i++) {
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        if (enemyDiv.style.display === "block") {
            enemyCount += 1;
        }
    }
    if (enemyCount === 0) {
        document.getElementById("victory-page-div").style.display = "block";
        document.getElementById("bond-reward").textContent = difficulties[currentlyAt][difficulty].reward;
        resetCharSelection();
        hideAllEnemyCharacterDivs();

        abilityProgress = 1;

        crossfadeMusic(currentSound, victorySound, 4000);

        return;
        }
}













//click any character handling
for (let i = 1; i <= 7; i++) {
    const charDiv = document.getElementById(`char${i}-div`);
    if (charDiv) {
        charDiv.addEventListener('click', function() {
            if (waiting === true) {
                return;
            } else {
                //set div number
                charClickedDivNumber = i;

                //determine if click is to select or to apply
                if (charClickSelected === true) {
                    // check if enough ability uses
                    if (charAbilitySelectedUses <= 0) {
                        alert("Not enough ability uses");
                        resetCharSelection();
                    } else if (energyCount <= 0) {
                        alert("Not enough energy");
                        resetCharSelection();
                    } else if (charAbilitySelectedType === "attackTwo" && abilityProgress === 2) {
                        alert("Use this ability on an enemy");
                    } else if (charAbilitySelectedType === "attack" || charAbilitySelectedType === "attackTwo" || charAbilitySelectedType === "attackAll" || charAbilitySelectedType === "summon" || charAbilitySelectedType === "commandSummons" || charAbilitySelectedType === "stealHealth" || charAbilitySelectedType === "stealProtection" || charAbilitySelectedType === "zeroProtection" || charAbilitySelectedType === "adaptAbility" || charAbilitySelectedType === "ignoreProtection" || charAbilitySelectedType === "addEnergy") { // check if ability type is applicable
                        alert("Ability is not applicable to this character");
                        resetCharSelection();
                    } else if (charAbilitySelectedType === "heal" || charAbilitySelectedType === "protect") { // determine if HEAL ability selected
                        charClickedApplyToDiv = charDiv;
                        applyCharAbilityToChar();
                        charDiv.style.border = "2px solid limegreen";
                        waitUntilFinished(true);
                        setTimeout(() => {
                                    resetCharSelection();

                                    waitUntilFinished(false);
                                }, 1000);

                    } else if (charAbilitySelectedType === "protectTwo" || charAbilitySelectedType === "healTwo") {
                            if (abilityProgress === 1) { // first char click
                                charClickedDiv = charDiv;
                                charClickedApplyToDiv = charDiv;
                                applyCharAbilityToChar();
                                charClickedDiv.style.border = "2px solid limegreen";
                                waitUntilFinished(true);
                                setTimeout(() => {

                                    abilityProgress = 2;

                                    waitUntilFinished(false);
                                }, 1000);

                                
                            } else if (abilityProgress === 2) { //second char click
                                charClickedDiv = charDiv;
                                charClickedApplyToDiv = charDiv;
                                applyCharAbilityToChar();
                                charClickedDiv.style.border = "2px solid limegreen";
                                waitUntilFinished(true);
                                setTimeout(() => {

                                    charClickedDiv.style.border = "";

                                    resetCharSelection();

                                    waitUntilFinished(false);

                                    abilityProgress = 1;
                                }, 1000);
                            } 
                    } else if (charAbilitySelectedType === "healAll") {
                        applyCharAbilityToChar();
                        // apply border to all character divs
                        for (let j = 1; j <= 7; j++) {
                            const charDiv = document.getElementById(`char${j}-div`);
                            if (charDiv) {
                                charDiv.style.border = "2px solid limegreen";
                            }
                        }
                        waitUntilFinished(true);
                        setTimeout(() => {

                            resetCharSelection();

                            waitUntilFinished(false);
                        }, 1000);
                    } else if (charAbilitySelectedType === "protectAll") {
                        applyCharAbilityToChar();
                        // apply border to all character divs
                        for (let j = 1; j <= 7; j++) {
                            const charDiv = document.getElementById(`char${j}-div`);
                            if (charDiv) {
                                charDiv.style.border = "2px solid limegreen";
                            }
                        }
                        waitUntilFinished(true);
                        setTimeout(() => {

                            resetCharSelection();

                            waitUntilFinished(false);
                        }, 1000);
                    } else if (charClickSelected === true && charAbilitySelected === false) {
                        //switch characters to use
                        resetCharSelection();
                        charDiv.style.border = "2px solid cyan";
                        charClickSelected = true;
                        charClickedDiv = charDiv;
                        charClickedDivNumber = i;
                    }  else {
                        resetCharSelection();
                        charDiv.style.border = "2px solid cyan";
                    }
                } else {
                    //click a character to use
                    charDiv.style.border = "2px solid cyan";
                    charClickSelected = true;
                    charClickedDiv = charDiv;
                    charFirstClickedDivNumber = i;
                }
            }
        });
    }
}

//press 1 or 2 listener after selecting a char to use
document.addEventListener('keydown', function(event) {
    if (waiting === true) {
        return;
    } else {
        if (charClickSelected === true) {
            if (event.key === '1') {
                charAbilitySelected = true;
                charAbilitySelectedNumber = 1;
                charAbilitySelectedName = document.getElementById(`char${charClickedDivNumber}-ability1-name`).textContent;
                charAbilitySelectedUses = parseInt(document.getElementById(`char${charClickedDivNumber}-ability1-uses`).textContent);
                setAbilityType();

                document.getElementById(`char${charClickedDivNumber}-ability1-name`).style.backgroundColor = "yellow";
                document.getElementById(`char${charClickedDivNumber}-ability2-name`).style.backgroundColor = "";

                console.log(`selected ability: ${charAbilitySelectedName}`);
            } else if (event.key === '2') {
                charAbilitySelected = true;
                charAbilitySelectedNumber = 2;
                charAbilitySelectedName = document.getElementById(`char${charClickedDivNumber}-ability2-name`).textContent;
                charAbilitySelectedUses = parseInt(document.getElementById(`char${charClickedDivNumber}-ability2-uses`).textContent);
                setAbilityType();

                document.getElementById(`char${charClickedDivNumber}-ability2-name`).style.backgroundColor = "yellow";
                document.getElementById(`char${charClickedDivNumber}-ability1-name`).style.backgroundColor = "";

                console.log(`selected ability: ${charAbilitySelectedName}`);
                console.log(`selected ability uses: ${charAbilitySelectedUses}`);
            }
        }
    }
});

//press escape listener after selecting a char to use
document.addEventListener('keydown', function(event) {
    if (waiting === true) {
        return;
    } else if (abilityProgress === 2) {
        alert("Choose a second target with this ability")
    } else {
        if (event.key === 'Escape') {
            resetCharSelection();
        }
    }
});










//click on enemy
for (let i = 1; i <= 7; i++) {
    const enemyDiv = document.getElementById(`enemy${i}-div`);
    if (enemyDiv) {
        enemyDiv.addEventListener('click', function() {
            if (waiting === true) {
                return;
            } else {
                //set clicked enemyDiv & Number
                enemyClickedDivNumber = i;


                if (charClickSelected === true && charAbilitySelected === true) {
                    if (charAbilitySelectedUses <= 0) {
                        alert("Not enough ability uses");
                        resetCharSelection();
                    } else if (energyCount <= 0) {
                        alert("Not enough energy");
                        resetCharSelection();
                    } else if (charAbilitySelectedType === "heal" || charAbilitySelectedType === "healTwo" || charAbilitySelectedType === "healAll" || charAbilitySelectedType === "protect" || charAbilitySelectedType === "protectTwo" || charAbilitySelectedType === "protectAll" ) { // check if ability is applicable
                        alert("Ability not applicable to this enemy");
                        resetCharSelection();
                    } else { // apply ability
                        if (charAbilitySelectedType === "attackTwo") { 
                            if (abilityProgress === 1) { // first enemy click
                                enemyClickedDiv = enemyDiv;
                                applyCharAbilityToEnemy();
                                enemyClickedDiv.style.border = "2px solid red";
                                waitUntilFinished(true);
                                setTimeout(() => {
                                    
                                    checkForDeadEnemies();

                                    checkForVictory();

                                    abilityProgress = 2;

                                    waitUntilFinished(false);
                                }, 1000);
                            } else if (abilityProgress === 2) { //second enemy click
                                enemyClickedDiv = enemyDiv;
                                applyCharAbilityToEnemy();
                                enemyClickedDiv.style.border = "2px solid red";
                                waitUntilFinished(true);
                                setTimeout(() => {

                                    enemyClickedDiv.style.border = "";
                                    
                                    checkForDeadEnemies();

                                    checkForVictory();

                                    resetCharSelection();

                                    waitUntilFinished(false);

                                    abilityProgress = 1;
                                }, 1000);
                            }

                        } else if (charAbilitySelectedType === "attackAll") {
                            // apply border to all enemy divs
                            for (let j = 1; j <= 7; j++) {
                                const enemyDiv = document.getElementById(`enemy${j}-div`);
                                    if (enemyDiv.style.display === "block") { // only apply to visible enemies
                                    enemyDiv.style.border = "2px solid red";
                                    enemyClickedDiv = enemyDiv;
                                    }
                            }
                            applyCharAbilityToEnemy();
                            waitUntilFinished(true);
                            setTimeout(() => {

                                checkForDeadEnemies();

                                checkForVictory();

                                resetCharSelection();

                                waitUntilFinished(false);
                            }, 1000);
                        } else if (charAbilitySelectedType === "attack" || charAbilitySelectedType === "ignoreProtection" || charAbilitySelectedType === "zeroProtection" || charAbilitySelectedType === "adaptAbility" || charAbilitySelectedType === "stealProtection") {
                                enemyClickedDiv = enemyDiv;
                                applyCharAbilityToEnemy();
                                enemyClickedDiv.style.border = "2px solid red";
                                waitUntilFinished(true);
                                setTimeout(() => {

                                    enemyClickedDiv.style.border = "";
                                    
                                    checkForDeadEnemies();

                                    checkForVictory();

                                    resetCharSelection();

                                    waitUntilFinished(false);
                                }, 1000);
                        } else if (charAbilitySelectedType === "stealHealth") {
                            enemyClickedDiv = enemyDiv;
                            charClickedApplyToDiv = charClickedDiv;
                            applyCharAbilityToEnemy();
                            enemyClickedDiv.style.border = "2px solid red";
                            waitUntilFinished(true);
                            setTimeout(() => {

                                enemyClickedDiv.style.border = "";
                                
                                checkForDeadEnemies();

                                checkForVictory();

                                resetCharSelection();

                                waitUntilFinished(false);
                            }, 1000);
                        } else if (charAbilitySelectedType === "summon" || charAbilitySelectedType === "addEnergy") {
                            applyCharAbilityToEnemy();
                            waitUntilFinished(true);
                            setTimeout(() => {

                                resetCharSelection();

                                waitUntilFinished(false);
                            }, 1000);
                        }
                    }
                }
            }
            
        });
    }
}

// end turn button
document.getElementById("end-turn-button").addEventListener('click', function() {
    if (waiting === true) {
        return;
    } else {
        resetCharSelection();
        
        autoFindVisibleEnemies();

        document.getElementById("player-turn-img").style.display = "none";
        document.getElementById("enemy-turn-img").style.display = "block";

        autoEnemyTurnCycle();
    }
});

//bandit battle buttons
const banditCliffButton = document.getElementById("bandit-cliff-button");
const banditCampButton = document.getElementById("bandit-camp-button");
const banditGroveButton = document.getElementById("bandit-grove-button");
const banditRiversideButton = document.getElementById("bandit-riverside-button");
const banditCrossingButton = document.getElementById("bandit-crossing-button");
const banditUpstreamButton = document.getElementById("bandit-upstream-button");
const banditThicketButton = document.getElementById("bandit-thicket-button");
const banditFortButton = document.getElementById("bandit-fort-button");

banditCliffButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    banditButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 1;
    currentBattleButton = "bandit-cliff";

    initializeBattle();
});
banditCampButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    banditButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 2;
    currentBattleButton = "bandit-camp";

    initializeBattle();
});
banditRiversideButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    banditButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 3;
    currentBattleButton = "bandit-riverside";

    initializeBattle();
});
banditGroveButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    banditButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 4;
    currentBattleButton = "bandit-grove";

    initializeBattle();
});
banditCrossingButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    banditButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 5;
    currentBattleButton = "bandit-crossing";

    initializeBattle();
});
banditUpstreamButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    banditButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 5;
    currentBattleButton = "bandit-upstream";

    initializeBattle();
});
banditThicketButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    banditButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 5;
    currentBattleButton = "bandit-thicket";

    initializeBattle();
});
banditFortButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    banditButtonsDiv.style.display = "none";

    leaderBattle = true;
    difficulty = 6;
    currentBattleButton = "bandit-fort";

    initializeBattle();
});
//arcane battle buttons
const arcaneBeach1Button = document.getElementById("arcane-beach1-button");
const arcaneBeach2Button = document.getElementById("arcane-beach2-button");
const arcaneAcademyButton = document.getElementById("arcane-academy-button");
const arcaneFieldsButton = document.getElementById("arcane-fields-button");
const arcaneFallsButton = document.getElementById("arcane-falls-button");
const arcaneTownButton = document.getElementById("arcane-town-button");
const arcaneTraderButton = document.getElementById("arcane-trader-button");
const arcaneCollegeButton = document.getElementById("arcane-college-button");

arcaneBeach1Button.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    arcaneButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 2;
    currentBattleButton = "arcane-beach1";

    initializeBattle();
});
arcaneBeach2Button.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    arcaneButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 3;
    currentBattleButton = "arcane-beach2";

    initializeBattle();
});
arcaneAcademyButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    arcaneButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 5;
    currentBattleButton = "arcane-academy";

    initializeBattle();
});
arcaneFieldsButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    arcaneButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 4;
    currentBattleButton = "arcane-fields";

    initializeBattle();
});
arcaneTownButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    arcaneButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 5;
    currentBattleButton = "arcane-town";

    initializeBattle();
});
arcaneFallsButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    arcaneButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 5;
    currentBattleButton = "arcane-falls";

    initializeBattle();
});
arcaneCollegeButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    arcaneButtonsDiv.style.display = "none";

    leaderBattle = true;
    difficulty = 6;
    currentBattleButton = "arcane-college";

    initializeBattle();
});
//legion battle buttons
const legionCliffButton = document.getElementById("legion-cliff-button");
const legionPlains1Button = document.getElementById("legion-plains1-button");
const legionCrossroadsButton = document.getElementById("legion-crossroads-button");
const legionPlains2Button = document.getElementById("legion-plains2-button");
const legionSteepsButton = document.getElementById("legion-steeps-button");
const legionCourtyardButton = document.getElementById("legion-courtyard-button");
const legionTraderButton = document.getElementById("legion-trader-button");
const legionCastleButton = document.getElementById("legion-castle-button");

legionCliffButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    legionButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 1;
    currentBattleButton = "legion-cliff";

    initializeBattle();
});
legionPlains1Button.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    legionButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 2;
    currentBattleButton = "legion-plains1";

    initializeBattle();
});
legionCrossroadsButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    legionButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 3;
    currentBattleButton = "legion-crossroads";

    initializeBattle();
});
legionPlains2Button.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    legionButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 4;
    currentBattleButton = "legion-plains2";

    initializeBattle();
});
legionSteepsButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    legionButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 4;
    currentBattleButton = "legion-steeps";

    initializeBattle();
});
legionCourtyardButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    legionButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 5;
    currentBattleButton = "legion-courtyard";

    initializeBattle();
});
legionCastleButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    legionButtonsDiv.style.display = "none";

    leaderBattle = true;
    difficulty = 6;
    currentBattleButton = "legion-castle";

    initializeBattle();
});
//ghoul battle buttons
const ghoulBeachButton = document.getElementById("ghoul-beach-button");
const ghoulWallsButton = document.getElementById("ghoul-walls-button");
const ghoulHousesButton = document.getElementById("ghoul-houses-button");
const ghoulEntranceButton = document.getElementById("ghoul-entrance-button");
const ghoulCaves1Button = document.getElementById("ghoul-caves1-button");
const ghoulCaves2Button = document.getElementById("ghoul-caves2-button");
const ghoulTraderButton = document.getElementById("ghoul-trader-button");
const ghoulCitadelButton = document.getElementById("ghoul-citadel-button");

ghoulBeachButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    ghoulButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 1;
    currentBattleButton = "ghoul-beach";

    initializeBattle();
});
ghoulWallsButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    ghoulButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 2;
    currentBattleButton = "ghoul-walls";

    initializeBattle();
});
ghoulHousesButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    ghoulButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 3;
    currentBattleButton = "ghoul-houses";

    initializeBattle();
});
ghoulEntranceButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    ghoulButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 4;
    currentBattleButton = "ghoul-entrance";

    initializeBattle();
});
ghoulCaves1Button.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    ghoulButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 5;
    currentBattleButton = "ghoul-caves1";

    initializeBattle();
});
ghoulCaves2Button.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    ghoulButtonsDiv.style.display = "none";

    leaderBattle = false;
    difficulty = 5;
    currentBattleButton = "ghoul-caves2";

    initializeBattle();
});
ghoulCitadelButton.addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/battlegrounds/ground_${currentlyAt}.png')`;
    ghoulButtonsDiv.style.display = "none";

    leaderBattle = true;
    difficulty = 6;
    currentBattleButton = "ghoul-citadel";

    initializeBattle();
});






// Enemy auto turn cycle

// find all visible enemies
function autoFindVisibleEnemies() {
    for (let i = 1; i <= 7; i++) {
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        if (enemyDiv.style.display === "block") {
            visibleEnemies.push(enemyDiv);
        }
    }
    console.log("visibleEnemies: ", visibleEnemies);
}

async function autoEnemyTurnCycle() {
    waitUntilFinished(true);

    // Step 1: Choose enemy, find ability, wait 2s
    autoChooseRandomEnemy();
    autoFindEnemyAbility();
    await autoFindEnemyAbilityAmount();
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 2: Choose target, apply ability, wait 2s
    autoChooseRandomTarget();
    await autoApplyEnemyAbility();
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 3: If ability can be used twice
    if (enemyAbilityProgress === 2) {
        autoChooseRandomTarget();
        await autoApplyEnemyAbility();
        enemyAbilityProgress = null;
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Step 4: Do checks and repeat, wait 2s
    autoCheckForDeadCharacters();
    autoCheckForDefeat();
    autoRemoveAllBorders();
    autoCheckForUnplayedEnemies();
    await new Promise(resolve => setTimeout(resolve, 1000));
}

let visibleEnemies = [];
let attackingEnemy = null;
let attackingEnemyAbility = null;
let attackingEnemyAbilityAmount = 0;
let attackingEnemyAbilityType = null;
let targetCharacter = null;
let targetEnemy = null;
let enemyAbilityProgress = null;
let bestEnemyTarget = null;
let bestCharTarget = null;

function autoChooseRandomEnemy() { // choose enemy from visibleEnemies and remove from the array
    const randomIndex = Math.floor(Math.random() * visibleEnemies.length);
    attackingEnemy = visibleEnemies[randomIndex];
    visibleEnemies.splice(randomIndex, 1);

    attackingEnemy.style.border = "2px solid orange";
    console.log("attackingEnemy: ", attackingEnemy);
}

function autoFindEnemyAbility() {
    if (leaderBattle === true && attackingEnemy.id === "enemy1-div") {
        autoChooseLeaderAbility();
        attackingEnemyAbility = document.getElementById(`enemy1-ability${leaderAbilityNumber}-name`).textContent;

        if (attackingEnemyAbility === "Arcane Knowledge") {
            let arcaneAbilities = ["FrostRay", "Life Mage", "Water Whip", "Fireball", "Yew Breeze", "Shock"];
            const randomIndex = Math.floor(Math.random() * arcaneAbilities.length);
            attackingEnemyAbility = arcaneAbilities[randomIndex];
        }

        let attackingEnemyAbilityElem = document.getElementById(`enemy1-ability${leaderAbilityNumber}-name`);
        attackingEnemyAbilityElem.style.backgroundColor = "yellow";
    } else {
        const enemyNum = attackingEnemy.id.match(/\d+/)[0]; // gets the number from "enemy3-div"
        attackingEnemyAbility = document.getElementById(`enemy${enemyNum}-ability1-name`).textContent;  

        let attackingEnemyAbilityElem = document.getElementById(`enemy${enemyNum}-ability1-name`);
        attackingEnemyAbilityElem.style.backgroundColor = "yellow";
    }
    console.log("attackingEnemyAbility: ", attackingEnemyAbility);
}

async function autoFindEnemyAbilityAmount() {
    if (leaderBattle === true && attackingEnemy.id === "enemy1-div") {
        const res = await fetch(`API_BASE_URL/api/enemy_leader/${currentlyAt}/ability/${leaderAbilityNumber}`);
    const data = await res.json();
    attackingEnemyAbilityAmount = data.ammount;
    } else {
        const res = await fetch(`API_BASE_URL/api/enemy/ability1/${attackingEnemyAbility}`);
        const data = await res.json();
        attackingEnemyAbilityAmount = data.ability1_ammount;
    }
}

function autoChooseRandomTarget() { // choose character or enemy target
    autoDetermineEnemyAbilityType();
    if (attackingEnemyAbilityType === "targetCharacter" || attackingEnemyAbilityType === "targetCharacterTwice") {
        let visibleTargets = [];
        for (let i = 1; i <= 7; i++) {
            const charDiv = document.getElementById(`char${i}-div`);
            if (charDiv.style.display === "block") {
                visibleTargets.push(charDiv);
            }
        }
        const randomIndex = Math.floor(Math.random() * visibleTargets.length);

        if (attackingEnemyAbility === "Shock") {
            autoFindBestTargetChar();

            if (bestCharTarget === null) {
                targetCharacter = visibleTargets[randomIndex];
                targetCharacter.style.border = "2px solid red";

                console.log("bestCharTarget: ", bestCharTarget);
            } else {
                targetCharacter = bestCharTarget;
                targetCharacter.style.border = "2px solid red";

                console.log("bestCharTarget: ", bestCharTarget);
            }
        } else {
            targetCharacter = visibleTargets[randomIndex];
            targetCharacter.style.border = "2px solid red";
        }
    } else if (attackingEnemyAbilityType === "targetCharacterAll") {
        let visibleTargets = [];
        for (let i = 1; i <= 7; i++) {
            const charDiv = document.getElementById(`char${i}-div`);
            if (charDiv.style.display === "block") {
                visibleTargets.push(charDiv);
            }
        }
        targetCharacter = visibleTargets; // array of all visible characters
        for (let j = 0; j < targetCharacter.length; j++) {
            targetCharacter[j].style.border = "2px solid red";
        }
    } else if (attackingEnemyAbilityType === "targetEnemy" || attackingEnemyAbilityType === "targetEnemyTwice") {
        let visibleTargets = [];
        for (let i = 1; i <= 7; i++) {
            const enemyDiv = document.getElementById(`enemy${i}-div`);
            if (enemyDiv.style.display === "block") {
                visibleTargets.push(enemyDiv);
            }
        }
        const randomIndex = Math.floor(Math.random() * visibleTargets.length);
        autoFindBestTargetEnemy();

        if (bestEnemyTarget === null) {
            targetEnemy = visibleTargets[randomIndex];
            targetEnemy.style.border = "2px solid limegreen";

            console.log("bestEnemyTarget: ", bestEnemyTarget);
        } else {
            targetEnemy = bestEnemyTarget;
            targetEnemy.style.border = "2px solid limegreen";

            console.log("bestEnemyTarget: ", bestEnemyTarget);
        }
    } else if (attackingEnemyAbilityType === "targetEnemyAll") {
        let visibleTargets = [];
        for (let i = 1; i <= 7; i++) {
            const enemyDiv = document.getElementById(`enemy${i}-div`);
            if (enemyDiv.style.display === "block") {
                visibleTargets.push(enemyDiv);
            }
        }
        targetEnemy = visibleTargets; // array of all visible enemies
        for (let j = 0; j < targetEnemy.length; j++) {
            targetEnemy[j].style.border = "2px solid limegreen";
        }
    } else if (attackingEnemyAbilityType === "summonEnemy") {
        targetEnemy = null; // no target needed
    }
    console.log("targetCharacter: ", targetCharacter);
    console.log("targetEnemy: ", targetEnemy);
}

function autoFindBestTargetEnemy() {
    let options = [];
    for (let i = 1; i <= 7; i++) {
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        const healthElem = document.getElementById(`enemy${i}-health`);
        const healthElemValue = parseInt(healthElem.textContent);
        if (enemyDiv.style.display === "block" && healthElem.style.color === "orange") {
            options.push({ div: enemyDiv, healthElem, healthElemValue, i });
        }
    }
    if (options.length > 0) {
        options.sort((a, b) => a.healthElemValue - b.healthElemValue);
        bestEnemyTarget = options[0].div;
    } else {
        bestEnemyTarget = null;
    }
}
function autoFindBestTargetChar() {
    let options = [];
    for (let i = 1; i <= 7; i++) {
        const charDiv = document.getElementById(`char${i}-div`);
        const protectionElem = document.getElementById(`char${i}-protection`);
        const protectionElemValue = parseInt(protectionElem.textContent);
        if (charDiv.style.display === "block" && protectionElemValue > 0) {
            options.push({ div: charDiv, protectionElem, protectionElemValue, i });
        }
    }
    if (options.length > 0) {
        options.sort((a, b) => b.protectionElemValue - a.protectionElemValue);
        bestCharTarget = options[0].div;
    } else {
        bestCharTarget = null;
    }
}


function autoDetermineEnemyAbilityType() {
    if (attackingEnemyAbility === "Cut" || attackingEnemyAbility === "Stab" || attackingEnemyAbility === "Gut" || attackingEnemyAbility === "Rush" || attackingEnemyAbility === "Frost Ray" || attackingEnemyAbility === "Shock" || attackingEnemyAbility === "Flame Spear" || attackingEnemyAbility === "Slice" || attackingEnemyAbility === "Counter" || attackingEnemyAbility === "Triple Stab" || attackingEnemyAbility === "Stomp" || attackingEnemyAbility === "Ice Blade" || attackingEnemyAbility === "Sharp Shot" || attackingEnemyAbility === "Bash" || attackingEnemyAbility === "Sword of Light" || attackingEnemyAbility === "Siphon" || attackingEnemyAbility === "Sever") {
        attackingEnemyAbilityType = "targetCharacter";
    }
    if (attackingEnemyAbility === "Blast" || attackingEnemyAbility === "Fireball" || attackingEnemyAbility === "Cannon Barrage" || attackingEnemyAbility === "Blade Tornado" || attackingEnemyAbility === "Spinning Slash" || attackingEnemyAbility === "Unholy Aura" || attackingEnemyAbility === "Arcane Blast") {
        attackingEnemyAbilityType = "targetCharacterAll";
    }
    if (attackingEnemyAbility === "Swinging Slash" || attackingEnemyAbility === "Crush" || attackingEnemyAbility === "Blade Volley" || attackingEnemyAbility === "Wide Slash" || attackingEnemyAbility === "Quick Fire" || attackingEnemyAbility === "Water Whip") {
        attackingEnemyAbilityType = "targetCharacterTwice";
    }
    if (attackingEnemyAbility === "Heal" || attackingEnemyAbility === "Defend" || attackingEnemyAbility === "Parry") {
        attackingEnemyAbilityType = "targetEnemy";
    }
    if (attackingEnemyAbility === "Life Mage" || attackingEnemyAbility === "Shield") {
        attackingEnemyAbilityType = "targetEnemyTwice";
    }
    if (attackingEnemyAbility === "Armor Troops" || attackingEnemyAbility === "Yew Breeze" || attackingEnemyAbility === "Inspire" || attackingEnemyAbility === "Winged Defense" || attackingEnemyAbility === "Energy Dome") {
        attackingEnemyAbilityType = "targetEnemyAll";
    }
    if (attackingEnemyAbility === "Demand" || attackingEnemyAbility === "All Hands" || attackingEnemyAbility === "Necromancer" || attackingEnemyAbility === "Orders") {
        attackingEnemyAbilityType = "summonEnemy";
    }
    console.log("attackingEnemyAbilityAmount: ", attackingEnemyAbilityAmount);
    console.log("attackingEnemyAbilityType: ", attackingEnemyAbilityType);
}

async function autoApplyEnemyAbility() {
    //target single character to damage
    if (attackingEnemyAbility === "Cut" || attackingEnemyAbility === "Stab" || attackingEnemyAbility === "Gut" || attackingEnemyAbility === "Flame Spear" || attackingEnemyAbility === "Slice" || attackingEnemyAbility === "Triple Stab" || attackingEnemyAbility === "Stomp" || attackingEnemyAbility === "Sharp Shot" || attackingEnemyAbility === "Bash" || attackingEnemyAbility === "Sever") {
        const charDivNum = targetCharacter.id.match(/\d+/)[0]; 
        const targetCharHealthElem = document.getElementById(`char${charDivNum}-health`);
        const targetCharProtectionElem = document.getElementById(`char${charDivNum}-protection`);
        let targetCharHealth = parseInt(targetCharHealthElem.textContent);
        let targetCharProtection = parseInt(targetCharProtectionElem.textContent);

        // if character has protection
        targetCharProtection -= attackingEnemyAbilityAmount;
        if (targetCharProtection < 0) {
            let remainder = Math.abs(targetCharProtection);
            targetCharProtection = 0;
            targetCharHealth -= remainder;
        }
        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await autoGetCharMaxHealth();
        if (targetCharHealth >= charHealthMax) {
            targetCharHealth = charHealthMax;
            targetCharHealthElem.style.color = "green";
        } else {
            targetCharHealthElem.style.color = "orange";
        }
        targetCharProtectionElem.textContent = targetCharProtection;
        targetCharHealthElem.textContent = targetCharHealth;

        console.log(`applied ${attackingEnemyAbility} to ${targetCharacter.id}`);
    }
    //target single character to zero protection
    if (attackingEnemyAbility === "Shock") {
        const charDivNum = targetCharacter.id.match(/\d+/)[0];
        const targetCharProtectionElem = document.getElementById(`char${charDivNum}-protection`);
        let targetCharProtection = parseInt(targetCharProtectionElem.textContent);

        targetCharProtection = attackingEnemyAbilityAmount;
        
        targetCharProtectionElem.textContent = targetCharProtection;

        console.log(`applied ${attackingEnemyAbility} to ${targetCharacter.id}`);
    }
    // target all characters to zero protection
    if (attackingEnemyAbility === "Arcane Blast") {
        for (let i = 1; i <= 7; i++) {
            targetCharacter = document.getElementById(`char${i}-div`);
            if (targetCharacter.style.display === "block") {
                const targetCharProtectionElem = document.getElementById(`char${i}-protection`);
                let targetCharProtection = parseInt(targetCharProtectionElem.textContent);
                targetCharProtection = attackingEnemyAbilityAmount;
        
                targetCharProtectionElem.textContent = targetCharProtection;

                console.log(`${attackingEnemy} applied ${attackingEnemyAbility} to ${targetCharacter.id}`);
            }
        }
    }
    // target single character to damage ignoring protection
    if (attackingEnemyAbility === "Rush" || attackingEnemyAbility === "Frost Ray" || attackingEnemyAbility === "Ice Blade") {
        const charDivNum = targetCharacter.id.match(/\d+/)[0]; 
        const targetCharHealthElem = document.getElementById(`char${charDivNum}-health`);
        let targetCharHealth = parseInt(targetCharHealthElem.textContent);

        targetCharHealth -= attackingEnemyAbilityAmount;
        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await autoGetCharMaxHealth();
        if (targetCharHealth >= charHealthMax) {
            targetCharHealth = charHealthMax;
            targetCharHealthElem.style.color = "green";
        } else {
            targetCharHealthElem.style.color = "orange";
        }
        targetCharHealthElem.textContent = targetCharHealth;

        console.log(`applied ${attackingEnemyAbility} to ${targetCharacter.id}`);
    }
    // target single character to steal health ignoring protection
    if (attackingEnemyAbility === "Counter" || attackingEnemyAbility === "Sword of Light" || attackingEnemyAbility === "Siphon") {
        const charDivNum = targetCharacter.id.match(/\d+/)[0]; 
        const targetCharHealthElem = document.getElementById(`char${charDivNum}-health`);
        let targetCharHealth = parseInt(targetCharHealthElem.textContent);

        const enemyDivNum = attackingEnemy.id.match(/\d+/)[0];
        const targetEnemyHealthElem = document.getElementById(`enemy${enemyDivNum}-health`);
        let targetEnemyHealth = parseInt(targetEnemyHealthElem.textContent);

        targetCharHealth -= attackingEnemyAbilityAmount;
        targetEnemy = attackingEnemy;
        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await autoGetCharMaxHealth();
        if (targetCharHealth >= charHealthMax) {
            targetCharHealth = charHealthMax;
            targetCharHealthElem.style.color = "green";
        } else {
            targetCharHealthElem.style.color = "orange";
        }
        targetCharHealthElem.textContent = targetCharHealth;

        targetEnemyHealth += attackingEnemyAbilityAmount;
        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await autoGetEnemyMaxHealth();
        if (targetEnemyHealth >= enemyHealthMax) {
            targetEnemyHealth = enemyHealthMax;
            targetEnemyHealthElem.style.color = "green";
        } else {
            targetEnemyHealthElem.style.color = "orange";
        }
        targetEnemyHealthElem.textContent = targetEnemyHealth;

        console.log(`applied ${attackingEnemyAbility} to ${targetCharacter.id}`);
    }
    //target single enemy to heal
    if (attackingEnemyAbility === "Heal") {
        const enemyDivNum = targetEnemy.id.match(/\d+/)[0]; 
        const targetEnemyHealthElem = document.getElementById(`enemy${enemyDivNum}-health`);
        let targetEnemyHealth = parseInt(targetEnemyHealthElem.textContent);
        targetEnemyHealth += attackingEnemyAbilityAmount;

        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await autoGetEnemyMaxHealth();
        if (targetEnemyHealth >= enemyHealthMax) {
            targetEnemyHealth = enemyHealthMax;
            targetEnemyHealthElem.style.color = "green";
        } else {
            targetEnemyHealthElem.style.color = "orange";
        }
        targetEnemyHealthElem.textContent = targetEnemyHealth;

        console.log(`applied ${attackingEnemyAbility} to ${targetEnemy.id}`);
    }
    //target a enemy to heal twice
    if (attackingEnemyAbility === "Life Mage") {
        const enemyDivNum = targetEnemy.id.match(/\d+/)[0]; 
        const targetEnemyHealthElem = document.getElementById(`enemy${enemyDivNum}-health`);
        let targetEnemyHealth = parseInt(targetEnemyHealthElem.textContent);

        targetEnemyHealth += attackingEnemyAbilityAmount;
        
        //make sure health doesn't exceed max, color correctly
        const enemyHealthMax = await autoGetEnemyMaxHealth();
        if (targetEnemyHealth >= enemyHealthMax) {
            targetEnemyHealth = enemyHealthMax;
            targetEnemyHealthElem.style.color = "green";
        } else {
            targetEnemyHealthElem.style.color = "orange";
        }
        targetEnemyHealthElem.textContent = targetEnemyHealth;

        // allow ability to be used twice
        if (enemyAbilityProgress === null) {
            enemyAbilityProgress = 2;
        } else if (enemyAbilityProgress === 2) {
            enemyAbilityProgress = null;
        }

        console.log(`applied ${attackingEnemyAbility} to ${targetEnemy.id}`);
    }
    // target single enemy to protect
    if (attackingEnemyAbility === "Defend" || attackingEnemyAbility === "Parry") {
        const enemyDivNum = targetEnemy.id.match(/\d+/)[0]; 
        const targetEnemyProtectionElem = document.getElementById(`enemy${enemyDivNum}-protection`);
        let targetEnemyProtection = parseInt(targetEnemyProtectionElem.textContent);
        targetEnemyProtection += attackingEnemyAbilityAmount;
        targetEnemyProtectionElem.textContent = targetEnemyProtection;

        console.log(`applied ${attackingEnemyAbility} to ${targetEnemy.id}`);
    }
    //target a enemy to protect twice
    if (attackingEnemyAbility === " Shield") {
        const enemyDivNum = targetEnemy.id.match(/\d+/)[0]; 
        const targetEnemyProtectionElem = document.getElementById(`enemy${enemyDivNum}-protection`);
        let targetEnemyProtection = parseInt(targetEnemyProtectionElem.textContent);

        targetEnemyProtection += attackingEnemyAbilityAmount;
        targetEnemyProtectionElem.textContent = targetEnemyProtection;

        // allow ability to be used twice
        if (enemyAbilityProgress === null) {
            enemyAbilityProgress = 2;
        } else if (enemyAbilityProgress === 2) {
            enemyAbilityProgress = null;
        }

        console.log(`applied ${attackingEnemyAbility} to ${targetEnemy.id}`);
    }
    // target all enemies to protect
    if (attackingEnemyAbility === "Armor Troops" || attackingEnemyAbility === "Winged Defense" || attackingEnemyAbility === "Energy Dome") {
        for (let i = 1; i <= 7; i++) {
            const enemyDiv = document.getElementById(`enemy${i}-div`);
            if (enemyDiv.style.display === "block") {
                const targetEnemyProtectionElem = document.getElementById(`enemy${i}-protection`);
                let targetEnemyProtection = parseInt(targetEnemyProtectionElem.textContent);
                targetEnemyProtection += attackingEnemyAbilityAmount;
                targetEnemyProtectionElem.textContent = targetEnemyProtection;

                console.log(`applied ${attackingEnemyAbility} to ${targetEnemy.id}`);
            }
        }
    }
    // target all enemies to heal
    if (attackingEnemyAbility === "Yew Breeze" || attackingEnemyAbility === "Inspire") {
        for (let i = 1; i <= 7; i++) {
            const enemyDiv = document.getElementById(`enemy${i}-div`);
            if (enemyDiv.style.display === "block") {
                const targetEnemyHealthElem = document.getElementById(`enemy${i}-health`);
                let targetEnemyHealth = parseInt(targetEnemyHealthElem.textContent);
                targetEnemyHealth += attackingEnemyAbilityAmount;

                //make sure health doesn't exceed max, color correctly
                const enemyHealthMax = await autoGetAllEnemyMaxHealth(i);
                if (targetEnemyHealth >= enemyHealthMax) {
                    targetEnemyHealth = enemyHealthMax;
                    targetEnemyHealthElem.style.color = "green";
                } else {
                    targetEnemyHealthElem.style.color = "orange";
                }
                targetEnemyHealthElem.textContent = targetEnemyHealth;

                console.log(`applied ${attackingEnemyAbility} to ${targetEnemy.id}`);
            }
        }
    }
    // target all characters to damage
    if (attackingEnemyAbility === "Blast" || attackingEnemyAbility === "Fireball" || attackingEnemyAbility === "Cannon Barrage" || attackingEnemyAbility === "Blade Tornado" || attackingEnemyAbility === "Spinning Slash" || attackingEnemyAbility === "Unholy Aura") {
        for (let i = 1; i <= 7; i++) {
            targetCharacter = document.getElementById(`char${i}-div`);
            if (targetCharacter.style.display === "block") {
                const targetCharHealthElem = document.getElementById(`char${i}-health`);
                const targetCharProtectionElem = document.getElementById(`char${i}-protection`);
                let targetCharHealth = parseInt(targetCharHealthElem.textContent);
                let targetCharProtection = parseInt(targetCharProtectionElem.textContent);
                // if character has protection
                targetCharProtection -= attackingEnemyAbilityAmount;
                if (targetCharProtection < 0) {
                    let remainder = Math.abs(targetCharProtection);
                    targetCharProtection = 0;
                    targetCharHealth -= remainder;
                }
                //make sure health doesn't exceed max, color correctly
                const charHealthMax = await autoGetCharMaxHealth();
                if (targetCharHealth >= charHealthMax) {
                    targetCharHealth = charHealthMax;
                    targetCharHealthElem.style.color = "green";
                } else {
                    targetCharHealthElem.style.color = "orange";
                }
                targetCharProtectionElem.textContent = targetCharProtection;
                targetCharHealthElem.textContent = targetCharHealth;

                console.log(`${attackingEnemy} applied ${attackingEnemyAbility} to ${targetCharacter.id}`);
            }
        }
    }
    //target a character to damage twice
    if (attackingEnemyAbility === "Swinging Slash" || attackingEnemyAbility === "Crush" || attackingEnemyAbility === "Blade Volley" || attackingEnemyAbility === "Wide Slash" || attackingEnemyAbility === "Quick Fire" || attackingEnemyAbility === "Water Whip") {
        const charDivNum = targetCharacter.id.match(/\d+/)[0]; 
        const targetCharHealthElem = document.getElementById(`char${charDivNum}-health`);
        const targetCharProtectionElem = document.getElementById(`char${charDivNum}-protection`);
        let targetCharHealth = parseInt(targetCharHealthElem.textContent);
        let targetCharProtection = parseInt(targetCharProtectionElem.textContent);

        // if character has protection
        targetCharProtection -= attackingEnemyAbilityAmount;
        if (targetCharProtection < 0) {
            let remainder = Math.abs(targetCharProtection);
            targetCharProtection = 0;
            targetCharHealth -= remainder;
        }
        //make sure health doesn't exceed max, color correctly
        const charHealthMax = await autoGetCharMaxHealth();
        if (targetCharHealth >= charHealthMax) {
            targetCharHealth = charHealthMax;
            targetCharHealthElem.style.color = "green";
        } else {
            targetCharHealthElem.style.color = "orange";
        }
        targetCharProtectionElem.textContent = targetCharProtection;
        targetCharHealthElem.textContent = targetCharHealth;

        // allow ability to be used twice
        if (enemyAbilityProgress === null) {
            enemyAbilityProgress = 2;
        } else if (enemyAbilityProgress === 2) {
            enemyAbilityProgress = null;
        }

        console.log(`applied ${attackingEnemyAbility} to ${targetCharacter.id}`);
    }
    // summon enemy
    if (attackingEnemyAbility === "Demand" || attackingEnemyAbility === "All Hands" || attackingEnemyAbility === "Necromancer" || attackingEnemyAbility === "Orders") {
        findNextOpenEnemyDiv();
        summonEnemyCard();

        console.log(`applied ${attackingEnemyAbility}`);
    }
}

let enemySummonCards = [];

async function findEnemySummonCards() {
    const res = await fetch(`API_BASE_URL/api/enemies/type/${currentlyAt}`);
    const data = await res.json();
    enemySummonCards = data;
}

function summonEnemyCard() {
    const randomEnemy = Math.floor(Math.random() * enemySummonCards.length);
    const drawnEnemy = enemySummonCards[randomEnemy];

    document.getElementById(`enemy${nextOpenEnemyDiv}-div`).style.display = "block";
    document.getElementById(`enemy${nextOpenEnemyDiv}-img`).src = `images/enemies/${drawnEnemy.image_id}.png`;
    document.getElementById(`enemy${nextOpenEnemyDiv}-health`).textContent = drawnEnemy.health_max;
    document.getElementById(`enemy${nextOpenEnemyDiv}-health`).style.color = "green";
    document.getElementById(`enemy${nextOpenEnemyDiv}-protection`).textContent = drawnEnemy.initial_protection;
    document.getElementById(`enemy${nextOpenEnemyDiv}-ability1-name`).textContent = drawnEnemy.ability1_name;
    document.getElementById(`enemy${nextOpenEnemyDiv}-ability1-desc`).textContent = drawnEnemy.ability1_desc;

    document.getElementById(`enemy${nextOpenEnemyDiv}-div`).style.border = "2px solid limegreen";
}

async function autoGetCharMaxHealth() {
    const imgElem = targetCharacter.querySelector('img');
    let src = imgElem.src.split('/').pop(); 
    let image_id = src.replace('Base.png', '').replace('Leader.png', '');

    const res = await fetch(`API_BASE_URL/api/character/${image_id}`);
    const data = await res.json();
    return data.health_max;
}

async function autoGetEnemyMaxHealth() {
    const imgElem = targetEnemy.querySelector('img');
    let src = imgElem.src.split('/').pop(); 
    let image_id = src.replace('.png', '');

    const res = await fetch(`API_BASE_URL/api/enemy/${image_id}`);
    const data = await res.json();
    return data.health_max;
}

async function autoGetAllEnemyMaxHealth(index) {
    const imgElem = document.getElementById(`enemy${index}-img`);
    let src = imgElem.src.split('/').pop(); 
    let image_id = src.replace('.png', '');

    const res = await fetch(`API_BASE_URL/api/enemy/${image_id}`);
    const data = await res.json();
    return data.health_max;
}

function autoCheckForDeadCharacters() {
    for (let i = 1; i <= 7; i++) {
        const charDiv = document.getElementById(`char${i}-div`);
        const charHealth = parseInt(document.getElementById(`char${i}-health`).textContent);
        const charHealthElem = document.getElementById(`char${i}-health`);
        // Only decrement if the character is alive (visible) and now dead
        if (charHealth <= 0 && charDiv.style.display === "block") {
            charDiv.style.display = "none";
            charHealthElem.style.color = "green";
        }
    }
}

function autoCheckForDefeat() {
    let aliveCharCount = 0;
    for (let i = 1; i <= 7; i++) {
        const charDiv = document.getElementById(`char${i}-div`);
        if (charDiv.style.display === "block") {
            aliveCharCount++;
        }
    }
    if (aliveCharCount === 0) {
        waitUntilFinished(false);
        document.getElementById("defeat-page-div").style.display = "block";
        resetCharSelection();
        hideAllEnemyCharacterDivs();

        autoRemoveAllBorders();
        //reset auto variables
        visibleEnemies = [];
        attackingEnemy = null;
        attackingEnemyAbility = null;
        attackingEnemyAbilityAmount = 0;
        attackingEnemyAbilityType = null;
        targetCharacter = null;
        targetEnemy = null;
        enemyAbilityProgress = null;
        bestEnemyTarget = null;
        bestCharTarget = null;

        return;
    }

    console.log("aliveCharCount: ", aliveCharCount);
}

function autoCheckForUnplayedEnemies() {
    if (visibleEnemies.length === 0) {
        waitUntilFinished(false);
        updateBattleVariables();

        document.getElementById("enemy-turn-img").style.display = "none";
        document.getElementById("player-turn-img").style.display = "block";
    } else {
        autoEnemyTurnCycle();
    }
}

function autoRemoveAllBorders() { // and highlights
    for (let i = 1; i <= 7; i++) {
        const charDiv = document.getElementById(`char${i}-div`);
        charDiv.style.border = "none";
    }
    for (let i = 1; i <= 7; i++) {
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        enemyDiv.style.border = "none";

        document.getElementById(`enemy${i}-ability1-name`).style.backgroundColor = "";
        if (i === 1) {
            document.getElementById(`enemy${i}-ability2-name`).style.backgroundColor = "";
            document.getElementById(`enemy${i}-ability3-name`).style.backgroundColor = "";
        }
    }
}

let leaderAbilityNumber = 0;

function autoChooseLeaderAbility() {
    let abilityNumberArray = [];
    if (currentlyAt === "arcane") {
        abilityNumberArray = [3, 2, 2, 2, 1, 1, 1, 1, 1, 1];
    } else {
        calculateShowingEnemies();
        if (showingEnemies.length < 7) {
            abilityNumberArray = [3, 2, 2, 2, 1, 1, 1, 1, 1, 1];
            // abilityNumberArray = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
        } else {
            abilityNumberArray = [2, 2, 2, 1, 1, 1, 1, 1, 1, 1];
            // abilityNumberArray = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
        }
    }
    const randomIndex = Math.floor(Math.random() * abilityNumberArray.length);
    leaderAbilityNumber = abilityNumberArray[randomIndex];
}

function calculateShowingEnemies() {
    showingEnemies = [];
    for (let i = 1; i <= 7; i++) {
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        if (enemyDiv && window.getComputedStyle(enemyDiv).display === "block") {
            showingEnemies.push(i);
        }
    }
}

let nextOpenEnemyDiv = null;
let openEnemyDivs = [];

//find next open enemy div
function findNextOpenEnemyDiv() {
    openEnemyDivs = [];
    for (let i = 1; i <= 7; i++) {
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        if (enemyDiv && window.getComputedStyle(enemyDiv).display === "none") {
            openEnemyDivs.push(i);
        }
    }
    nextOpenEnemyDiv = Math.min(...openEnemyDivs);
}

let banditProgress = 1;
let ghoulProgress = 1;
let arcaneProgress = 1;
let legionProgress = 1;
let pirateProgress = 1;

let currentBattleButton = null;

async function pullFactionProgress() {
    const res = await fetch(`API_BASE_URL/api/players/${currentUsername}`);
    const data = await res.json();
    banditProgress = data.bandit_track;
    ghoulProgress = data.ghoul_track;
    arcaneProgress = data.arcane_track;
    legionProgress = data.legion_track;
    pirateProgress = data.pirate_track;
}

async function pushFactionProgress() {
    // bandit buttons victory watch
    if (currentBattleButton === "bandit-cliff" && banditProgress === 1) {
        banditProgress = 2;
    }
    if (currentBattleButton === "bandit-camp" && banditProgress === 2) {
        banditProgress = 3;
    }
    if (currentBattleButton === "bandit-riverside" && banditProgress === 3) {
        banditProgress = 4;
    }
    if (currentBattleButton === "bandit-grove" && banditProgress === 4) {
        banditProgress = 5;
    }
    if (currentBattleButton === "bandit-crossing" && banditProgress === 5) {
        banditProgress = 6;
    }
    if (currentBattleButton === "bandit-thicket" && banditProgress === 6) {
        banditProgress = 7;
    }
    if (currentBattleButton === "bandit-fort" && banditProgress === 7) {
        banditProgress = 8; // bandit faction complete
    }
    // ghoul buttons victory watch
    if (currentBattleButton === "ghoul-beach" && ghoulProgress === 1) {
        ghoulProgress = 2;
    }
    if (currentBattleButton === "ghoul-walls" && ghoulProgress === 2) {
        ghoulProgress = 3;
    }
    if (currentBattleButton === "ghoul-houses" && ghoulProgress === 3) {
        ghoulProgress = 4;
    }
    if (currentBattleButton === "ghoul-entrance" && ghoulProgress === 4) {
        ghoulProgress = 5;
    }
    if (currentBattleButton === "ghoul-caves1" && ghoulProgress === 5) {
        ghoulProgress = 6;
    }
    if (currentBattleButton === "ghoul-caves2" && ghoulProgress === 6) {
        ghoulProgress = 7;
    }
    if (currentBattleButton === "ghoul-citadel" && ghoulProgress === 7) {
        ghoulProgress = 8; // ghoul faction complete
    }
    // legion buttons victory watch
    if (currentBattleButton === "legion-cliff" && legionProgress === 1) {
        legionProgress = 2;
    }
    if (currentBattleButton === "legion-plains1" && legionProgress === 2) {
        legionProgress = 3;
    }
    if (currentBattleButton === "legion-crossroads" && legionProgress === 3) {
        legionProgress = 4;
    }
    if (currentBattleButton === "legion-steeps" && legionProgress === 4) {
        legionProgress = 5;
    }
    if (currentBattleButton === "legion-courtyard" && legionProgress === 5) {
        legionProgress = 6;
    }
    if (currentBattleButton === "legion-castle" && legionProgress === 6) {
        legionProgress = 7; // legion faction complete
    }
    // arcane buttons victory watch
    if (currentBattleButton === "arcane-beach1" && arcaneProgress === 1) {
        arcaneProgress = 2;
    }
    if (currentBattleButton === "arcane-beach2" && arcaneProgress === 2) {
        arcaneProgress = 3;
    }
    if (currentBattleButton === "arcane-fields" && arcaneProgress === 3) {
        arcaneProgress = 4;
    }
    if (currentBattleButton === "arcane-town" && arcaneProgress === 4) {
        arcaneProgress = 5;
    }
    if (currentBattleButton === "legion-college" && legionProgress === 5) {
        legionProgress = 6; // legion faction complete
    }
    // pirate victory watch
    if (currentlyAt === "pirate" && leaderBattle === true) {
        pirateProgress = 2; // pirate faction complete
    }
    

    const progressData = {
        bandit: banditProgress,
        ghoul: ghoulProgress,
        arcane: arcaneProgress,
        legion: legionProgress,
        pirate: pirateProgress
    };
    await fetch(`API_BASE_URL/api/players/${currentUsername}/faction/all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progressData)
    });
}

function showFactionButtons() {
    if (currentlyAt === "bandit") {
        if (banditProgress > 1) {
            banditCampButton.style.display = "block";
        }
        if (banditProgress > 2) {
            banditRiversideButton.style.display = "block";
        }
        if (banditProgress > 3) {
            banditGroveButton.style.display = "block";
        }
        if (banditProgress > 4) {
            banditCrossingButton.style.display = "block";
        }
        if (banditProgress > 5) {
            banditUpstreamButton.style.display = "block";
            banditThicketButton.style.display = "block";
        }
        if (banditProgress > 6) {
            banditFortButton.style.display = "block";
        }
    }
    if (currentlyAt === "ghoul") {
        if (ghoulProgress > 1) {
            ghoulWallsButton.style.display = "block";
        }
        if (ghoulProgress > 2) {
            ghoulHousesButton.style.display = "block";
        }
        if (ghoulProgress > 3) {
            ghoulEntranceButton.style.display = "block";
        }
        if (ghoulProgress > 4) {
            ghoulCaves1Button.style.display = "block";
            ghoulTraderButton.style.display = "block";
        }
        if (ghoulProgress > 5) {
            ghoulCaves2Button.style.display = "block";
        }
        if (ghoulProgress > 6) {
            ghoulCitadelButton.style.display = "block";
        }
    }
    if (currentlyAt === "legion") {
        if (legionProgress > 1) {
            legionPlains1Button.style.display = "block";
        }
        if (legionProgress > 2) {
            legionCrossroadsButton.style.display = "block";
        }
        if (legionProgress > 3) {
            legionSteepsButton.style.display = "block";
            legionTraderButton.style.display = "block";
            legionPlains2Button.style.display = "block";
        }
        if (legionProgress > 4) {
            legionCourtyardButton.style.display = "block";
        }
        if (legionProgress > 5) {
            legionCastleButton.style.display = "block";
        }
    }
    if (currentlyAt === "arcane") {
        if (arcaneProgress > 1) {
            arcaneBeach2Button.style.display = "block";
        }
        if (arcaneProgress > 2) {
            arcaneAcademyButton.style.display = "block";
            arcaneFieldsButton.style.display = "block";
        }
        if (arcaneProgress > 3) {
            arcaneTownButton.style.display = "block";
        }
        if (arcaneProgress > 4) {
            arcaneFallsButton.style.display = "block";
            arcaneCollegeButton.style.display = "block";
            arcaneTraderButton.style.display = "block";
        }
    }
}

function giveLeaderTrophy() {
    if (leaderBattle === true && currentBattleButton === "bandit-fort") {
        // give trophy
    }
}

// victory / defeat buttons
document.getElementById("victory-button").addEventListener('click', function() {
    document.getElementById("victory-page-div").style.display = "none";
    battleDivs.style.display = "none";

    pushFactionProgress();
    giveLeaderTrophy();
    showFactionButtons();

    if (currentlyAt === "pirate") {
        currentlyAt = sailingTo;
        sailingTo = null;
    }

    document.body.style.backgroundImage = `url('images/maps/map_${currentlyAt}.png')`;

    if (currentlyAt === "bandit") {
        banditButtonsDiv.style.display = "block";
    }
    if (currentlyAt === "home") {
        homeButtonsDiv.style.display = "block";
    }
    if (currentlyAt === "ghoul") {
        ghoulButtonsDiv.style.display = "block";
    }
    if (currentlyAt === "legion") {
        legionButtonsDiv.style.display = "block";
    }
    if (currentlyAt === "arcane") {
        arcaneButtonsDiv.style.display = "block";
    }

    // add earned bond to players db table
    fetch(`API_BASE_URL/api/players/${currentUsername}/plusBond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: difficulties[currentlyAt][difficulty].reward }) 
        })
        .then(res => res.json())
        .then(data => console.log('New bond:', data.bond));

    crossfadeMusic(currentSound, travelMusic, 4000);
});

document.getElementById("defeat-button").addEventListener('click', function() {
    document.getElementById("defeat-page-div").style.display = "none";
    battleDivs.style.display = "none";

    if (currentlyAt === "pirate") {
        currentlyAt = "home";
        sailingTo = null;
        homeButtonsDiv.style.display = "block";
    }
    
    document.body.style.backgroundImage = `url('images/maps/map_${currentlyAt}.png')`;
    if (currentlyAt === "bandit") {
        banditButtonsDiv.style.display = "block";
    }
    if (currentlyAt === "legion") {
        legionButtonsDiv.style.display = "block";
    }
    if (currentlyAt === "ghoul") {
        ghoulButtonsDiv.style.display = "block";
    }
    if (currentlyAt === "arcane") {
        arcaneButtonsDiv.style.display = "block";
    }

    crossfadeMusic(currentSound, travelMusic, 4000);
});

//trader buttons and logic etc
const totalBondDiv = document.getElementById("total-bond-div");
const traderCharacterListDiv = document.getElementById("trader-characters-div");
const exitTraderButton = document.getElementById("exit-trader-button");
const bribeTraderButton = document.getElementById("bribe-trader-button");

let returnHome = false;
//home trader buttons
document.getElementById("home-traders-button").addEventListener('click', function() {
    document.getElementById("home-buttons-div").style.display = "none";
    document.getElementById("alden-traders-div").style.display = "block";
    showBribedTraders();
});
document.getElementById("traders-home").addEventListener('click', function() {
    document.getElementById("alden-traders-div").style.display = "none";
    initializeTrader();
});
document.getElementById("traders-ghoul").addEventListener('click', function() {
    document.getElementById("alden-traders-div").style.display = "none";
    returnHome = true;
    currentlyAt = "ghoul";
    initializeTrader();
});
document.getElementById("traders-legion").addEventListener('click', function() {
    document.getElementById("alden-traders-div").style.display = "none";
    returnHome = true;
    currentlyAt = "legion";
    initializeTrader();
});
document.getElementById("traders-arcane").addEventListener('click', function() {
    document.getElementById("alden-traders-div").style.display = "none";
    returnHome = true;
    currentlyAt = "arcane";
    initializeTrader();
});

function showBribedTraders() {
    if (ghoulTraderBribed === true) {
        document.getElementById("ghoul-trader-button").style.display = "none";
        document.getElementById("traders-ghoul").style.display = "block";
    } else {
        document.getElementById("traders-ghoul").style.display = "none";
    }
    if (legionTraderBribed === true) {
        document.getElementById("legion-trader-button").style.display = "none";
        document.getElementById("traders-legion").style.display = "block";
    } else {
        document.getElementById("traders-legion").style.display = "none";
    }
    if (arcaneTraderBribed === true) {
        document.getElementById("arcane-trader-button").style.display = "none";
        document.getElementById("traders-arcane").style.display = "block";
    } else {
        document.getElementById("traders-arcane").style.display = "none";
    }
}

// location trader buttons
document.getElementById("ghoul-trader-button").addEventListener('click', function() {
    initializeTrader();
});
document.getElementById("legion-trader-button").addEventListener('click', function() {
    initializeTrader();
});
document.getElementById("arcane-trader-button").addEventListener('click', function() {
    initializeTrader();
});

exitTraderButton.addEventListener('click', function() {
    if (returnHome === true) {
        document.getElementById(`${currentlyAt}-trader-div`).style.display = "none";
        currentlyAt = "home";
        returnHome = false;
    }
    document.body.style.backgroundImage = `url('images/maps/map_${currentlyAt}.png')`;
    totalBondDiv.style.display = "none";
    traderCharacterListDiv.style.display = "none";
    exitTraderButton.style.display = "none";
    bribeTraderButton.style.display = "none";
    document.getElementById(`${currentlyAt}-trader-div`).style.display = "none";
    document.getElementById(`${currentlyAt}-buttons-div`).style.display = "block";

    console.log("Exited trader");
    crossfadeMusic(currentSound, travelMusic, 4000);
});

let bribeCost = null;
let ghoulTraderBribed = false;
let legionTraderBribed = false;
let arcaneTraderBribed = false;

bribeTraderButton.addEventListener('click', function() {
    document.getElementById("bribe-trader-div").style.display = "block";
    if (currentlyAt === "ghoul") {
        document.getElementById("bribe-trader-text").textContent = "BRIBE TRADER FOR 3000 BOND?";
        bribeCost = 3000;
    } else if (currentlyAt === "legion") {
        document.getElementById("bribe-trader-text").textContent = "BRIBE TRADER FOR 4000 BOND?";
        bribeCost = 4000;
    } else if (currentlyAt === "arcane") {
        document.getElementById("bribe-trader-text").textContent = "BRIBE TRADER FOR 5000 BOND?";
        bribeCost = 5000;
    }
});

document.getElementById("bribe-trader-yes-button").addEventListener('click', async function() {
    if (bribeCost > parseInt(document.getElementById("total-bond-text").textContent)) {
        alert("Not enough bond to bribe this trader");
        return;
    } else {
        await bondPurchase(bribeCost);
        if (currentlyAt === "ghoul") {
            ghoulTraderBribed = true;
            document.getElementById("ghoul-trader-button").style.display = "none";
            document.getElementById("traders-ghoul").style.display = "block";
        }
        if (currentlyAt === "legion") {
            legionTraderBribed = true;
            document.getElementById("legion-trader-button").style.display = "none";
            document.getElementById("traders-legion").style.display = "block";
        }
        if (currentlyAt === "arcane") {
            arcaneTraderBribed = true;
            document.getElementById("arcane-trader-button").style.display = "none";
            document.getElementById("traders-arcane").style.display = "block";
        }
        document.getElementById("bribe-trader-div").style.display = "none";
        bribeTraderButton.style.display = "none";
        await pushBribedTradersToDB();
        showBribedTraders();
    }
});

async function pushBribedTradersToDB() {
    await fetch(`API_BASE_URL/api/players/${currentUsername}/bribedTraders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ghoulTraderBribed,
            legionTraderBribed,
            arcaneTraderBribed
        })
    });
}

document.getElementById("bribe-trader-no-button").addEventListener('click', function() {
    document.getElementById("bribe-trader-div").style.display = "none";
});

async function initializeTrader() {
    document.body.style.backgroundImage = `url('images/traders/trader-${currentlyAt}-shop.png')`;
    crossfadeMusic(currentSound, menuMusic, 4000);
    totalBondDiv.style.display = "block";
    traderCharacterListDiv.style.display = "block";
    exitTraderButton.style.display = "block";
    if (currentlyAt === "ghoul" && ghoulTraderBribed === false) {
        bribeTraderButton.style.display = "block";
    } else if (currentlyAt === "legion" && legionTraderBribed === false) {
        bribeTraderButton.style.display = "block";
    } else if (currentlyAt === "arcane" && arcaneTraderBribed === false) {
        bribeTraderButton.style.display = "block";
    } else {
        bribeTraderButton.style.display = "none";
    }
    document.getElementById(`${currentlyAt}-trader-div`).style.display = "block";
    document.getElementById(`${currentlyAt}-buttons-div`).style.display = "none";

    await initializeTotalBond();
    await listLeaderCharacter();
    await listBaseCharacters();
    await showCharacterCards();
}

async function initializeTotalBond() { // show total bond on trader initialize
    const res = await fetch(`API_BASE_URL/api/players/${currentUsername}`);
    const data = await res.json();
    document.getElementById("total-bond-text").textContent = data.bond;
}

async function listLeaderCharacter() {
    const res = await fetch(`API_BASE_URL/api/${currentUsername}/cards/leader`);
    const data = await res.json();
    document.getElementById("trader-character1").textContent = data.name;
    document.getElementById("trader-character1").style.display = "block";
}

async function listBaseCharacters() {
    const res = await fetch(`API_BASE_URL/api/${currentUsername}/cards/base`);
    const data = await res.json();
    for (let i = 0; i < data.length; i++) {
        document.getElementById(`trader-character${i + 2}`).textContent = data[i].name;
        document.getElementById(`trader-character${i + 2}`).style.display = "block";
        
    }
}

async function showCharacterCards() {
    let shopNumber = 0;
    if (currentlyAt === "home") {
        shopNumber = 1;
    } else if (currentlyAt === "ghoul") {
        shopNumber = 2;
    } else if (currentlyAt === "legion") {
        shopNumber = 3;
    } else if (currentlyAt === "arcane") {
        shopNumber = 4;
    }

    const res = await fetch(`API_BASE_URL/api/${currentUsername}/cards/shop/${shopNumber}`);
    const shopCards = await res.json();

    for (let i = 0; i < 4; i++) {
        if (shopCards[i] === undefined) {
            document.getElementById(`${currentlyAt}-card${i + 1}-div`).style.display = "none";
        } else {
            document.getElementById(`${currentlyAt}-card${i + 1}-img`).src = `images/base-characters/${shopCards[i].image_id}Base.png`;
        }
    }
}

let upgradeType = null;
let upgradeCost = null;
let upgradeClicked = false;
let needToChooseAbility = false;
let abilityChosen = null;

let clickedCardImageId = null;
let clickedCardElemId = null;
let clickedCardNumber = null;
let clickedCardCost = null;

// click on trader-card-img query selector class
const traderCardImages = document.querySelectorAll('.trader-card-img');
traderCardImages.forEach(card => {
    card.addEventListener('click', async function() {

        // pull out image id from card src
        clickedCardImageId = card.src.split('/').pop().split('.')[0].replace("Base", "");
        clickedCardElemId = card.id;
        clickedCardNumber = clickedCardElemId.match(/\d+/)[0];
        clickedCardCost = document.getElementById(`${currentlyAt}-card${clickedCardNumber}-cost-text`).textContent;
        if (clickedCardCost > parseInt(document.getElementById("total-bond-text").textContent)) {
            alert("Not enough bond to buy this card");
            return;
        } else {
            document.getElementById("buy-card-div").style.display = "block";
            await populatebuyCard();
        }
    })
});

async function populatebuyCard() {
    const res = await fetch(`API_BASE_URL/api/${currentUsername}/cards/image/${clickedCardImageId}`);
    const cardData = await res.json();
    document.getElementById("buy-card-character-img").src = `images/base-characters/${cardData.image_id}Base.png`;
    document.getElementById("buy-card-character-protection").textContent = cardData.initial_protection;
    document.getElementById("buy-card-character-health").textContent = cardData.health_max;
    document.getElementById("buy-card-character-ability1-name").textContent = cardData.ability1_name;
    document.getElementById("buy-card-character-ability1-desc").textContent = cardData.ability1_desc;
    document.getElementById("buy-card-character-ability1-cost").textContent = cardData.ability1_cost;
    document.getElementById("buy-card-character-ability2-name").textContent = cardData.ability2_name;
    document.getElementById("buy-card-character-ability2-desc").textContent = cardData.ability2_desc;
    document.getElementById("buy-card-character-ability2-cost").textContent = cardData.ability2_cost;
    document.getElementById("buy-card-character-ability2-uses").textContent = cardData.ability2_uses;

    document.getElementById("buy-card-text").textContent = `BUY CARD FOR ${clickedCardCost} BOND?`;
}

// buy card no button click
document.getElementById("buy-card-no-button").addEventListener("click", function() {
    document.getElementById("buy-card-div").style.display = "none";
    resetShop();
});

// buy card yes button click
document.getElementById("buy-card-yes-button").addEventListener("click", async function() {
    await pushTypeChangeToDB();
    document.getElementById("buy-card-div").style.display = "none";
    await bondPurchase(clickedCardCost);
    resetShop();
    await initializeTrader();
});

async function pushTypeChangeToDB() {
    await fetch(`API_BASE_URL/api/${currentUsername}/cards/setBase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_id: clickedCardImageId })
    });
}

// click on trader-upgrade-img query selector class
const traderUpgradeImages = document.querySelectorAll('.trader-upgrade-img');
traderUpgradeImages.forEach(upgrade => {
    upgrade.addEventListener('click', async function() {
        if (upgrade.style.border === "2px solid darkcyan" && upgradeClicked === true) {
            resetShop();
        } else {
            resetShop();
            if (upgrade.src.endsWith("armor-upgrade-icon.png")) {
                upgradeClicked = true;
                upgradeType = "armor";
                upgradeCost = document.getElementById(`${currentlyAt}-armor-cost-text`).textContent;

                upgrade.style.border = "2px solid darkcyan";
            }
            if (upgrade.src.endsWith("ab-proper-upgrade-icon.png")) {
                upgradeClicked = true;
                upgradeType = "gold";
                upgradeCost = document.getElementById(`${currentlyAt}-gold-cost-text`).textContent;

                upgrade.style.border = "2px solid darkcyan";
            }
            if (upgrade.src.endsWith("ab-uses-upgrade-icon.png")) {;
                upgradeClicked = true;
                upgradeType = "green";
                upgradeCost = document.getElementById(`${currentlyAt}-green-cost-text`).textContent;

                upgrade.style.border = "2px solid darkcyan";
            }
            if (upgrade.src.endsWith("ab-cost-upgrade-icon.png")) {
                upgradeClicked = true;
                needToChooseAbility = true;
                upgradeType = "red";
                upgradeCost = document.getElementById(`${currentlyAt}-red-cost-text`).textContent;

                upgrade.style.border = "2px solid darkcyan";
            } 



            if (upgradeCost > parseInt(document.getElementById("total-bond-text").textContent)) {
                alert("Not enough bond for this upgrade");
                resetShop();
            }
            console.log("Clicked upgrade", upgradeClicked);
            console.log("upgradeType: ", upgradeType);
            console.log("upgradeCost: ", upgradeCost);
        }
    })
});

function resetShop() {
    upgradeClicked = false;
    upgradeType = null;
    upgradeCost = null;
    needToChooseAbility = false;
    abilityChosen = null;

    clickedCardImageId = null;
    clickedCardElemId = null;
    clickedCardNumber = null;
    clickedCardCost = null;

    traderCardImages.forEach(card => {
        card.style.border = "none";
    });
    traderUpgradeImages.forEach(upgrade => {
        upgrade.style.border = "none";
    });

    document.getElementById("before-upgrade-ability1-name").style.backgroundColor = "";
    document.getElementById("before-upgrade-ability2-name").style.backgroundColor = "";
    document.getElementById("after-upgrade-ability2-name").style.color = "purple";
}

// click on character in list to apply upgrade to
const traderCharacterList = document.querySelectorAll('.character-list-button');
let characterListButtonClickedName = null;
let characterListButtonClickedLeader = false;

traderCharacterList.forEach(character => {
    character.addEventListener('click', async function() {
        if (upgradeClicked === false) {
            alert("Select an upgrade first");
            return;
        }
        if (character.id === "trader-character1") {
            characterListButtonClickedLeader = true;
        } else {
            characterListButtonClickedLeader = false;
        }
        if (upgradeClicked === true) {
            characterListButtonClickedName = character.textContent;
            console.log("characterListButtonClickedName: ", characterListButtonClickedName);
            document.getElementById("confirm-purchase-div").style.display = "block";
            await populateConfirmPurchasePage();
            await updateConfirmPurchasePage();
            document.getElementById("confirm-purchase-text").textContent = `UPGRADE FOR ${upgradeCost} BOND?`;
        }
    });
});

// confirm purchase no button click
document.getElementById("confirm-purchase-no-button").addEventListener("click", function() {
    document.getElementById("confirm-purchase-div").style.display = "none";
    resetShop();
});

// confirm purchase yes button click
document.getElementById("confirm-purchase-yes-button").addEventListener("click", async function() {
    await pushPurchaseToDB();
    document.getElementById("confirm-purchase-div").style.display = "none";
    await bondPurchase(upgradeCost);

    resetShop();
});

async function populateConfirmPurchasePage() {
    const res = await fetch(`API_BASE_URL/api/${currentUsername}/cards/name/${encodeURIComponent(characterListButtonClickedName)}`);
    const characterData = await res.json();
    await checkAbilityStatus(characterData);
    
    if (characterListButtonClickedLeader === true) {
        document.getElementById("before-upgrade-img").src = `images/leader-characters/${characterData.image_id}Leader.png`;
        document.getElementById("after-upgrade-img").src = `images/leader-characters/${characterData.image_id}Leader.png`;

        document.getElementById("confirm-purchase-img").src = "images/confirm-purchase-page-leader.png";
    } else {
        document.getElementById("before-upgrade-img").src = `images/base-characters/${characterData.image_id}Base.png`;
        document.getElementById("after-upgrade-img").src = `images/base-characters/${characterData.image_id}Base.png`;

        document.getElementById("confirm-purchase-img").src = "images/confirm-purchase-page.png";
    }
    if (ab1Upgraded === true) {
        document.getElementById("before-upgrade-ability1-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability1-name").style.color = "goldenrod";
    } else {
        document.getElementById("before-upgrade-ability1-name").style.color = "blue";
        document.getElementById("after-upgrade-ability1-name").style.color = "blue";
    }
    if (ab2Upgraded === true) {
        document.getElementById("before-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
    } else {
        document.getElementById("before-upgrade-ability2-name").style.color = "purple";
        document.getElementById("after-upgrade-ability2-name").style.color = "purple";
    }
    document.getElementById("before-upgrade-health").textContent = characterData.health_max;
    document.getElementById("before-upgrade-protection").textContent = characterData.initial_protection;
    document.getElementById("before-upgrade-ability1-name").textContent = characterData.ability1_name;
    document.getElementById("before-upgrade-ability1-desc").textContent = characterData.ability1_desc;
    document.getElementById("before-upgrade-ability1-cost").textContent = characterData.ability1_cost;
    document.getElementById("before-upgrade-ability2-name").textContent = characterData.ability2_name;
    document.getElementById("before-upgrade-ability2-desc").textContent = characterData.ability2_desc;
    document.getElementById("before-upgrade-ability2-cost").textContent = characterData.ability2_cost;
    document.getElementById("before-upgrade-ability2-uses").textContent = characterData.ability2_uses;

    document.getElementById("after-upgrade-health").textContent = characterData.health_max;
    document.getElementById("after-upgrade-protection").textContent = characterData.initial_protection;
    document.getElementById("after-upgrade-ability1-name").textContent = characterData.ability1_name;
    document.getElementById("after-upgrade-ability1-desc").textContent = characterData.ability1_desc;
    document.getElementById("after-upgrade-ability1-cost").textContent = characterData.ability1_cost;
    document.getElementById("after-upgrade-ability2-name").textContent = characterData.ability2_name;
    document.getElementById("after-upgrade-ability2-desc").textContent = characterData.ability2_desc;
    document.getElementById("after-upgrade-ability2-cost").textContent = characterData.ability2_cost;
    document.getElementById("after-upgrade-ability2-uses").textContent = characterData.ability2_uses;

    if (needToChooseAbility === true) {
        document.getElementById("choose-ability-text").style.display = "block";
    } else {
        document.getElementById("choose-ability-text").style.display = "none";
    }
}

async function updateConfirmPurchasePage() {
    if (upgradeType === "armor") {
        let beforeArmor = parseInt(document.getElementById("before-upgrade-protection").textContent);
        beforeArmor += 5;
        document.getElementById("after-upgrade-protection").textContent = beforeArmor;
    }
    if (upgradeType === "gold") {
        updateAbility2();
    }
    if (upgradeType === "green") {
        let beforeAbility2Uses = parseInt(document.getElementById("before-upgrade-ability2-uses").textContent);
        if (beforeAbility2Uses === 5) {
            alert("Ability 2 uses cannot exceed 5");
            return;
        } else {
            beforeAbility2Uses += 1;
            document.getElementById("after-upgrade-ability2-uses").textContent = beforeAbility2Uses;
        }
    }
    if (upgradeType === "red") {
        if (abilityChosen === 1) {
            let beforeAbility1Cost = parseInt(document.getElementById("before-upgrade-ability1-cost").textContent);
            if (beforeAbility1Cost === 1) {
                alert("Ability costs cannot be less than 1");
                return;
            } else {
                beforeAbility1Cost -= 1;
                document.getElementById("after-upgrade-ability1-cost").textContent = beforeAbility1Cost;
            }
        }
        if (abilityChosen === 2) {
            let beforeAbility2Cost = parseInt(document.getElementById("before-upgrade-ability2-cost").textContent);
            if (beforeAbility2Cost === 1) {
                alert("Ability costs cannot be less than 1");
                return;
            } else {
                beforeAbility2Cost -= 1;
                document.getElementById("after-upgrade-ability2-cost").textContent = beforeAbility2Cost;
            }
        }
    }
}

// keydown listener for upgrade div
document.addEventListener("keydown", async function(event) {
    // Only run if confirm-purchase-div is visible
    if (document.getElementById("confirm-purchase-div").style.display === "block" && needToChooseAbility === true) {
        if (event.key === "1") {
            abilityChosen = 1;
            document.getElementById("before-upgrade-ability1-name").style.backgroundColor = "yellow";
            document.getElementById("before-upgrade-ability2-name").style.backgroundColor = "";
            await populateConfirmPurchasePage();
            await updateConfirmPurchasePage();
        } else if (event.key === "2") {
            abilityChosen = 2;
            document.getElementById("before-upgrade-ability2-name").style.backgroundColor = "yellow";
            document.getElementById("before-upgrade-ability1-name").style.backgroundColor = "";
            await populateConfirmPurchasePage();
            await updateConfirmPurchasePage();
        }
    }
});

function updateAbility2() {
    if (characterListButtonClickedName === "Maggie") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Call Large Creature";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Summon a random large creature";
    }
    if (characterListButtonClickedName === "Kellbourne") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Prime Guard";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Give 4 protection to an ally twice";
    }
    if (characterListButtonClickedName === "Veritan") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Blaze of Truth";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Give 3 protection to all allies";
    }
    if (characterListButtonClickedName === "SayJ") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Prime Aim";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Deal 8 damage ignoring protection";
    }
    if (characterListButtonClickedName === "Jo Nator") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Complete Circuit";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Deal 3 damage to all enemies";
    }
    if (characterListButtonClickedName === "Corazon") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Ethereal Wound";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Deal 8 damage ignoring protection";
    }
    if (characterListButtonClickedName === "Tyrel") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Guardian Archangel";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Heal an ally from 10 damage";
    }
    if (characterListButtonClickedName === "S.P.E.C.T.") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Richer Recipe";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Heal and protect an ally from 5 damage";
    }
    if (characterListButtonClickedName === "Cadenza") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Rock Out";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Deal 3 damage to all enemies";
    }
    if (characterListButtonClickedName === "Liza") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Tsunami";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Deal 3 damage to all enemies";
    }
    if (characterListButtonClickedName === "Dr. Aris") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Extra Morphine";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Protect all allies from 3 damage";
    }
    if (characterListButtonClickedName === "Pasha") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "More Helpers";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Summon 2 helpers";
    }
    if (characterListButtonClickedName === "T`Risa") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Agile Defense";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Shield all allies from 3 damage";
    }
    if (characterListButtonClickedName === "J.O.N.") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Cortana";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Remove all protection from all enemies";
    }
    if (characterListButtonClickedName === "Wilder") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Whistle";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Call a stronger canine";
    }
    if (characterListButtonClickedName === "Observer") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Favorable Timeline";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Steal 5 health from an enemy";
    }
    if (characterListButtonClickedName === "Clutch") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "Prime Speed";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Net +2 energy";
    }
    if (characterListButtonClickedName === "Braynie") {
        document.getElementById("after-upgrade-ability2-name").style.color = "goldenrod";
        document.getElementById("after-upgrade-ability2-name").textContent = "MonKey Do Better";
        document.getElementById("after-upgrade-ability2-desc").textContent = "Steal all protection from an enemy";
    }
}

async function pushPurchaseToDB() {
    const body = {
        name: characterListButtonClickedName,
        protection: parseInt(document.getElementById("after-upgrade-protection").textContent),
        ability1_cost: parseInt(document.getElementById("after-upgrade-ability1-cost").textContent),
        ability2_name: document.getElementById("after-upgrade-ability2-name").textContent,
        ability2_desc: document.getElementById("after-upgrade-ability2-desc").textContent,
        ability2_cost: parseInt(document.getElementById("after-upgrade-ability2-cost").textContent),
        ability2_uses: parseInt(document.getElementById("after-upgrade-ability2-uses").textContent)
    };

    await fetch(`API_BASE_URL/api/${currentUsername}/cards/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}

async function bondPurchase(cost) { // subtract cost from bond in the database
    await fetch(`API_BASE_URL/api/players/${currentUsername}/minusBond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(cost, 10) })
    });
    await initializeTotalBond();
}

// alden armory logic
document.getElementById("home-alden-button").addEventListener('click', function() {
    document.body.style.backgroundImage = `url('images/traders/alden-armory.png')`;
    crossfadeMusic(currentSound, menuMusic, 4000);
    document.getElementById("home-buttons-div").style.display = "none";
    document.getElementById("alden-armory-div").style.display = "block";

    showHeirlooms();
});

function showHeirlooms() {
    for (let i = 0; i < ownedHeirlooms.length; i++) {
        document.getElementById(`alden-armory-${ownedHeirlooms[i]}`).style.display = "block";
    }
}

let ownedHeirlooms = [];

async function pullOwnedHeirloomsFromDB() {
    const res = await fetch(`API_BASE_URL/api/players/${currentUsername}/trueColumns`);
    const data = await res.json();
    ownedHeirlooms = data.trueColumns || [];
}

document.getElementById("alden-armory-exit-button").addEventListener('click', function() {
    document.getElementById("alden-armory-div").style.display = "none";
    crossfadeMusic(currentSound, travelMusic, 4000);
    document.getElementById("home-buttons-div").style.display = "block";
    document.body.style.backgroundImage = `url('images/maps/map_home.png')`;
}); 

// heirloom clicks
const heirloomButtons = document.querySelectorAll('.heirloom-img');
heirloomButtons.forEach(heirloom => {
    heirloom.addEventListener('click', async function() {
        const heirloomName = heirloom.id.replace("alden-armory-", "");
        checkIfCharacterInDeck(heirloomName);
    });
});

async function checkIfCharacterInDeck(heirloom) { // and fill out before/after divs
    const res = await fetch(`API_BASE_URL/api/${currentUsername}/cards/baseOrLeader`);
    const chars = await res.json();

    let found = false;
    for (let i = 0; i < chars.length; i++) {
        if (chars[i].heirloom_id === heirloom) {
            heirloomId = heirloom;
            found = true;
            await checkAbilityStatus(chars[i]);
            document.getElementById("armory-confirm-div").style.display = "block";
            if (chars[i].type === "leader") {
                document.getElementById("armory-confirm-before-img").src = `images/leader-characters/${chars[i].image_id}Leader.png`;
                document.getElementById("armory-confirm-after-img").src = `images/leader-characters/${chars[i].image_id}Leader.png`;

                document.getElementById("armory-confirm-img").src = "images/confirm-purchase-page-leader.png";
            } else {
                document.getElementById("armory-confirm-before-img").src = `images/base-characters/${chars[i].image_id}Base.png`;
                document.getElementById("armory-confirm-after-img").src = `images/base-characters/${chars[i].image_id}Base.png`;

                document.getElementById("armory-confirm-img").src = "images/confirm-purchase-page.png";
            }
            if (ab1Upgraded === true) {
                document.getElementById("armory-confirm-before-ability1-name").style.color = "goldenrod";
                document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
            } else {
                document.getElementById("armory-confirm-before-ability1-name").style.color = "blue";
                document.getElementById("armory-confirm-after-ability1-name").style.color = "blue";
            }
            if (ab2Upgraded === true) {
                document.getElementById("armory-confirm-before-ability2-name").style.color = "goldenrod";
                document.getElementById("armory-confirm-after-ability2-name").style.color = "goldenrod";
            } else {
                document.getElementById("armory-confirm-before-ability2-name").style.color = "purple";
                document.getElementById("armory-confirm-after-ability2-name").style.color = "purple";
            }

            document.getElementById("armory-confirm-before-health").textContent = chars[i].health_max;
            document.getElementById("armory-confirm-before-protection").textContent = chars[i].initial_protection;
            document.getElementById("armory-confirm-before-ability1-name").textContent = chars[i].ability1_name;
            document.getElementById("armory-confirm-before-ability1-desc").textContent = chars[i].ability1_desc;
            document.getElementById("armory-confirm-before-ability1-cost").textContent = chars[i].ability1_cost;
            document.getElementById("armory-confirm-before-ability2-name").textContent = chars[i].ability2_name;
            document.getElementById("armory-confirm-before-ability2-desc").textContent = chars[i].ability2_desc;
            document.getElementById("armory-confirm-before-ability2-cost").textContent = chars[i].ability2_cost;
            document.getElementById("armory-confirm-before-ability2-uses").textContent = chars[i].ability2_uses;

            document.getElementById("armory-confirm-after-health").textContent = chars[i].health_max;
            document.getElementById("armory-confirm-after-protection").textContent = chars[i].initial_protection;
            document.getElementById("armory-confirm-after-ability1-name").textContent = chars[i].ability1_name;
            document.getElementById("armory-confirm-after-ability1-desc").textContent = chars[i].ability1_desc;
            document.getElementById("armory-confirm-after-ability1-cost").textContent = chars[i].ability1_cost;
            document.getElementById("armory-confirm-after-ability2-name").textContent = chars[i].ability2_name;
            document.getElementById("armory-confirm-after-ability2-desc").textContent = chars[i].ability2_desc;
            document.getElementById("armory-confirm-after-ability2-cost").textContent = chars[i].ability2_cost;
            document.getElementById("armory-confirm-after-ability2-uses").textContent = chars[i].ability2_uses;

            updateAbility1(chars[i].name);
        }
    }
    if (!found) {
        alert("No character in your deck can channel this heirloom.");
        return;
    }
}

document.getElementById("armory-confirm-no-button").addEventListener('click', function() {
    document.getElementById("armory-confirm-div").style.display = "none";
});

document.getElementById("armory-confirm-yes-button").addEventListener('click', async function() {
    await pushChannelHeirloomToDB();
    document.getElementById("armory-confirm-div").style.display = "none";
});

let heirloomId = null;
async function pushChannelHeirloomToDB() {
    await fetch(`API_BASE_URL/api/${currentUsername}/cards/updateAbility1ByHeirloom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            heirloom_id: heirloomId,
            ability1_name: document.getElementById("armory-confirm-after-ability1-name").textContent,
            ability1_desc: document.getElementById("armory-confirm-after-ability1-desc").textContent
        })
    });
}

function updateAbility1(charName) {
    if (charName === "Maggie") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Wave of Light";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Heal all allies from 3 damage";
    }
    if (charName === "Kellbourne") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Triple Gate";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Deal 10 damage";
    }
    if (charName === "Veritan") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Searing Blade";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Deal 10 damage";
    }
    if (charName === "SayJ") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "High Caliber";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Deal 10 damage";
    }
    if (charName === "Jo Nator") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Amp Up";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Shield an ally from 8 damage";
    }
    if (charName === "Corazon") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Blur of Arrows";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Fire 2 arrows dealing 4 damage";
    }
    if (charName === "Tyrel") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Holy Blades";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Deal 7 damage and heal that much";
    }
    if (charName === "S.P.E.C.T.") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Potion Volley";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Deal 4 damage twice";
    }
    if (charName === "Cadenza") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Jam Out";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Heal all allies from 3 damage";
    }
    if (charName === "Liza") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Blood Bending";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Deal 10 damage";
    }
    if (charName === "Dr. Aris") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "I.C.U.";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Heal an ally from 10 damage";
    }
    if (charName === "Pasha") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Upload Virus";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Remove all protection from all enemies";
    }
    if (charName === "T`Risa") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Elven Strength";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Deal 4 damage twice";
    }
    if (charName === "J.O.N.") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Spartan Accuracy";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Deal 5 damage twice";
    }
    if (charName === "Wilder") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Howl of the Alpha";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Give all allies 5 protection";
    }
    if (charName === "Observer") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Predictor";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Give an ally 4 protection twice";
    }
    if (charName === "Clutch") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "Relocation";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Heal and protect an ally from 5 damage";
    }
    if (charName === "Braynie") {
        document.getElementById("armory-confirm-after-ability1-name").style.color = "goldenrod";
        document.getElementById("armory-confirm-after-ability1-name").textContent = "MonKey See Better";
        document.getElementById("armory-confirm-after-ability1-desc").textContent = "Adapt doesn't cost energy";
    }
}

// forge / reset game logic
document.getElementById("home-forge-button").addEventListener('click', async function() {
    document.getElementById("forge-div").style.display = "block";
    crossfadeMusic(currentSound, menuMusic, 4000);
    calculateLeadersDefeated();
    await calculateCardsCollected();
    
    if (leadersDefeatedNumber === 5 && cardsCollectedNumber === 18) {
        document.getElementById("forge-hiding-div").style.display = "block";
    }

});

let leadersDefeatedNumber = 0;
function calculateLeadersDefeated() {
    let banditAmount = 0;
    let arcaneAmount = 0;
    let legionAmount = 0;
    let ghoulAmount = 0;
    let pirateAmount = 0;
    if (banditProgress === 8) {
        banditAmount = 1;
    }
    if (ghoulProgress === 8) {
        ghoulAmount = 1;
    }
    if (legionProgress === 7) {
        legionAmount = 1;
    }
    if (arcaneProgress === 6) {
        arcaneAmount = 1;
    }
    if (pirateProgress === 2) {
        pirateAmount = 1;
    }

    leadersDefeatedNumber = (banditAmount + arcaneAmount + legionAmount + ghoulAmount + pirateAmount);
    document.getElementById("leaders-defeated-text").textContent = `${leadersDefeatedNumber}/5`;
}

let cardsCollectedNumber = 0;
async function calculateCardsCollected() {
    const res = await fetch(`API_BASE_URL/api/${currentUsername}/cards/baseOrLeader`);
    const chars = await res.json();

    cardsCollectedNumber = chars.length;
    document.getElementById("cards-collected-text").textContent = `${chars.length}/18`;
}

document.getElementById("forge-no-button").addEventListener('click', function() {
    document.getElementById("forge-div").style.display = "none";
    document.getElementById("forge-hiding-div").style.display = "none";

    crossfadeMusic(currentSound, travelMusic, 4000);
});

document.getElementById("forge-yes-button").addEventListener('click', async function() {
    await pushForgedHeirloomToDB();
    await resetGame();
});

async function pushForgedHeirloomToDB() {
    let heirloomKey = null;
    if (leaderName === "Kellbourne") {
        heirloomKey = "redbotllink";
    }
    if (leaderName === "SayJ") {
        heirloomKey = "yellowbotlink";
    }
    if (leaderName === "Veritan") {
        heirloomKey = "flaminglasersword";
    }
    if (leaderName === "Jo Nator") {
        heirloomKey = "batterybelt";
    }
    if (leaderName === "Maggie") {
        heirloomKey = "summonerlight";
    }
    if (leaderName === "Corazon") {
        heirloomKey = "etherbow";
    }
    if (leaderName === "Tyrel") {
        heirloomKey = "righteouswings";
    }
    if (leaderName === "S.P.E.C.T.") {
        heirloomKey = "potency";
    }
    if (leaderName === "Cadenza") {
        heirloomKey = "elvenmetronome";
    }
    if (leaderName === "Liza") {
        heirloomKey = "riverrock";
    }
    if (leaderName === "Dr. Aris") {
        heirloomKey = "stethoscope";
    }
    if (leaderName === "Pasha") {
        heirloomKey = "techglasses";
    }
    if (leaderName === "T`Risa") {
        heirloomKey = "shieldoflight";
    }
    if (leaderName === "J.O.N.") {
        heirloomKey = "mjolnirarmor";
    }
    if (leaderName === "Wilder") {
        heirloomKey = "wolfwhistle";
    }
    if (leaderName === "Observer") {
        heirloomKey = "trenchcoat";
    }
    if (leaderName === "Clutch") {
        heirloomKey = "bluebotlink";
    }
    if (leaderName === "Braynie") {
        heirloomKey = "staffofjustice";
    }
    // changes heirloom = true /resets _track and _bribed
    await fetch(`API_BASE_URL/api/players/${currentUsername}/forge/${heirloomKey}`, {
        method: "POST"
    });
    // delete entire playerName_cards table (will be re-created after with new leader and base card)
    await fetch(`API_BASE_URL/api/${currentUsername}/cards/deleteTable`, {
        method: "POST"
    });
}

let bypassKey = null;
async function resetGame() {
    document.getElementById("forge-div").style.display = "none";
    homeButtonsDiv.style.display = "none";

    document.body.style.backgroundImage = "url('images/account-background.png')";
    document.getElementById("select-leader-div").style.display = "block";
    document.getElementById("select-fcard-div").style.display = "block";
    submitButton.style.display = "block";
    entryMethod.newAccount = 1;
    bypassKey = true;
}