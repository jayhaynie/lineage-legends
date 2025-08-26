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
                    // Proceed to next step in your app
                } else {
                    console.log("Incorrect password.");
                }
            })
            .catch(err => console.log("User not found or error:", err));
    }
});

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

            console.log(chosenEnemy);
            console.log(numEnemies);
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

//battle logic
function startBattle(username) {
    fetch(`http://localhost:3000/api/${username}/cards/base`)
        .then(res => res.json())
        .then(baseCards => {
            deckCount = baseCards.length; 
            energyCount = 2 + baseCards.length;
            document.getElementById("energy-count").textContent = energyCount;
            
        })
        .catch(err => console.log(err));
}

function endBattle() {
    //hide and show stuff
}

const battleDivs = document.getElementById("battle-divs");


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
    document.body.style.backgroundImage = "url('images/battlegrounds/ground_bandit.png')";
    banditButtonsDiv.style.display = "none";

    startBattle(currentUsername);
    battleDivs.style.display = "block";
    difficulty = 1;
    randomEnemy(difficulty);

    playLeader(currentUsername); // Use the username of the logged-in player

    console.log("cliff button clicked - difficulty: " + difficulty);
});

//Next step is to make it possible to click the deck of cards and play a base card onto the next div
// - deck should have the right img and blur based on how many base cards are in the deck
// - drawing a card should take 2 energy
// - guardrails to determine which div a drawn card plays to
// - guardrails to determine when all divs are Filled
// - gameplan with dean about combat system (how would he approach unique types of abilities handling)