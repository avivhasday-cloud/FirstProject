
let EnglishWasChosen, HebrewWasChosen;
let English1 = document.getElementById("En");
let Hebrew1 = document.getElementById("He");
English1.addEventListener('click', function () {
    window.location.href = "https://avivhasday-cloud.github.io/FirstProject/";
    EnglishWasChosen = true;
});

Hebrew1.addEventListener('click', function () {
    console.log("he");
    HebrewWasChosen = true;
});

