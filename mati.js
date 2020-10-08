

var position=0, correct=0, game, num1, num2, StartBtn, result, firstOption, secondOption, thirdOption, fourthOption, question, optionsArray, randomChoice, choices, choice, backgrounds, previousBG, selectBG,  i, questionHeader;
var Happy = document.getElementById("Happy");
var Sad = document.getElementById("Sad");
var Monkey = document.getElementById("Monkey");

var wellDone = document.getElementById("wellDone");
var prevQuestions = [" ", " ", " "];
var questNo = 0;

var Hebrew = {
    title: "משחק במתמטיקה",
    header: "לחץ בשביל להתחיל",
    button1: "התחל",
    question: "?" + num2 +  " + " + num1 + "כמה זה",
    button2: "הבא",
    correctAnswer: "כל הכבוד",
    wrongAnswer: "אופסיי, תנסה שוב",
    WellDone: "?כל הכבוד סיימת את המשחק, תרצה להתחיל שוב",
};

var English = {
    title: "Math Game",
    header: "Press to start",
    button1: "Start",
    question: "What is" + num1 + " + " + num2 + "?",
    button2: "Next",
    correctAnswer: "Good job",
    wrongAnswer: "sorry, try again",
    wellDone: "Well done you have finished the game, would you like to start again?"
};


// function isHebrew(){
//     if (HebrewWasChosen==true){
//         console.log("HE");
//     }
//     if (EnglishWasChosen==true){
//         console.log("EN");
//     }
// }
// console.log(isHebrew());

function initialization(){
    changeBG();
    // setting main variable
    game = document.getElementById('Game');

    // appending data
    game.innerHTML += '<div class="radioBtns"><input type="radio" class="option-input radio" name="buttons" /><label id="opt1"></label></div><br>';
    game.innerHTML += '<div class="radioBtns"><input type="radio" class="option-input radio" name="buttons" /><label id="opt2"></label></div><br>';
    game.innerHTML += '<div class="radioBtns"><input type="radio" class="option-input radio" name="buttons" /><label id="opt3"></label></div><br>';
    game.innerHTML += '<div class="radioBtns"><input type="radio" class="option-input radio" name="buttons" /><label id="opt4"></label></div><br><br>';
    game.innerHTML += '<button id="btn" class="button" style="vertical-align:middle" onclick="checkAnswer()"><span>Next </span></button>';
    
    
    // setting the rest of the variables
    // questionHeader = document.getElementById('myh2');
    question = document.getElementById('myh2');
    StartBtn = document.getElementById('btn');
    firstOption = document.getElementById('opt1');
    secondOption = document.getElementById('opt2');
    thirdOption = document.getElementById('opt3');
    fourthOption = document.getElementById('opt4');
    optionsArray = [firstOption, secondOption, thirdOption, fourthOption];
    
    // make the btn and giff hidden
    StartBtn.style.display = "none";
    wellDone.style.display = "none";
    Monkey.style.display = "none";
    mathQuestions();
}

function mathQuestions(){
    // checking if our position is equal to the number of questions or bigger.
    if (position>=5){
        // setting header and button to start over the game
        Happy.style.display = 'none';
        wellDone.style.display = 'block';
        Monkey.style.display = 'block';
        game.innerHTML = '<h2 id="myh2"></h2>'
        game.innerHTML += '<br><button id="btn" class="button" type="button" style="vertical-align:middle;" onclick="initialization()">Start Game</button>';
        textToSpeech("you have finish the game");
        textToSpeech("Would you like to start again?");
        position = 0;
        return false;
    }
    
   // define numbers and result
   var guessMore = true;
   while( guessMore ){
     num1 = Math.floor((Math.random() * 5) + 1);
     num2 = Math.floor((Math.random() * 5) + 1);
     result = num1 + num2;
    //  question.innerHTML = "What is " + num1 + " + " + num2 + " ?";
    question.innerHTML = English.question;
     if (!prevQuestions.includes(question.innerHTML)){
       guessMore = false;
       prevQuestions[questNo % 3] = question.innerHTML;
       questNo++;
     }
      
   }
    randomChoice = Math.floor(Math.random() * 4);
   
    

    // question convert to voice
    setTimeout(textToSpeech(question.textContent), 5000)
    
    var e = []
    // define random optionsArray, one of the optionsArray is the result
    for (i=0; i<optionsArray.length; i++){
        
        if (optionsArray[i] > 0){
            optionsArray[i].innerHTML = 0;
        }
        if (optionsArray[i] == optionsArray[randomChoice]){
            optionsArray[i].innerHTML = result;
        }
        else{
            var doIt = true;
            while (doIt == true){
              var num = Math.floor((Math.random() * 10) + 1);
              if (num != result && !e.includes(num)){
                e.push(num);
                optionsArray[i].innerHTML = num;
                doIt = false;}
              
            }
    }   }
    
      
}

function hiddenGif(x) {
   x.style.display='none'
  };

function textToSpeech(x){
    if('speechSynthesis' in window){
        var msg = x
        var Questionspeech = new SpeechSynthesisUtterance(msg);
        Questionspeech.lang = 'en-US';
        window.speechSynthesis.speak(Questionspeech);
    }
    
}



function changeBG(){
    backgrounds = [
        "img/dinosaur-cartoon.jpg",
        "img/GreenDino.jpg",
        "img/LionsKing.jpg",
        "img/Tower.jpg",
        "img/Simba.jpg"
    ]
    previousBG = selectBG
    selectBG = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    if (previousBG == selectBG){
        selectBG = backgrounds[Math.floor(Math.random() * backgrounds.length) + 1];
    }
    document.body.style.backgroundImage = 'url(' + selectBG + ')';
    document.body.style.height = "100%"
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
   
}



function checkAnswer(){
    choices = document.getElementsByName("buttons");
    
    for(i=0; i<choices.length; i++){
        if(choices[i].checked){
            choice = optionsArray[i].textContent;
        }
        choices[i].checked = false;
    }
    // checks if answer matches the correct choice
    if(choice == result){
      //each time there is a correct answer this value increases
      correct++;
      Sad.style.display = "none";
      Happy.style.display = "block";
      textToSpeech("Great job!"); 
      setTimeout(function(){hiddenGif(Happy);}, 1500);
    //   setTimeout(Happy.style.display = 'none', 5000);
      
      position++;
      setTimeout(function(){mathQuestions();}, 2500); 
    }
    else{
        Happy.style.display = "none";
        Sad.style.display = "block";
        textToSpeech("sorry! Try again!");
        setTimeout(function(){hiddenGif(Sad);}, 1500);
        textToSpeech(question.textContent);

    }
    
    
}


 
window.addEventListener('load', changeBG());
