const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard = null;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkCards();
}

function checkCards() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function checkWin() {
    const matchedCards = document.querySelectorAll(".card.flipped");
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            document.getElementById("win-overlay").classList.add("show");
			document.getElementById("win-overlay").style.zIndex = 1;
        }, 500);
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    checkWin();
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

const playAgainButton = document.getElementById("play-again-button");

playAgainButton.addEventListener("click", function () {
    resetGame();
    document.getElementById("win-overlay").classList.remove("show");
    document.getElementById("win-overlay").style.zIndex = -1;
});

function resetGame() {
	cards.forEach(card => card.classList.remove("flipped"));
    randomCards();
    resetBoard();
}

function randomCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
}

randomCards();
cards.forEach(card => card.addEventListener("click", flipCard));
