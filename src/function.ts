export function Shuffle(array) {
    let currentIndex: number = array.length;
    let temp: number;
    let randomIndex: number;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
  
    return array;
}
  
export function Progress(time: number) {
    document.querySelector("#progress").classList.remove("d-none");
    document.querySelector("#progress").innerHTML = "<div> </div>";
    let progress = document.querySelector("#progress div");
    let timeLeft: number = time;
    let width: number = 100;
  
    let countDown = setInterval(() => {
      if (timeLeft < 0) {
        clearInterval(countDown);
        alert("Time Out!!!");
        location.reload();
      }
  
      width = ((timeLeft - 0.2) / time) * 100;
      timeLeft -= 0.2;
      progress.setAttribute("style", `width: ${width}%;`);
    }, 200);
}
  
export function LoadingGame() {
    const content = document.querySelector("#content");
  
    content.innerHTML = /* html */ `
        <div class="loading">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>`;
}
  