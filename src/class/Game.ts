import { Shuffle, Progress } from "./../function";
import Swal from 'sweetalert2';

interface PokemonInterface {
  id: Number;
  name: String;
  image: String;
}

export default class Game {
  arrPokemons: PokemonInterface[] = [];
  cardLefts: number = 30;

  constructor() {
    this.getCards();
  }

  async getCards() {
    const pokemons: number = 15;

    for (let i = 1; i <= pokemons; i++) {
      let data: any = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      let pokemon: any = await data.json();
      this.arrPokemons = [
        ...this.arrPokemons,
        {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.back_default,
        },
      ];
    }

    this.arrPokemons = [...this.arrPokemons, ...this.arrPokemons];
  }

  newGame(namePlayer: string) {
    this.arrPokemons = Shuffle(this.arrPokemons);
    document.querySelector("#info").innerHTML = /* html */ `
        <span>Player  :  ${namePlayer} </span> ______________________________
        <button id='btnReset'> Chơi lại </button>
        <button id='btnQuit'> Thoát </button>
      `;

    Progress(180);

    const content = document.querySelector("#content");
    content.innerHTML = this.arrPokemons
      .map((x) => {
        return /*html*/ `
            <div data-id='${x.id}' class="col-2 item position-relative">
                <div class="cardPokemon position-relative d-flex justify-content-center">
                    <span class="card__id position-absolute">$ ${x.id}</span>
                    <img width=80 class="card__img" src="${x.image}" />
                </div>
                <div class='cover position-absolute'></div>
            </div>
            `;
      })
      .join("");
  }

  rules(idSelect: number, idSelected: number): number {
    if (idSelect == idSelected) {
      const cardHidden = document.querySelectorAll(
        `div[data-id='${idSelect}']`
      );

      setTimeout(() => {
        cardHidden.forEach((element) => {
          element.classList.add("hidden");
        });
      }, 500);

      this.cardLefts -= 2;
      if (this.cardLefts == 0) {
        setTimeout(() => {
          this.win();
        }, 800);
      }
    } else {
      setTimeout(() => {
        const items = document.querySelectorAll(".item");
        items.forEach((element) => {
          element.classList.remove("rotate");
        });
      }, 1000);
    }

    return 0;
  }

  win() {
    Swal.fire({
        title: 'Xin chúc mừng, bạn là người chiến thắng!',
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
    })
    location.reload();
  }
}
