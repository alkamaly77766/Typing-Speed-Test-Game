/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const easy = [
    "Hello",
    "Code",
    "Town",
    "Test", 
    "Rust", 
    "Task"
];
const normal = [
    "Coding",
    "Funny",
    "Working",
    "Python",
    "Scala",
    "Runner",
    "Roles",
    "Playing"
];
const hard = [
    "Programming",
    "Javascript",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Dependencies"
]
const words = {
    "Easy": easy,
    "Normal": normal,
    "Hard": hard
};

// Setting Levels
const lvls = {
    "Easy": 3,
    "Normal": 3,
    "Hard": 3
};



// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".lvl");
let secondsSpan = document.querySelector(".seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let select = document.querySelector("#lev");

// Default Level
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];
let defaultLevelform = words['Normal'].length;

// Setting Level Name + Seconds + Score

select.onclick = () =>{
    defaultLevelName = select.value;
    defaultLevelSeconds = lvls[select.value];
    defaultLevelform = words[select.value].length;
    innerText();
}
function innerText (){
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    scoreTotal.innerHTML = defaultLevelform;
}
innerText()

// Disable Paste Event
input.onpaste = function () {
    return false;
}

// Start Game
startButton.onclick = function () {
    this.remove();
    input.focus();
    defaultLevelSeconds = 6;
    document.querySelector('.select').style.display = 'none';
    // Generate Word Function
    genWords();
}

function genWords() {
    // Get Random Word From Array
    let randomWord = words[defaultLevelName][Math.floor(Math.random() * words[defaultLevelName].length)];
    // Get Word Index
    let wordIndex = words[defaultLevelName].indexOf(randomWord);
    // Remove WordFrom Array
    words[defaultLevelName].splice(wordIndex, 1);
    // Show The Random Word
    theWord.innerHTML = randomWord;
    // Empty Upcoming Words
    upcomingWords.innerHTML = '';
    // Generate Words
    for (let i = 0; i < words[defaultLevelName].length; i++) {
        // Create Div Element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[defaultLevelName][i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            // Stop Timer
            clearInterval(start);
            // Compare Words
            defaultLevelSeconds = lvls[defaultLevelName];
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // Empty Input Field
                input.value = '';
                // Increase Score
                scoreGot.innerHTML++;
                if (words[defaultLevelName].length > 0) {
                    // Call Generate Word Function
                    genWords();
                } else {
                    let span = document.createElement("span");
                    span.className = 'good';
                    let spanText = document.createTextNode("Congratz");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    // Remove Upcoming Words Box
                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement("span");
                span.className = 'bad';
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
}