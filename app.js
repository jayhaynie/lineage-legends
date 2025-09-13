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
  fetch(`http://localhost:3000/api/character/${image_id}`)
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
let enemyCount = null;

const difficulties = {
    1: { minEnemies: 1, maxEnemies: 3, reward: 200 },
    2: { minEnemies: 2, maxEnemies: 4, reward: 500 },
    3: { minEnemies: 3, maxEnemies: 5, reward: 800 },
    4: { minEnemies: 4, maxEnemies: 6, reward: 1200 },
    5: { minEnemies: 5, maxEnemies: 7, reward: 1600 },
    6: { minEnemies: 7, maxEnemies: 7, reward: 2000 }
};

function randomEnemy(difficulty) {
    const settings = difficulties[difficulty];
    const numEnemies = randomBetween(settings.minEnemies, settings.maxEnemies);
    //code debt (improvement) fetch data once then use to random select
    for (let i = 1; i <= numEnemies; i++) {
        fetch(`http://localhost:3000/api/enemies/type/${currentlyAt}`)
        .then(res => res.json())
        .then(enemies => {
            chosenEnemy = enemies[randomBetween(0, enemies.length - 1)];

            document.getElementById(`enemy${i}-div`).style.display = "block";
            document.getElementById(`enemy${i}-img`).src = `images/enemies/${chosenEnemy.image_id}.png`;
            document.getElementById(`enemy${i}-health`).textContent = chosenEnemy.health_max;
            document.getElementById(`enemy${i}-protection`).textContent = chosenEnemy.initial_protection;
            document.getElementById(`enemy${i}-ability1-name`).textContent = chosenEnemy.ability1_name;
            document.getElementById(`enemy${i}-ability1-desc`).textContent = chosenEnemy.ability1_desc;

            // console.log(chosenEnemy);
            // console.log(numEnemies);
        })
        .catch(err => console.log(err));
    }
    enemyCount = numEnemies;
}

//not normal to create tables per user (for larger use applications)
//upgrades purchased in a different table applied to character as they're played
function playLeader(username) {
    fetch(`http://localhost:3000/api/${username}/cards/leader`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('char1-div').style.display = 'block';
            document.getElementById(`char1-img`).src = `images/leader-characters/${data.image_id}Leader.png`;
            document.getElementById(`char1-health`).textContent = data.health_max;
            document.getElementById(`char1-protection`).textContent = data.initial_protection;
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
    const res = await fetch(`http://localhost:3000/api/${currentUsername}/cards/base`);
    const data = await res.json();
    deckCards = data;
}

function updateBattleVariables() {
    energyCount = maxEnergy;
    document.getElementById("energy-count").textContent = energyCount;
}

async function initializeBattle() {
    await findBaseCharacterCards();
    await findCanineSummonCards();
    await findHelperSummonCards();
    await findSmallCreatureSummonCards();
    await findLargeCreatureSummonCards();

    maxEnergy = 3 + deckCards.length;
    deckCount = deckCards.length;

    updateBattleVariables();

    showDeck();
}



//play card drawn from deck
function playDrawnCard() {

    const randomDraw = Math.floor(Math.random() * deckCards.length);
    const drawnCard = deckCards[randomDraw];

    document.getElementById(`char${nextOpenCharDiv}-div`).style.display = "block";
    document.getElementById(`char${nextOpenCharDiv}-img`).src = `images/base-characters/${drawnCard.image_id}Base.png`;
    document.getElementById(`char${nextOpenCharDiv}-health`).textContent = drawnCard.health_max;
    document.getElementById(`char${nextOpenCharDiv}-protection`).textContent = drawnCard.initial_protection;
    document.getElementById(`char${nextOpenCharDiv}-ability1-name`).textContent = drawnCard.ability1_name;
    document.getElementById(`char${nextOpenCharDiv}-ability1-desc`).textContent = drawnCard.ability1_desc;
    document.getElementById(`char${nextOpenCharDiv}-ability1-cost`).textContent = drawnCard.ability1_cost;
    if (drawnCard.ability1_uses > 99) {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).innerHTML = '<img src="images/infinity-icon.png" style="width: 1.2em; height: 0.8em;">';
    } else {
        document.getElementById(`char${nextOpenCharDiv}-ability1-uses`).textContent = drawnCard.ability1_uses;
    }
    
    document.getElementById(`char${nextOpenCharDiv}-ability2-name`).style.display = "block";
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
    const res = await fetch('http://localhost:3000/api/summons/small-creature');
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
    const res = await fetch('http://localhost:3000/api/summons/large-creature');
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
    const res = await fetch('http://localhost:3000/api/summons/helper');
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

    helperCards.splice(randomHelper, 1);

    document.getElementById(`char${nextOpenCharDiv}-div`).style.border = "2px solid limegreen";
}

