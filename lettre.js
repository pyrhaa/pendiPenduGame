//je verifie que la lettre choisie est la bonne

class Lettre {
  constructor(lettre) {
    this.lettre = lettre;
    this.guessed = false;
  }

  checkGuess(guess) {
    if (guess === this.lettre) {
      return (this.guessed = true);
    } else {
      this.guessed = this.guessed;
    }
  }
}

exports.Lettre = Lettre;
