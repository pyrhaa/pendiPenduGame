const prompt = require('readline-sync');
const randomWord = require('./randomWord.json');
const chalk = require('chalk');

let wins = 0;
let losses = 0;

const resetGame = () => {
  let hiddenWordArray = [];
  let numberOfGuesses = 6;
  let alreadyGuessedLetters = [];

  const hangman = () => {
    const word = randomWord[Math.floor(Math.random() * randomWord.length)];
    const letters = word.split('');
    let numberOfRemainingLetters = word.length;

    const findHiddenWordArray = () => {
      letters.forEach((_, index) => {
        hiddenWordArray[index] = '_';
      });
    };

    findHiddenWordArray();

    console.log(
      chalk.blue(
        '\nBienvenue sur Pendi le Pendu!\nAppuyez sur ctrl+c pour Stop\n'
      )
    );

    while (numberOfRemainingLetters > 0 && numberOfGuesses > 0) {
      console.log(hiddenWordArray.join(' '));
      let guess = prompt
        .question(chalk.cyan('\nWesh balance une lettre mon poto: '))
        .toLowerCase();

      const evaluateGuess = () => {
        if (guess === '') {
          console.log('\nEntre une lettre cimer.');
        } else if (/[^a-zA-Z]/.test(guess[0])) {
          console.log('\nEntre une lettre cimer.');
        } else if (/[a-zA-Z]/.test(guess[0])) {
          letters.forEach((letter, index) => {
            if (guess[0] === letter) {
              if (hiddenWordArray[index] === '_') {
                hiddenWordArray[index] = guess[0];
                numberOfRemainingLetters--;
              }
            }
          });
          if (
            !alreadyGuessedLetters.includes(guess[0]) &&
            !letters.includes(guess[0])
          ) {
            numberOfGuesses--;
          }
          if (!alreadyGuessedLetters.includes(guess[0])) {
            alreadyGuessedLetters.push(guess[0]);
          }
        }
      };

      evaluateGuess();

      const drawHangman = () => {
        if (numberOfGuesses === 6) {
          console.log(
            `\nT'es un vrai, toujours avec ${numberOfGuesses} essaies le sang.`
          );
        } else if (numberOfGuesses === 5) {
          console.log(
            `   ||\n   ||\n   ||\n   ||\n   ||\n   ||\n  /||\n //||\n============`
          );
          console.log(`Reste ${numberOfGuesses} essaies le sang.`);
        } else if (numberOfGuesses === 4) {
          console.log(
            `,==============\n   ||  /\n   || /\n   ||/\n   ||\n   ||\n   ||\n  /||\n //||\n============`
          );
          console.log(`Reste ${numberOfGuesses} essaies le sang.`);
        } else if (numberOfGuesses === 3) {
          console.log(
            `,==========Y===\n   ||  /   |\n   || /    |\n   ||/\n   ||\n   ||\n   ||\n  /||\n //||\n============`
          );
          console.log(`Reste ${numberOfGuesses} essaies le sang.`);
        } else if (numberOfGuesses === 2) {
          console.log(
            `,==========Y===\n   ||  /   |\n   || /    |\n   ||/     O\n   ||\n   ||\n   ||\n  /||\n //||\n============`
          );
          console.log(`Reste ${numberOfGuesses} essaies le sang.`);
        } else if (numberOfGuesses === 1) {
          console.log(
            `,==========Y===\n   ||  /   |\n   || /    |\n   ||/     O\n   ||     /|\\\n   ||\n   ||\n  /||\n //||\n============`
          );
          console.log(
            `T'ES DANS LA HESS ! Reste ${numberOfGuesses} essaies le sang.`
          );
        } else if (numberOfGuesses === 0) {
          console.log(
            `,==========Y===\n   ||  /   |\n   || /    |\n   ||/     O\n   ||     /|\\\n   ||      |\\\n   ||\n  /||\n //||\n============`
          );
          console.log(`Reste ${numberOfGuesses} essaies le sang.`);
        }
        console.log(`lettres d'jà cramée: ${alreadyGuessedLetters}\n`);
      };

      drawHangman();
    }

    const showResults = () => {
      if (numberOfRemainingLetters > 0) {
        console.log(hiddenWordArray.join(' '));
        console.log(
          chalk.red(
            `\n\nT'es sincère, mon gros!?\nFallait devine ${word} 'spèce de gogole.\n`
          )
        );
        losses++;
      } else {
        console.log(hiddenWordArray.join(' '));
        console.log(
          chalk.green(`\n\nA la bien cousin!\nla réponse c'est ${word}.\n`)
        );
        wins++;
      }
      console.log(
        `\nT'as pecho ${wins} de points et t'as louzdé ${losses} points.\n`
      );
    };

    showResults();
  };

  hangman();
};

while (true) {
  resetGame();
}