canineCards = [];

// find canine summon cards
async function findCanineSummonCards() {
    const res = await fetch('http://localhost:3000/api/summons/canine');
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

//Clicking on the deck
document.getElementById("deck-img").addEventListener("click", function() {
    if (waiting === true || abilityProgress !== 1) {
        return;
    } else {
        findNextOpenCharDiv();
        if (energyCount >= 2 && deckCount > 0 && nextOpenCharDiv !== null) {
            // Logic to draw a card from the deck
            playDrawnCard();

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

    const res = await fetch(`http://localhost:3000/api/character/${image_id}`);
    const data = await res.json();
    return data.health_max;
}

//determine enemy's health_max
async function getEnemyMaxHealth() {
    const imgElem = enemyClickedDiv.querySelector('img');
    let src = imgElem.src.split('/').pop(); 
    let image_id = src.replace('.png', '');

    const res = await fetch(`http://localhost:3000/api/enemy/${image_id}`);
    const data = await res.json();
    return data.health_max;
}



//determine ability type
function setAbilityType() {
    // attack abilities
    if (charAbilitySelectedName === "Slash" || charAbilitySelectedName === "Flame Strike" || charAbilitySelectedName === "Precision Shot" || charAbilitySelectedName === "Acid Vial" || charAbilitySelectedName === "J.ustice O.r N.othing" || charAbilitySelectedName === "Hunt" || charAbilitySelectedName === "Tackle" || charAbilitySelectedName === "Scratch" || charAbilitySelectedName === "Howl" || charAbilitySelectedName === "Bark" || charAbilitySelectedName === "Cut" || charAbilitySelectedName === "Stab" || charAbilitySelectedName === "Claw") {
        charAbilitySelectedType = "attack";
    }
    // attackTwo abilities
    if (charAbilitySelectedName === "Double Gate" || charAbilitySelectedName === "Rapid Fire" || charAbilitySelectedName === "Bash and Slash" || charAbilitySelectedName === "Swinging Slash" || charAbilitySelectedName === "Crush" || charAbilitySelectedName === "Yowl" || charAbilitySelectedName === "Tail Whip" || charAbilitySelectedName === "Razor Talons") {
        charAbilitySelectedType = "attackTwo";
    }
    // attackAll
    if (charAbilitySelectedName === "Overdrive" || charAbilitySelectedName === "Flood" || charAbilitySelectedName === "Negative Charge" || charAbilitySelectedName === "Dino Friends" || charAbilitySelectedName === "Quake" || charAbilitySelectedName === "Growl") {
        charAbilitySelectedType = "attackAll";
    }
    // Heal abilities
    if (charAbilitySelectedName === "Magic Tune" || charAbilitySelectedName === "Light of Heaven" || charAbilitySelectedName === "Spirit Water" || charAbilitySelectedName === "Surgery" || charAbilitySelectedName === "Extra Hugs" || charAbilitySelectedName === "Smiley" || charAbilitySelectedName === "Force Heal" || charAbilitySelectedName === "Heal" || charAbilitySelectedName === "Listen") {
        charAbilitySelectedType = "heal";
    }
    // healTwo
    if (charAbilitySelectedName === "Healthy Brew" || charAbilitySelectedName === "Nature") {
        charAbilitySelectedType = "healTwo";
    }
    //healAll
    if (charAbilitySelectedName === "Emergency Medicine" || charAbilitySelectedName === "Light of Creation" || charAbilitySelectedName === "Cutie" || charAbilitySelectedName === "So Nice") {
        charAbilitySelectedType = "healAll";
    }
    // protect
    if (charAbilitySelectedName === "Foresight" || charAbilitySelectedName === "Armored Vehicle" || charAbilitySelectedName === "Obsidian Builder" || charAbilitySelectedName === "Defend" || charAbilitySelectedName === "Fly Up") {
        charAbilitySelectedType = "protect";
    }
    // protectTwo abilities
    if (charAbilitySelectedName === "Defensive Guard" || charAbilitySelectedName === "Shock Shield") {
        charAbilitySelectedType = "protectTwo";
    }
    // protectAll
    if (charAbilitySelectedName === "Searing Truth" || charAbilitySelectedName === "Howl of the Pack" || charAbilitySelectedName === "Phalanx" || charAbilitySelectedName === "Sing" || charAbilitySelectedName === "Saber Edge") {
        charAbilitySelectedType = "protectAll";
    }
    // ignoreProtection
    if (charAbilitySelectedName === "AP Rounds" || charAbilitySelectedName === "Ether Arrow" || charAbilitySelectedName === "Venom Bite") {
        charAbilitySelectedType = "ignoreProtection";
    }
    // zeroProtection
    if (charAbilitySelectedName === "EMP" || charAbilitySelectedName === "AI Virus") {
        charAbilitySelectedType = "zeroProtection";
    }
    // summon 
    if (charAbilitySelectedName === "Canine Call" || charAbilitySelectedName === "Call for Helpers" || charAbilitySelectedName === "Call Small Creature" || charAbilitySelectedName === "Call Large Creature") {
        charAbilitySelectedType = "summon";
    }
    // stealHealth
    if (charAbilitySelectedName === "Fix Time") {
        charAbilitySelectedType = "stealHealth";
    }
    // stealProtection
    if (charAbilitySelectedName === "Quick Swipe") {
        charAbilitySelectedType = "stealProtection";
    }
    // addEnergy
    if (charAbilitySelectedName === "Expert Transport") {
        charAbilitySelectedType = "addEnergy";
    }
    // adaptAbility
    if (charAbilitySelectedName === "Monkey See Monkey Do") {
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
    // wilder Howl of the Pack ab1
    if (charAbilitySelectedName === "Howl of the Pack") {
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
        // take away ability cost from energy if attackNumber is 2
        if (abilityProgress === 2) {
            energyCount -= abilityCost;
            document.getElementById("energy-count").textContent = energyCount;

            // take one away from ability uses
            abilityUses -= 1;
            document.getElementById(`char${charFirstClickedDivNumber}-ability${charAbilitySelectedNumber}-uses`).textContent = abilityUses;
        }
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
    // Maggie Light of Creation ab1
    if (charAbilitySelectedName === "Light of Creation") {
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

        charHealthElem.textContent = charHealth;
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
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
    // Clutch Expert Transport ab2
    if (charAbilitySelectedName === "Expert Transport") {
        // add 3 energy (but the ability costs 1, so net gain of 2)
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
    // pasha EMP ab1
    if (charAbilitySelectedName === "EMP") {
        // reduce enemy protection to 0
        const enemyProtectionElem = document.getElementById(`enemy${enemyClickedDivNumber}-protection`);
        enemyProtectionElem.textContent = 0;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // pasha Call for Helpers ab2
    if (charAbilitySelectedName === "Call for Helpers") {
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
    // Braynie Monkey See Monkey Do ab1
    if (charAbilitySelectedName === "Monkey See Monkey Do") {
        // adapt ability1 of target enemy
        const enemyAbilityName = document.getElementById(`enemy${enemyClickedDivNumber}-ability1-name`).textContent;
        const enemyAbilityDesc = document.getElementById(`enemy${enemyClickedDivNumber}-ability1-desc`).textContent;
        document.getElementById(`char${charFirstClickedDivNumber}-ability1-name`).textContent = enemyAbilityName;
        document.getElementById(`char${charFirstClickedDivNumber}-ability1-desc`).textContent = enemyAbilityDesc;

        // take away ability cost from energy
        energyCount -= abilityCost;
        document.getElementById("energy-count").textContent = energyCount;
    }
    // Braynie Quick Swipe ab2
    if (charAbilitySelectedName === "Quick Swipe") {
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
        // deal 4 damage to two enemies
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
}





function checkForDeadEnemies() {
    for (let i = 1; i <= 7; i++) {
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        if (enemyDiv) {
            const enemyHealth = parseInt(document.getElementById(`enemy${i}-health`).textContent);
            // Only decrement if the enemy is alive (visible) and now dead
            if (enemyHealth <= 0 && enemyDiv.style.display !== "none") {
                enemyDiv.style.display = "none";
                enemyCount -= 1;
            }
        }
    }
}

function checkForVictory() {
    if (enemyCount === 0) {
        // victory page
        alert("you won this battle");
        console.log("You won this battle");
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
    } else if (abilityProgress === 3) {
        alert("Choose a third target with this ability")
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
                                applyCharAbilityToEnemy();
                                }
                        }
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

    battleDivs.style.display = "block";
    difficulty = 1;
    randomEnemy(difficulty);

    playLeader(currentUsername); // Use the username of the logged-in player

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
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 3: If ability can be used twice
    if (enemyAbilityProgress === 2) {
        autoChooseRandomTarget();
        await autoApplyEnemyAbility();
        enemyAbilityProgress = null;
        await new Promise(resolve => setTimeout(resolve, 2000));
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

function autoChooseRandomEnemy() { // choose enemy from visibleEnemies and remove from the array
    const randomIndex = Math.floor(Math.random() * visibleEnemies.length);
    attackingEnemy = visibleEnemies[randomIndex];
    visibleEnemies.splice(randomIndex, 1);

    attackingEnemy.style.border = "2px solid orange";
    console.log("attackingEnemy: ", attackingEnemy);
}

function autoFindEnemyAbility() {
    const enemyNum = attackingEnemy.id.match(/\d+/)[0]; // gets the number from "enemy3-div"
    attackingEnemyAbility = document.getElementById(`enemy${enemyNum}-ability1-name`).textContent;

    console.log("attackingEnemyAbility: ", attackingEnemyAbility);
}

async function autoFindEnemyAbilityAmount() {
    const res = await fetch(`http://localhost:3000/api/enemy/ability1/${attackingEnemyAbility}`);
    const data = await res.json();
    attackingEnemyAbilityAmount = data.ability1_ammount;
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
        targetCharacter = visibleTargets[randomIndex];
        targetCharacter.style.border = "2px solid red";
    } else if (attackingEnemyAbilityType === "targetEnemy") {
        let visibleTargets = [];
        for (let i = 1; i <= 7; i++) {
            const enemyDiv = document.getElementById(`enemy${i}-div`);
            if (enemyDiv.style.display === "block") {
                visibleTargets.push(enemyDiv);
            }
        }
        const randomIndex = Math.floor(Math.random() * visibleTargets.length);
        targetEnemy = visibleTargets[randomIndex];
        targetEnemy.style.border = "2px solid limegreen";
    }
    console.log("targetCharacter: ", targetCharacter);
    console.log("targetEnemy: ", targetEnemy);
}

function autoDetermineEnemyAbilityType() {
    if (attackingEnemyAbility === "Cut" || attackingEnemyAbility === "Stab") {
        attackingEnemyAbilityType = "targetCharacter";
    }
    if (attackingEnemyAbility === "Swinging Slash" || attackingEnemyAbility === "Crush") {
        attackingEnemyAbilityType = "targetCharacterTwice";
    }
    if (attackingEnemyAbility === "Heal" || attackingEnemyAbility === "Defend") {
        attackingEnemyAbilityType = "targetEnemy";
    }

    console.log("attackingEnemyAbilityAmount: ", attackingEnemyAbilityAmount);
    console.log("attackingEnemyAbilityType: ", attackingEnemyAbilityType);
}

async function autoApplyEnemyAbility() {
    if (attackingEnemyAbility === "Cut" || attackingEnemyAbility === "Stab") {
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

    if (attackingEnemyAbility === "Defend") {
        const enemyDivNum = targetEnemy.id.match(/\d+/)[0]; 
        const targetEnemyProtectionElem = document.getElementById(`enemy${enemyDivNum}-protection`);
        let targetEnemyProtection = parseInt(targetEnemyProtectionElem.textContent);
        targetEnemyProtection += attackingEnemyAbilityAmount;
        targetEnemyProtectionElem.textContent = targetEnemyProtection;

        console.log(`applied ${attackingEnemyAbility} to ${targetEnemy.id}`);
    }

    if (attackingEnemyAbility === "Swinging Slash" || attackingEnemyAbility === "Crush") {
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
}

async function autoGetCharMaxHealth() {
    const imgElem = targetCharacter.querySelector('img');
    let src = imgElem.src.split('/').pop(); 
    let image_id = src.replace('Base.png', '').replace('Leader.png', '');

    const res = await fetch(`http://localhost:3000/api/character/${image_id}`);
    const data = await res.json();
    return data.health_max;
}

async function autoGetEnemyMaxHealth() {
    const imgElem = targetEnemy.querySelector('img');
    let src = imgElem.src.split('/').pop(); 
    let image_id = src.replace('.png', '');

    const res = await fetch(`http://localhost:3000/api/enemy/${image_id}`);
    const data = await res.json();
    return data.health_max;
}

function autoCheckForDeadCharacters() {
    for (let i = 1; i <= 7; i++) {
        const charDiv = document.getElementById(`char${i}-div`);
        const charHealth = parseInt(document.getElementById(`char${i}-health`).textContent);
        // Only decrement if the character is alive (visible) and now dead
        if (charHealth <= 0 && charDiv.style.display === "block") {
            charDiv.style.display = "none";
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
        alert("You lost this battle");

        autoRemoveAllBorders();
        visibleEnemies = [];
        attackingEnemy = null;
        attackingEnemyAbility = null;
        attackingEnemyAbilityAmount = 0;
        attackingEnemyAbilityType = null;
        targetCharacter = null;
        targetEnemy = null;
        enemyAbilityProgress = null;

        return;

        // show defeat page
    }

    console.log("aliveCharCount: ", aliveCharCount);
}

function autoCheckForUnplayedEnemies() {
    if (visibleEnemies.length === 0) {
        waitUntilFinished(false);
        updateBattleVariables();
    } else {
        autoEnemyTurnCycle();
    }
}

function autoRemoveAllBorders() {
    for (let i = 1; i <= 7; i++) {
        const charDiv = document.getElementById(`char${i}-div`);
        charDiv.style.border = "none";
    }
    for (let i = 1; i <= 7; i++) {
        const enemyDiv = document.getElementById(`enemy${i}-div`);
        enemyDiv.style.border = "none";
    }
}