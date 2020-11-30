const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;
const status = document.getElementById("status");

