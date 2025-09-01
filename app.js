document.addEventListener('DOMContentLoaded', () => {
})

// function fadeMusic {

// }

const titleButton = document.getElementById("title-button");
const createHeader = document.getElementById("create-header");
const createButton = document.getElementById("create-button");
const logHeader = document.getElementById("log-header");
const logButton = document.getElementById("log-button");

const menuMusic = document.getElementById("menu-music");
const combatMusic = document.getElementById("combat-music");
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

let dialogueProgress = "0.0";
let leaderName = 'leaderName';

const dialogueSpeakerImage = document.getElementById("dialogue-speaker-image");
const dialogueDiv = document.getElementById("dialogue-div");
const dialogueSpeaker = document.getElementById("dialogue-speaker");
const dialogueText = document.getElementById("dialogue-text");

let currentUsername = "";

submitButton.addEventListener('click', function() {
    const submitUsername = document.getElementById("input-username").value;
    const submitPassword = document.getElementById("input-password").value;

    const leaderImageId = leaderImageIds[leaderImageIdsIndex]; // currently selected leader
    const baseImageId = baseImageIds[baseImageIdsIndex];

    if (entryMethod.newAccount === 1) {
    fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: submitUsername, password: submitPassword, leader_image_id: leaderImageId, base_image_id: baseImageId })
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
    
    if (entryMethod.logIn === 1) {
        fetch(`http://localhost:3000/api/players/${submitUsername}`)
            .then(res => res.json())
            .then(data => {
                if (data.password === submitPassword) {
                    console.log("Login successful!");
                    currentUsername = submitUsername;

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
            })
            .catch(err => console.log("User not found or error:", err));
    }
});

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
        dialogueText.textContent = "This island is all we have been able to keep from them, but I fear not for much longer. I know very little of war, but use this island as a base to gather allies and resources."
        dialogueProgress = "1.3";
    } else if (dialogueProgress === "1.3") {
        dialogueText.textContent = "You will need to fight through the enemy factions until you find their leader. Gather bond - our currency to finance your way to victory. On your way you will find traders to barter with, if you can recruit them to the island I'm sure they will give you discounted prices. Lastly - build what structures or defenses you may need  to be successful on your journey."
        dialogueProgress = "1.4";
    } else if (dialogueProgress === "1.4") {
        dialogueText.textContent = `Heavens bless you on this adventure ${leaderName}. Return to me when you have defeated your first enemy leader and we will increase your abilities.`;
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
  fetch(`http://localhost:3000/api/leader/${image_id}`)
    .then(res => res.json())
    .then(data => {
        selectLeaderImage.src = `images/leader-characters/${data.image_id}Leader.png`;
        selectLeaderHealth.textContent = data.health_max;
        selectLeaderProtection.textContent = "0";
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
let baseImageIds = [];
let baseImageIdsIndex = 0;

let leaderImageIds = [];
let leaderImageIdsIndex = 0;

const goldLeftArrow = document.getElementById("gold-left-arrow");
const goldRightArrow = document.getElementById("gold-right-arrow");
const silverLeftArrow = document.getElementById("silver-left-arrow");
const silverRightArrow = document.getElementById("silver-right-arrow");

// Fetch all character names on page load
fetch('http://localhost:3000/api/characters')
  .then(res => res.json())
  .then(names => {
    baseImageIds = names;
    if (baseImageIds.length > 0) {
        const randomIndex = Math.floor(Math.random() * baseImageIds.length);
        loadFcard(baseImageIds[randomIndex]);
        baseImageIdsIndex = randomIndex; // <-- Set index
        selectedBaseImageId = baseImageIds[randomIndex]; // <-- Set selected image ID
    }
  });

fetch('http://localhost:3000/api/characters')
  .then(res => res.json())
  .then(names => {
    leaderImageIds = names;
    if (leaderImageIds.length > 0) {
        const randomIndex = Math.floor(Math.random() * leaderImageIds.length);
        loadLeader(leaderImageIds[randomIndex]);
        leaderImageIdsIndex = randomIndex; // <-- Set index
        selectedLeaderImageId = leaderImageIds[randomIndex]; // <-- Set selected image ID
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
sailingHomeImg.addEventListener('click', function() {
    if (currentlyAt === "arcane") {
        // do nothing
    } else {
        sailingMapDiv.style.display = "none";
        ghoulButtonsDiv.style.display = "none";
        legionButtonsDiv.style.display = "none";
        banditButtonsDiv.style.display = "none";
        arcaneButtonsDiv.style.display = "none";
        currentlyAt = "home";

        document.body.style.backgroundImage = "url('images/maps/map_home.png')";
        homeButtonsDiv.style.display = "block";
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
        currentlyAt = "arcane";

        document.body.style.backgroundImage = "url('images/maps/map_arcane.png')";
        arcaneButtonsDiv.style.display = "block";
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
        currentlyAt = "bandit";

        document.body.style.backgroundImage = "url('images/maps/map_bandit.png')";
        banditButtonsDiv.style.display = "block";
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
        currentlyAt = "ghoul";

        document.body.style.backgroundImage = "url('images/maps/map_ghoul.png')";
        ghoulButtonsDiv.style.display = "block";
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
        currentlyAt = "legion";

        document.body.style.backgroundImage = "url('images/maps/map_legion.png')";
        legionButtonsDiv.style.display = "block";
    }
    
});



function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let difficulty = 1;
numberOfEnemies = 0;
enemyArray = [];

const difficulties = {
    1: { minEnemies: 1, maxEnemies: 3, reward: 200 },
    2: { minEnemies: 2, maxEnemies: 4, reward: 500 },
    3: { minEnemies: 3, maxEnemies: 5, reward: 800 },
    4: { minEnemies: 4, maxEnemies: 6, reward: 1200 }
    // Add more as needed
};

function randomEnemy(difficulty) {
    const settings = difficulties[difficulty];
    const numEnemies = randomBetween(settings.minEnemies, settings.maxEnemies);

    for (let i = 1; i <= numEnemies; i++) {
        fetch(`http://localhost:3000/api/enemies/type/${currentlyAt}`)
        .then(res => res.json())
        .then(enemies => {
            chosenEnemy = enemies[randomBetween(0, enemies.length - 1)];

            document.getElementById(`enemy${i}-div`).style.display = "block";
            document.getElementById(`enemy${i}-img`).src = `images/enemies/${chosenEnemy.image_id}.png`;
            document.getElementById(`enemy${i}-health`).textContent = chosenEnemy.health_max;
            document.getElementById(`enemy${i}-protection`).textContent = "0";
            document.getElementById(`enemy${i}-ability1-name`).textContent = chosenEnemy.ability1_name;
            document.getElementById(`enemy${i}-ability1-desc`).textContent = chosenEnemy.ability1_desc;

            numberOfEnemies = numEnemies;
            console.log(chosenEnemy);
            console.log(numEnemies);
            enemyArray.push(chosenEnemy);
        })
        .catch(err => console.log(err));
    }
}

function playLeader(username) {
    fetch(`http://localhost:3000/api/${username}/cards/leader`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('char1-div').style.display = 'block';
            document.getElementById(`char1-img`).src = `images/leader-characters/${data.image_id}Leader.png`;
            document.getElementById(`char1-health`).textContent = data.health_max;
            document.getElementById(`char1-protection`).textContent = "0";
            document.getElementById(`char1-ability1-name`).textContent = data.ability1_name;
            document.getElementById(`char1-ability1-desc`).textContent = data.ability1_desc;
            document.getElementById(`char1-ability1-cost`).textContent = data.ability1_cost;
            if (data.ability1_uses > 99) {
                document.getElementById(`char1-ability1-uses`).innerHTML = '<img src="images/infinity-icon.png" style="width: 1.2em; height: 0.8em;">';
            } else {
                document.getElementById(`char1-ability1-uses`).textContent = data.ability1_uses;
            }
            document.getElementById(`char1-ability2-name`).textContent = data.ability2_name;
            document.getElementById(`char1-ability2-desc`).textContent = data.ability2_desc;
            document.getElementById(`char1-ability2-cost`).textContent = data.ability2_cost;
            document.getElementById(`char1-ability2-uses`).textContent = data.ability2_uses;
        })
        .catch(err => console.log(err));
}

let deckCount = 1;
let energyCount = 2;
let deckCards = [];
let nextDiv = 2;


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

function resetTargeting() {
    // Reset yellow backgrounds for all ability name elements
    document.querySelectorAll('[id^="char"][id$="-ability1-name"], [id^="char"][id$="-ability2-name"]').forEach(elem => {
        elem.style.backgroundColor = "";
    });

    // Reset cyan borders for all character divs
    document.querySelectorAll('.charDiv').forEach(div => {
        div.style.border = "";
    });

    // Reset orange borders for all enemy divs
    document.querySelectorAll('.enemyDiv').forEach(div => {
        div.style.border = "";
    });

    // Reset targeting variables
    selectedCharDiv = null;
    selectedAbility = "";
    charSelected = 0;
    abilitySelected = 0;

    console.log("charSelected? " + charSelected);
    console.log("abilitySelected? " + abilitySelected);
}

//battle logic
let inBattle = 0;

function startBattle(username) {
    // combatMusic.play();
    inBattle = 1;

    fetch(`http://localhost:3000/api/${username}/cards/base`)
        .then(res => res.json())
        .then(baseCards => {
            deckCount = baseCards.length; 
            energyCount = 4 + baseCards.length;
            deckCards = baseCards;

            document.getElementById("energy-count").textContent = energyCount;
            // Deck image handling
            showDeck();
        })
        .catch(err => console.log(err));
}

function endBattle() {
    inBattle = 0;
    numberOfEnemies = 0;
    enemyArray = [];
    //show victory screen, earned bond
}



//draw from deck
function playDrawnCard() {
    const randomDraw = Math.floor(Math.random() * deckCards.length);
    const drawnCard = deckCards[randomDraw];

    document.getElementById(`char${nextDiv}-div`).style.display = "block";
    document.getElementById(`char${nextDiv}-img`).src = `images/base-characters/${drawnCard.image_id}Base.png`;
    document.getElementById(`char${nextDiv}-health`).textContent = drawnCard.health_max;
    document.getElementById(`char${nextDiv}-protection`).textContent = "0";
    document.getElementById(`char${nextDiv}-ability1-name`).textContent = drawnCard.ability1_name;
    document.getElementById(`char${nextDiv}-ability1-desc`).textContent = drawnCard.ability1_desc;
    document.getElementById(`char${nextDiv}-ability1-cost`).textContent = drawnCard.ability1_cost;
    if (drawnCard.ability1_uses > 99) {
        document.getElementById(`char${nextDiv}-ability1-uses`).innerHTML = '<img src="images/infinity-icon.png" style="width: 1.2em; height: 0.8em;">';
    } else {
        document.getElementById(`char${nextDiv}-ability1-uses`).textContent = drawnCard.ability1_uses;
    }
    document.getElementById(`char${nextDiv}-ability2-name`).textContent = drawnCard.ability2_name;
    document.getElementById(`char${nextDiv}-ability2-desc`).textContent = drawnCard.ability2_desc;
    document.getElementById(`char${nextDiv}-ability2-cost`).textContent = drawnCard.ability2_cost;
    document.getElementById(`char${nextDiv}-ability2-uses`).textContent = drawnCard.ability2_uses;

    deckCards.splice(randomDraw, 1);
};

//Clicking on the deck
document.getElementById("deck-img").addEventListener("click", function() {
    if (energyCount >= 2 & deckCount > 0 & nextDiv <= 7) {
        // console.log("deck clicked");
        // console.log("before deckCards: ", deckCards);
        // console.log("before energyCount: " + energyCount);
        // console.log("before deckCount: " + deckCount);
        // console.log("before nextDiv: " + nextDiv);

        // Logic to draw a card from the deck
        playDrawnCard();

        energyCount -= 2; //subtract 2 from current value of energyCount
        document.getElementById("energy-count").textContent = energyCount;
        deckCount -= 1;
        nextDiv += 1;

        showDeck();

        // console.log("after deckCards: ", deckCards);
        // console.log("after energyCount: " + energyCount);
        // console.log("after deckCount: " + deckCount);
        // console.log("after nextDiv: " + nextDiv);
    } else if (energyCount <2) {
        alert("Not enough energy (2) to draw another card");
    } else if (deckCount <1) {
        alert("No more cards in the deck");
    } else if (nextDiv > 6) {
        alert("No more battle space for another character");
    }
});


//battle targeting
let selectedCharDiv = null;
let selectedAbility = "";
let selectedChar = "";

let charSelected = 0;
let abilitySelected = 0;

let selectedEnemy = "";
let selectedEnemyDiv = "";

let targetType = "";





//char ability handling
function applyCharAbility() {
    if (selectedAbility === "Slash" && selectedEnemyDiv) {
        // Get the enemy health element by div number
        const healthElem = document.getElementById(`enemy${selectedEnemyDiv}-health`);
        if (healthElem) {
            // Subtract 5 from current health
            let currentHealth = parseInt(healthElem.textContent, 10);
            currentHealth -= 5;
            healthElem.textContent = currentHealth;
            console.log(`Applied Slash: enemy${selectedEnemyDiv} health is now ${currentHealth}`);
        }
        const divElem = document.getElementById(`enemy${selectedEnemyDiv}-div`);
        if (divElem) {
            divElem.style.border = "2px solid red";
            setTimeout(function() {
                // Your code here
                divElem.style.border = "";
            }, 3000);
        }
    }
}

//choose a character to attack
function abilityTarget() {
        // Find all visible character divs
        const visibleCharDivs = Array.from(document.querySelectorAll('.charDiv'))
            .filter(div => div.style.display !== "none");

        if (visibleCharDivs.length === 0) return null;

        // Pick a random character div
        const randomIndex = Math.floor(Math.random() * visibleCharDivs.length);
        return visibleCharDivs[randomIndex];
}

//enemy ability handling
function applyEnemyAbility(abilityName) {
    // Use abilityTarget to pick a random visible character div
    const targetDiv = abilityTarget();
    if (!targetDiv) return;

    const charNum = targetDiv.id.match(/\d+/)[0];
    const healthElem = document.getElementById(`char${charNum}-health`);

    //bandit abilities
    if (abilityName === "Slash") {
        if (healthElem) {
            let currentHealth = parseInt(healthElem.textContent, 10);
            currentHealth -= 5;
            healthElem.textContent = currentHealth;
            targetDiv.style.border = "2px solid red";
            setTimeout(() => {
                targetDiv.style.border = "";
            }, 2000);
            console.log(`Enemy used Slash: char${charNum} health is now ${currentHealth}`);
        }
    }
    if (abilityName === "Stab") {
        if (healthElem) {
            let currentHealth = parseInt(healthElem.textContent, 10);
            currentHealth -= 5;
            healthElem.textContent = currentHealth;
            targetDiv.style.border = "2px solid red";
            setTimeout(() => {
                targetDiv.style.border = "";
            }, 2000);
            console.log(`Enemy used Stab: char${charNum} health is now ${currentHealth}`);
        }
    }
    if (abilityName === "Defend") {
        if (healthElem) {
            let currentHealth = parseInt(healthElem.textContent, 10);
            currentHealth -= 5;
            healthElem.textContent = currentHealth;
            targetDiv.style.border = "2px solid red";
            setTimeout(() => {
                targetDiv.style.border = "";
            }, 2000);
            console.log(`Enemy used Slash: char${charNum} health is now ${currentHealth}`);
        }
    }
}






// ^ find out how to use targetCharacter (turn it into abilityTarget) to determine if the ability is supposed to target an enemy, character or both, then pass to applyEnemyAbility to specify what happends to the target





//enemy turn handling
function enemyTurn() {
    enemyArray.forEach((enemy, index) => {
        // Highlight enemy border orange
        const enemyDiv = document.getElementById(`enemy${index + 1}-div`);
        if (enemyDiv) {
            enemyDiv.style.border = "2px solid orange";
            setTimeout(() => {
                enemyDiv.style.border = "";
                // Pass ability1_name to applyEnemyAbility after x second wait
                applyEnemyAbility(enemy.ability1_name);
            }, 2000);
        }
    });
}






document.querySelectorAll('.charDiv').forEach(div => { //char border cyan or gone when clicked
    div.addEventListener('click', function() {

        // Toggle border on or off 
        if (div.style.border === "2px solid cyan") {
            div.style.border = "";
            selectedCharDiv = null;
            charSelected = 0;
        } else {//removes border from other divs
            resetTargeting();

            div.style.border = "2px solid cyan";
            selectedCharDiv = div;
            // console.log(selectedCharDiv);

            //grab character's image_id from HTML element
            const imgElem = div.querySelector('img');
            let src = imgElem.src.split('/').pop();
            let image_id = src.replace('Base.png', '').replace('Leader.png', '');

            selectedChar = image_id;
            charSelected = 1;
            console.log("charSelected? " + charSelected + " " + image_id);
        }
    });
});

document.addEventListener('keydown', function(event) {//selecting or unselecting char ability
    if (!selectedCharDiv) return; // No div selected

    const charNum = selectedCharDiv.id.match(/\d+/)[0]; // Extract number from div id
    const ability1Elem = document.getElementById(`char${charNum}-ability1-name`);
    const ability2Elem = document.getElementById(`char${charNum}-ability2-name`);

    if (event.key === "1") {
        // Remove highlight from ability2
        if (ability2Elem.style.backgroundColor === "yellow") {
            ability2Elem.style.backgroundColor = "";
            abilitySelected = 0;
        }
        // Toggle highlight for ability1
        if (ability1Elem.style.backgroundColor === "yellow") {
            ability1Elem.style.backgroundColor = "";
            selectedAbility = "";
            abilitySelected = 0;
        } else {
            ability1Elem.style.backgroundColor = "yellow";
            selectedAbility = ability1Elem.innerText;
            abilitySelected = 1;
            console.log(ability1Elem.innerText);
        }
        console.log("abilitySelected? " + abilitySelected);
    } else if (event.key === "2") {
        // Remove highlight from ability1
        if (ability1Elem.style.backgroundColor === "yellow") {
            ability1Elem.style.backgroundColor = "";
            selectedAbility = "";
            abilitySelected = 0;
        }
        // Toggle highlight for ability2
        if (ability2Elem.style.backgroundColor === "yellow") {
            ability2Elem.style.backgroundColor = "";
            selectedAbility = "";
            abilitySelected = 0;
        } else {
            ability2Elem.style.backgroundColor = "yellow";
            selectedAbility = ability2Elem.innerText;
            abilitySelected = 1;
            console.log(ability2Elem.innerText);
        }
        console.log("abilitySelected? " + abilitySelected);
    }
});

document.querySelectorAll('.enemyDiv').forEach(div => { //enemy border orange or gone when clicked
    div.addEventListener('click', function() {
        if (charSelected === 1 & abilitySelected === 1) {
            // Toggle border on or off 
            if (div.style.border === "2px solid orange") {
                div.style.border = "";
            } else {
                div.style.border = "2px solid orange";

                //grab enemy's image_id from HTML element
            const imgElem = div.querySelector('img');
            let src = imgElem.src.split('/').pop();
            image_id = src.replace('.png', '');

            selectedEnemy = image_id;
            console.log("selectedEnemy? ", image_id);

            //grab enemy's div number from its id (e.g., "enemy3-div" -> "3")
            const enemyNum = div.id.match(/\d+/)[0];
            selectedEnemyDiv = enemyNum;
            console.log("selectedEnemyDiv? ", enemyNum);

            applyCharAbility();
            }
        } else {
            alert("Select a character and an ability before targeting an enemy");
            resetTargeting();
        }
    });
});



document.addEventListener('keydown', function(event) {
    if (inBattle === 1) {
        if (event.key === "Escape") {
        resetTargeting();
        }
    }
});

document.getElementById('end-turn-button').addEventListener('click', function() {
    resetTargeting();
    if (inBattle === 1 & numberOfEnemies === 0) {
        endBattle();
    }

    //start enemies turn function
    enemyTurn();
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

    startBattle(currentUsername);
    battleDivs.style.display = "block";
    difficulty = 1;
    randomEnemy(difficulty);

    playLeader(currentUsername); // Use the username of the logged-in player

    console.log("cliff button clicked - difficulty: " + difficulty);
});





//subtract energy for using an ability
//reset targeting after using an ability
//clicking deck resets targeting








//Next step is to make it possible to click the deck of cards and play a base card onto the next div
// - log in should work (pull players db table info landing on alder's island) XXXXXXXXXXX
// - deck should have the right img and blur based on how many base cards are in the deck XXXXX
// - drawing a card should take 2 energy XXXXXXX
// - guardrails to determine which div a drawn card plays to XXXXXX
// - guardrails to determine when all divs are Filled XXXXXX
// - make a help button that shows an example of how to battle
// - gameplan with dean about combat system (how would he approach unique types of abilities handling)

//make and designate music for each: bandit, ghoul, legion, arcane, pirate - also menu, trade, map 
//code functions to have the currentmusic fade out and the new music fade in
//change code for leader and fcard selection so you can't have the same leader and fcard
//code traders to not offer leader's base card

//there's going to be an issue with nextDiv if the enemies kill char 2 while 3 4 and 5 are alive
//Log in page should display previous players in the deadspace on the right (progress, etc.)