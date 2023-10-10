function bubbleGame() {
  let hitvalue = 0;
  let timerVal = 60;
  let scoreVal = 0;
  let clickedBubble;

  function makeBubbles() {
    let clutter = "";
    for (let i = 1; i <= 105; i++) {
      clutter += `<div class="bubble">${Math.floor(Math.random() * 10)}</div>`;
    }
    document.querySelector(".bottom").innerHTML = clutter;
  }

  function newHit() {
    hitvalue = Math.floor(Math.random() * 10);
    document.querySelector(".hit").textContent = hitvalue;
  }

  function runtimer() {
    const counter = setInterval(() => {
      if (timerVal > 0) {
        timerVal--;
        document.querySelector(".timer").textContent = timerVal;
      } else {
        clearInterval(counter);
        document.querySelector(".bottom").innerHTML = `<h1 style ="margin-top: -20px;">TIMES UP!</h1>
        <h1>YOUR SCORE WAS ${scoreVal}</h1>`;
      }
    }, 1000);
  }

  function scoreIncreaser() {
    scoreVal += 10;
    document.querySelector(".score").textContent = scoreVal;
    document.querySelector("#replayBtn").addEventListener("click", () => {
      document.querySelector(".score").textContent = 0;
    });
  }

  document.querySelector(".bottom").addEventListener("click", (dets) => {
    clickedBubble = Number(dets.target.textContent);
    if (hitvalue === clickedBubble) {
      scoreIncreaser();
      newHit();
      makeBubbles();
    }
  });

  makeBubbles();
  newHit();
  runtimer();

  document.querySelector("#replayBtn").addEventListener("click", () => {
    timerVal = 60;
    runtimer()
    newHit();
    makeBubbles();
});
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector("#overlay");

if (window.getComputedStyle(modal).display === "flex") {
  overlay.style.display = "block";
}
const closeModalBtn = document
  .querySelector("#closeModalBtn")
  .addEventListener("click", () => {
    let modalTimer = 3;
    const modalCounterBox = document.querySelector(".modalCounterBox");
    modalCounterBox.style.display = "block";

    const modalCounter = setInterval(() => {
      if (modalTimer > 0) {
        modalTimer--;
        modalCounterBox.innerHTML = modalTimer;
      } else {
        clearInterval(modalCounter);
        bubbleGame();
      }
    }, 1000);
    setTimeout(() => {
      overlay.style.display = "none";
      modal.style.display = "none";
    }, 3000);
  });
