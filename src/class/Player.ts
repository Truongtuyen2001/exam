import { LoadingGame } from "./../function";
import Game from "./Game";

const newGame = new Game();

export default class Player {
  name: string;
  idSeleted: number;

  constructor() {
    this.startGame();
  }

  register(name: string): void {
    this.name = name;
    this.idSeleted = 0;
  }

  startGame(): void {
    let btnPlay: HTMLAreaElement = document.querySelector("#btnPlay");
    let namePlayer = <HTMLInputElement>(
      document.querySelector(".inputNamePlayer")
    );

    let regex = /^[a-zA-Z ]{2,30}$/;

    btnPlay.addEventListener("click", () => {
      this.register(namePlayer.value);
      if (regex.test((this.name).trim())) {
        LoadingGame();
        setTimeout(() => {
          newGame.newGame(this.name);
          setTimeout(() => {
            this.playingGame();
            this.restartGame();
            this.quitGame();
          }, 500);
        }, 3000);
      } else {
        alert("Tên người chơi không hợp lệ");
      }
    });
  }

  playingGame(): void {
    const items = document.querySelectorAll(".item");
    let img1: HTMLElement;
    let img2: HTMLElement;
    items.forEach((element) => {
      element.addEventListener("click", () => {

        let idSelect = (element as HTMLElement).dataset.id;
        if (this.idSeleted == 0) {
          this.idSeleted = Number(idSelect);
        } else {
          this.idSeleted = newGame.rules(Number(idSelect), this.idSeleted);
        }

        element.classList.add("rotate");
      });
    });
  }

  restartGame() {
    const btnReset = document.querySelector("#btnReset");
    btnReset.addEventListener("click", () => {
      let Confirm: boolean = confirm("Bạn có chắc muốn chơi lại hay không ?");
      if (Confirm) {

        LoadingGame();

        setTimeout(() => {
          newGame.newGame(this.name);
          setTimeout(() => {
            this.playingGame();
            this.restartGame();
            this.quitGame();
          }, 500);
        }, 3000);
      }
    });
  }

  quitGame() {
    const btnQuit = document.querySelector("#btnQuit");
    btnQuit.addEventListener("click", () => {
      let Confirm: boolean = confirm("Bạn có muốn thoát Game không ?");
      if (Confirm) {
        location.reload();
      }
    });
  }
}
