import { Component, OnInit, inject } from '@angular/core';
import { word } from '../../models/word';
import { GameService } from '../../service/game.service';
import { PointUser } from '../../models/point-user';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  words : word[] = [];
  wordSelected : word = null;
  totalLetters : number = 0;
  lettersCorrects : String[] = [];
  gameService = inject(GameService);
  authService = inject(AuthService);
  MAX_INTENTS= 6;

  intents = 0;
  intent_errors = 0;


  letters: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');


   ngOnInit(): void {

    this.gameService.getWords().subscribe({
        next : (data) => {
          this.words = data;
          this.wordSelected = this.getRandomWord();
          this.totalLetters = this.wordSelected.word.split('').length;
          console.log(this.wordSelected);

        },
        error : (data) => {
          alert("Error al cargar las palabras")
        }
    });
  }
  getWordWithGuions(): string {
    const letterCount: { [key: string]: number } = {};
      this.lettersCorrects.forEach(letter => {
      const lowerCaseLetter = letter.toLowerCase();
      letterCount[lowerCaseLetter] = (letterCount[lowerCaseLetter] || 0) + 1;
    });
  
    return this.wordSelected.word.split('').map(letter => {
      const lowerCaseLetter = letter.toLowerCase();
      if (letterCount[lowerCaseLetter] > 0) {
        letterCount[lowerCaseLetter]--;
        return letter;
      } else {
        return '_';
      }
    }).join(' ');
  }

  checkLetter(letter: string): void {
    const lettersFinded = this.wordSelected.word.split('').filter(x => x === letter.toLowerCase());

    if(this.intents < 6){
      if(lettersFinded != null && lettersFinded != undefined && lettersFinded.length > 0){
  
        const totalLetterFinded = this.lettersCorrects.filter(x => x === letter.toLowerCase());
        if(totalLetterFinded != null && totalLetterFinded != undefined && totalLetterFinded.length > 0){
          if(lettersFinded.length <= totalLetterFinded.length){
            this.intent_errors ++;
          }
          else {
            this.lettersCorrects.push(letter.toLowerCase());
          }
        }else {
          this.lettersCorrects.push(letter.toLowerCase());
        }
  
      }else{
        this.intent_errors ++;
      }
      this.intents ++;
      if(this.intents == 6 || this.wordSelected.word.split('').length == this.lettersCorrects.length)
        {
          this.saveScore();
          if(this.wordSelected.word.split('').length == this.lettersCorrects.length){
            alert("Felicidades ganaste");
          }else{
            alert("Perdedor!");
          }
        }
    }else{
      alert("No se puede realizar más intentos");
    }
      
  }

  getInitials(input: string): string {
    return input
      .split(' ')
      .map(word => word.charAt(0))
      .join('');
  }

  saveScore(){
    const userName: string = this.authService.getUserName();
    var gameCounts = 0;
    const scoresOfPlayer = this.gameService.getScoresForPlayer(userName).subscribe({
      next : (data) => {
        gameCounts = data.length;
      },
      error : (data) => {
        gameCounts = 0;
      }
    });
    var date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    var idGame = "P" + gameCounts + this.getInitials(userName);
    var score: PointUser = {
      playerName: userName,
      word : this.wordSelected.word,
      attemptsLeft : this.MAX_INTENTS - this.intents,
      score : this.calculateScore(),
      date: date,
      idGame : idGame,
      id : "0",
    };

    this.gameService.savePoints(score).subscribe({
      next : (data) => {
        alert("Partida guardada con exito");
      },
      error : (data) => {
        alert("Error al guardar partida")
      }
    });
  }


  calculateScore() : number{
    var remainingIntents : number = this.MAX_INTENTS - this.intents;
    if(remainingIntents == 6){
      return 100;
    }else if (remainingIntents == 5){
      return 80;
    }else if (remainingIntents == 4){
      return 60;
    }else if (remainingIntents == 3){
      return 40;
    }else if (remainingIntents == 2){
      return 20;
    }else if (remainingIntents == 1){
      return 10;
    }else {
      return 0;
    }
  }

  getRandomWord(): word | null {
    if (this.words.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  getLettersToDraw(){

  }

}
