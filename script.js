const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;
document.getElementById("start-test").style.display == "none";
document.getElementById("retake-test").style.display = "none";
document.getElementById("stop-test").style.display == "none";

roundNumber = function() {
    var numSel = document.querySelectorAll('.speed'),
      numCount;
  
    for (numCount = 0; numCount < numSel.length; numCount++) {
      var numInd = numSel[numCount].innerHTML;
      if (numInd < 0) {
      };
      numSel[numCount].innerHTML = (Math.round(numInd * 100) / 100)
    }
  }
  roundNumber();

const renderNewQuote = async () => {
  const response = await fetch(quoteApiUrl);

  let data = await response.json();

  quote = data.content;

  let arr = quote.split("").map((value) => {

    return "<span class='quote-chars'>" + value + "</span>";
  });

  quoteSection.innerHTML += arr.join("");
};


userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-chars");
  quoteChars = Array.from(quoteChars);
  let userInputChars = userInput.value.split("");

  quoteChars.forEach((char, index) => {
    if (char.innerText == userInputChars[index]) {
      document.getElementById("quote-input").maxLength = 100;
      char.classList.add("success");
    }
    else if (userInputChars[index] == null) {
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    }
    else {
      if (!char.classList.contains("fail")) {
        mistakes += 1;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }
    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });
    if (check) {
      displayResult();
    }
  });
});

function updateTimer() {
  if (time == 0) {
    displayResult();
  } else {
    document.getElementById("timer").innerText = --time + "s";
  }
}

const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};

const displayResult = () => {
  clearInterval(timer);
  document.getElementById("start-test").style.display == "none";
  document.getElementById("stop-test").style.display = "none";
  document.getElementById("retake-test").style.display = "block";
  userInput.disabled = true;
  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 100;
  }
  document.getElementById("wpm").innerText =
    (userInput.value.length / 5 / timeTaken).toFixed() + " wpm";
  document.getElementById("accuracy").innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + " %";
};

const startTest = () => {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  timeReduce();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
  document.getElementById("retake-test").style.display == "none";
  document.getElementById("quote-input").focus();
};

const retakeTest = () => {
    document.location.reload(true)
}

window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  document.getElementById("retake-test").style.display == "none";
  userInput.disabled = false;
  renderNewQuote();
  quote.replace(/’/g, "'");
  quote.replace(/＇/g, "'");
  quote.replace(/ˊ/g, "'");
  quote.replace(/`/g, "'");
  quote.replace(/‘/g, "'");
};

//space();
//function space() {
//document.body.onkeyup = function(space){
//  if (document.getElementById("start-test").style.display == "none") return false
//  if (document.getElementById("start-test").style.display == "block"){
//    if(space.keyCode == 32){
//      startTest();
//    }
//  }
//}
//}

space();
function space() {
document.body.onkeyup = function(space){
  if (document.getElementById("start-test").style.display == "none") return false
  if (document.getElementById("start-test").style.display == "block"){
      startTest();
  }
}
}
