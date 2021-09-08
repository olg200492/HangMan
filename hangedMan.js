const readlineSync = require('readline-sync');
const figlet = require('figlet');
const randomWords = require('random-words');



(function () {
  'use strict';
  

/*
1.Generating a random word from random-words libary 
2.Holding in array each letter from the word
3.Creating an array with the same size of the selected word filled with '*'
4.Creating a Set object that holds each letter the user tries to guess,
with this Set will be able to inform the user if he tries to enter a letter he already entered
*/  
let numberOfGusses = 10;
let word = randomWords(1).join(" ");
let wordArray = [...word];
let arr = new Array(word.length).fill('*');
let guessedChar = new Set();
let guessed = false;

//Printing a welcome msg
console.log(figlet.textSync('HANG MAN', {
  font: 'Ghost',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 100,
  whitespaceBreak: false
}));


// As long the user has gesses and not guessed the letters in the word the code will promt an imput from user
while(numberOfGusses>0 && !guessed){
  let userInput = readlineSync.question(`You have ${numberOfGusses} guesses\nThe word is\n${arr.join('')}\nWhat is your guess?\n`);
  if(checkInput(userInput)){
    //Lowering case the char
    userInput = userInput.toLocaleLowerCase();
    /* If the letter already guessed will inform the user to try another letter,
    will not decrease number of guesses left  */
    if(guessedChar.has(userInput)){
      console.log(`You already entered "${userInput}",try another letter\n`);
    }else{
      guessedChar.add(userInput);
      checkIfCharInWord(userInput);
    }    
  }else{
    console.log("Please enter only one character\n");
  }
}
/* If no more guesses left and the user did not guss the word already,
will ask the user to guss the entire word  */
if(numberOfGusses===0&&!guessed){
  let guess = readlineSync.question('Enter your guess for the entire word\n');
  if(guess.toLowerCase() === word){
    console.log("You guessed correctly!!!!");
  }
  else{
    console.log(`You guessed incorrectly...\nThe word is:\n${word}`);
  }
}

//Checks if the input from user is an valid char (a-z || A-Z) and one length return true else false
function checkInput(input){
  return input.length===1&&(/[a-zA-Z]/).test(input);
}

/* Checks if char from user is in the word
if char exist we update our array of '*' and add the char in the correct location in the word
and check if the user guessed all the letters in the word,
if he guessed the word a msg will be displayed and will end the game.
If the char dosn't exist in the word will remove number of guesses left for the user  */
function checkIfCharInWord(input){
  let index = 0;
  let flag = false;
  while(wordArray.indexOf(input,index)>-1){
    flag = true;
    index = wordArray.indexOf(input,index);
    arr[index]= input;
    index++;
  }
  if(flag){
    if(arr.join('')===word){
      console.log(`You guessed!\n${word}`);
      guessed=true;
    }
  }else{
    numberOfGusses--;
  }
}
})();