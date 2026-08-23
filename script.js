/* =========================================================
   FATEMA BIRTHDAY WEBSITE — FINAL SCRIPT
========================================================= */


/* =========================================================
   FLOATING HEARTS
========================================================= */

const hearts = document.querySelector(".hearts");

function createHeart() {

    if (!hearts) return;

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = ["❤", "♡", "💕", "♥"][
        Math.floor(Math.random() * 4)
    ];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 4) + "s";

    hearts.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 350);


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {

    const target = document.getElementById(id);

    if (!target) {
        console.error("Screen not found:", id);
        return;
    }

    screens.forEach(screen => {
        screen.classList.remove("active-screen");
        screen.classList.add("hidden-screen");
    });

    target.classList.remove("hidden-screen");
    target.classList.add("active-screen");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (id === "gameScreen") {
        startHeartGame();
    }
}


/* =========================================================
   GENERIC NEXT BUTTONS
========================================================= */

document.querySelectorAll("[data-next]").forEach(button => {

    button.addEventListener("click", () => {

        showScreen(button.dataset.next);

    });

});


/* =========================================================
   🔒 BIRTHDAY COUNTDOWN
========================================================= */

/*
   TEMPORARY TEST DATE
   --------------------------------
   23 August 2026 — 8:30 PM IST

   AFTER TESTING CHANGE THIS BACK TO:

   new Date("2026-08-26T14:57:00+05:30")
*/

const birthday =
    new Date("2026-08-23T20:30:00+05:30");


const countdown =
    document.getElementById("countdown");

const countdownButton =
    document.getElementById("countdownButton");


function birthdayUnlocked() {

    return new Date() >= birthday;

}


function updateCountdown() {

    if (!countdown || !countdownButton) return;

    const now = new Date();

    const diff = birthday - now;


    /* BIRTHDAY ARRIVED */

    if (diff <= 0) {

        countdown.innerHTML =
            "🎉 Happy Birthday Fatema ❤️";

        countdownButton.innerHTML =
            "💌 Open Your Surprise ❤️";

        countdownButton.disabled = false;

        return;
    }


    /* STILL LOCKED */

    const days =
        Math.floor(
            diff / 1000 / 60 / 60 / 24
        );

    const hours =
        Math.floor(
            diff / 1000 / 60 / 60
        ) % 24;

    const minutes =
        Math.floor(
            diff / 1000 / 60
        ) % 60;

    const seconds =
        Math.floor(
            diff / 1000
        ) % 60;


    countdown.innerHTML = `

        <div class="timer">

            <div>
                <span>${days}</span>
                <small>Days</small>
            </div>

            <div>
                <span>${hours}</span>
                <small>Hours</small>
            </div>

            <div>
                <span>${minutes}</span>
                <small>Minutes</small>
            </div>

            <div>
                <span>${seconds}</span>
                <small>Seconds</small>
            </div>

        </div>

    `;


    countdownButton.innerHTML =
        "🔒 Opens on 26 August 2026 🎂";

    countdownButton.disabled = true;
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   COUNTDOWN BUTTON
========================================================= */

if (countdownButton) {

    countdownButton.addEventListener("click", event => {

        event.preventDefault();

        if (!birthdayUnlocked()) {

            countdownButton.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-6px)" },
                    { transform: "translateX(6px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 300
                }
            );

            return;
        }

        showScreen("birthdayScreen");

    });

}


/* =========================================================
   MILESTONE
========================================================= */

const ageElement =
    document.getElementById("birthdayAge");

if (ageElement) {
    ageElement.textContent = "23";
}


const birthDate =
    new Date("2003-08-26T00:00:00+05:30");

const daysLivedElement =
    document.getElementById("daysLived");

if (daysLivedElement) {

    const days =
        Math.floor(
            (new Date() - birthDate) /
            (1000 * 60 * 60 * 24)
        );

    daysLivedElement.textContent =
        days.toLocaleString();
}


/* =========================================================
   MEMORY PHOTOS
========================================================= */

const memoryFrames =
    document.querySelectorAll(".memory-frame");

memoryFrames.forEach(frame => {

    frame.addEventListener("click", () => {

        frame.classList.toggle("selected");

    });

});


/* =========================================================
   ENVELOPE
========================================================= */

const envelope =
    document.getElementById("envelope");

let envelopeOpened = false;

if (envelope) {

    envelope.addEventListener("click", () => {

        if (envelopeOpened) return;

        envelopeOpened = true;

        envelope.classList.add("open");

        const tapText =
            document.querySelector(".tap-text");

        if (tapText) {

            tapText.textContent =
                "Your letter is waiting... 💕";

        }

        setTimeout(() => {

            showScreen("letterMessageScreen");

        }, 1800);

    });

}


/* =========================================================
   ❤️ 12 REASONS
========================================================= */

const reasonCards =
    document.querySelectorAll(".reason-card");

const reasonCounter =
    document.getElementById("reasonCounter");

const revealNext =
    document.getElementById("revealNext");

const revealAll =
    document.getElementById("revealAll");

const reasonsContinue =
    document.getElementById("reasonsContinue");


let revealedReasons = 0;


function updateReasonCounter() {

    if (!reasonCounter) return;

    reasonCounter.textContent =
        `${revealedReasons} / 12 Reasons Revealed ❤️`;

}


function finishReasons() {

    revealedReasons =
        reasonCards.length;


    reasonCards.forEach(card => {

        card.classList.add("revealed");

    });


    updateReasonCounter();


    if (revealNext) {

        revealNext.disabled = true;

        revealNext.textContent =
            "All Revealed ❤️";

    }


    if (reasonsContinue) {

        reasonsContinue.classList.remove(
            "hidden-element"
        );

        reasonsContinue.disabled = false;

        reasonsContinue.style.display =
            "inline-block";

    }

}


function revealOneReason() {

    if (
        revealedReasons >=
        reasonCards.length
    ) {

        finishReasons();

        return;

    }


    reasonCards[
        revealedReasons
    ].classList.add("revealed");


    revealedReasons++;


    updateReasonCounter();


    if (
        revealedReasons >=
        reasonCards.length
    ) {

        finishReasons();

    }

}


if (revealNext) {

    revealNext.addEventListener(
        "click",
        revealOneReason
    );

}


if (revealAll) {

    revealAll.addEventListener(
        "click",
        finishReasons
    );

}


/* =========================================================
   🚨 IMPORTANT:
   12 REASONS → HEART GAME
========================================================= */

if (reasonsContinue) {

    reasonsContinue.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            console.log(
                "Opening Heart Game..."
            );

            showScreen("gameScreen");

        }
    );

}


updateReasonCounter();


/* =========================================================
   ❤️ HEART CATCHING GAME
========================================================= */

const gameArea =
    document.getElementById("heartGameArea");

const playerBasket =
    document.getElementById("playerBasket");

const heartScore =
    document.getElementById("heartScore");

const gameTimer =
    document.getElementById("gameTimer");

const gameProgress =
    document.getElementById("gameProgress");

const gameResult =
    document.getElementById("gameResult");


let score = 0;

let gameTime = 6;

let gameRunning = false;

let gameInterval = null;

let spawnInterval = null;


/* Move basket */

function moveBasket(clientX) {

    if (
        !gameRunning ||
        !gameArea ||
        !playerBasket
    ) return;


    const rect =
        gameArea.getBoundingClientRect();


    const basketWidth =
        playerBasket.offsetWidth;


    let x =
        clientX - rect.left;


    x = Math.max(
        basketWidth / 2,
        Math.min(
            rect.width - basketWidth / 2,
            x
        )
    );


    playerBasket.style.left =
        x + "px";
}


if (gameArea) {

    gameArea.addEventListener(
        "mousemove",
        event => {

            moveBasket(
                event.clientX
            );

        }
    );


    gameArea.addEventListener(
        "touchmove",
        event => {

            event.preventDefault();

            if (event.touches.length) {

                moveBasket(
                    event.touches[0].clientX
                );

            }

        },
        {
            passive: false
        }
    );

}


/* Create falling heart */

function createGameHeart() {

    if (
        !gameRunning ||
        !gameArea
    ) return;


    const heart =
        document.createElement("div");


    heart.className =
        "game-heart";


    heart.textContent =
        ["❤️", "💗", "💕", "💖"][
            Math.floor(
                Math.random() * 4
            )
        ];


    heart.style.left =
        Math.random() *
        Math.max(
            1,
            gameArea.clientWidth - 35
        ) +
        "px";


    const duration =
        2 +
        Math.random() * 1;


    heart.style.animationDuration =
        duration + "s";


    gameArea.appendChild(heart);


    const collision =
        setInterval(() => {

            if (
                !gameRunning ||
                !heart.isConnected
            ) {

                clearInterval(collision);

                return;
            }


            const heartRect =
                heart.getBoundingClientRect();

            const basketRect =
                playerBasket.getBoundingClientRect();


            const caught =
                heartRect.bottom >=
                    basketRect.top &&

                heartRect.left <
                    basketRect.right &&

                heartRect.right >
                    basketRect.left;


            if (caught) {

                score++;

                heartScore.textContent =
                    score;


                gameProgress.style.width =
                    Math.min(
                        score * 10,
                        100
                    ) + "%";


                heart.remove();

                clearInterval(collision);

            }

        }, 50);


    setTimeout(() => {

        clearInterval(collision);

        if (heart.isConnected) {
            heart.remove();
        }

    }, (duration + 0.5) * 1000);

}


/* Start game */

function startHeartGame() {

    if (!gameArea) return;


    clearInterval(gameInterval);

    clearInterval(spawnInterval);


    score = 0;

    gameTime = 6;

    gameRunning = true;


    heartScore.textContent = "0";

    gameTimer.textContent =
        gameTime;

    gameProgress.style.width =
        "0%";


    gameResult.classList.add(
        "hidden-element"
    );


    playerBasket.style.left =
        "50%";


    spawnInterval =
        setInterval(
            createGameHeart,
            500
        );


    gameInterval =
        setInterval(() => {

            gameTime--;

            gameTimer.textContent =
                gameTime;


            if (gameTime <= 0) {

                endHeartGame();

            }

        }, 1000);

}


/* End game */

function endHeartGame() {

    if (!gameRunning) return;


    gameRunning = false;


    clearInterval(gameInterval);

    clearInterval(spawnInterval);


    gameResult.classList.remove(
        "hidden-element"
    );


    setTimeout(() => {

        showScreen("cakeScreen");

    }, 1800);

}


/* =========================================================
   🎂 CAKE BUILDER
========================================================= */

const cakeTabs =
    document.querySelectorAll(".cake-tab");

const cakePanels =
    document.querySelectorAll(".cake-panel");


cakeTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target =
            tab.dataset.tab;


        cakeTabs.forEach(item =>
            item.classList.remove("active")
        );


        cakePanels.forEach(panel =>
            panel.classList.remove("active")
        );


        tab.classList.add("active");


        const panel =
            document.querySelector(
                `[data-panel="${target}"]`
            );


        if (panel) {

            panel.classList.add("active");

        }

    });

});


/* Cake flavor */

const cakeLayers =
    document.querySelectorAll(".cake-layer");


const flavorColors = {

    chocolate: "#70452f",

    vanilla: "#f4d9a5",

    strawberry: "#e995a9",

    redvelvet: "#a83b49"

};


document
    .querySelectorAll("[data-flavor]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        "[data-flavor]"
                    )
                    .forEach(item =>
                        item.classList.remove(
                            "selected"
                        )
                    );


                button.classList.add(
                    "selected"
                );


                cakeLayers.forEach(
                    layer => {

                        layer.style.background =
                            flavorColors[
                                button.dataset.flavor
                            ];

                    }
                );

            }
        );

    });


/* Layers */

document
    .querySelectorAll("[data-layers]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        "[data-layers]"
                    )
                    .forEach(item =>
                        item.classList.remove(
                            "selected"
                        )
                    );


                button.classList.add(
                    "selected"
                );


                const number =
                    Number(
                        button.dataset.layers
                    );


                const three =
                    document.querySelector(
                        ".layer-three"
                    );

                const four =
                    document.querySelector(
                        ".layer-four"
                    );


                if (three) {

                    three.style.display =
                        number >= 3
                            ? "block"
                            : "none";

                }


                if (four) {

                    four.style.display =
                        number >= 4
                            ? "block"
                            : "none";

                }

            }
        );

    });


/* Frosting */

const cakeTop =
    document.getElementById("cakeTop");


document
    .querySelectorAll("[data-frosting]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        "[data-frosting]"
                    )
                    .forEach(item =>
                        item.classList.remove(
                            "selected"
                        )
                    );


                button.classList.add(
                    "selected"
                );


                if (cakeTop) {

                    cakeTop.style.background =
                        button.dataset.frosting;

                }

            }
        );

    });


/* Decorations */

const cakeDecoration =
    document.getElementById(
        "cakeDecoration"
    );


const decorations = {

    flowers: "🌸",

    sprinkles: "🌈",

    hearts: "❤️",

    none: ""

};


document
    .querySelectorAll("[data-decor]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        "[data-decor]"
                    )
                    .forEach(item =>
                        item.classList.remove(
                            "selected"
                        )
                    );


                button.classList.add(
                    "selected"
                );


                if (cakeDecoration) {

                    cakeDecoration.textContent =
                        decorations[
                            button.dataset.decor
                        ];

                }

            }
        );

    });


/* =========================================================
   CANDLES
========================================================= */

const cakeCandles =
    document.getElementById(
        "cakeCandles"
    );

const candleCount =
    document.getElementById(
        "candleCount"
    );

const addCandle =
    document.getElementById(
        "addCandle"
    );

const removeCandles =
    document.getElementById(
        "removeCandles"
    );

const blowCandles =
    document.getElementById(
        "blowCandles"
    );


let candles = 0;


if (addCandle) {

    addCandle.addEventListener(
        "click",
        () => {

            if (candles >= 10) return;


            candles++;


            const candle =
                document.createElement(
                    "div"
                );


            candle.className =
                "cake-candle";


            cakeCandles.appendChild(
                candle
            );


            candleCount.textContent =
                candles;

        }
    );

}


if (removeCandles) {

    removeCandles.addEventListener(
        "click",
        () => {

            candles = 0;

            cakeCandles.innerHTML =
                "";

            candleCount.textContent =
                "0";

        }
    );

}


if (blowCandles) {

    blowCandles.addEventListener(
        "click",
        () => {

            if (candles === 0) {

                alert(
                    "Add some candles first! 🕯️"
                );

                return;

            }


            cakeCandles
                .querySelectorAll(
                    ".cake-candle"
                )
                .forEach(candle =>
                    candle.classList.add(
                        "blown"
                    )
                );


            createConfetti();

        }
    );

}


/* Cake Done */

const cakeDone =
    document.getElementById(
        "cakeDone"
    );


if (cakeDone) {

    cakeDone.addEventListener(
        "click",
        () => {

            createConfetti();

            setTimeout(
                () => {

                    showScreen(
                        "messageCardsScreen"
                    );

                },
                700
            );

        }
    );

}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {

    const symbols = [
        "❤️",
        "💕",
        "✨",
        "🎀"
    ];


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.position =
            "fixed";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top =
            "-30px";

        piece.style.fontSize =
            (15 + Math.random() * 20) +
            "px";

        piece.style.zIndex =
            "999";

        piece.style.pointerEvents =
            "none";

        piece.style.transition =
            "transform 2s ease, opacity 2s ease";


        document.body.appendChild(
            piece
        );


        requestAnimationFrame(() => {

            piece.style.transform =
                `translateY(
                    ${window.innerHeight + 100}px
                )
                rotate(
                    ${Math.random() * 720}deg
                )`;

            piece.style.opacity =
                "0";

        });


        setTimeout(
            () => piece.remove(),
            2200
        );

    }

}


/* =========================================================
   LOVE MESSAGE CARDS
========================================================= */

const loveCards =
    document.querySelectorAll(
        ".love-card"
    );

const loveMessage =
    document.getElementById(
        "loveMessage"
    );

const loveMessageText =
    document.getElementById(
        "loveMessageText"
    );

const closeLoveMessage =
    document.getElementById(
        "closeLoveMessage"
    );


loveCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            if (loveMessageText) {

                loveMessageText.textContent =
                    card.dataset.message;

            }


            if (loveMessage) {

                loveMessage.classList.remove(
                    "hidden-element"
                );

            }

        }
    );

});


if (closeLoveMessage) {

    closeLoveMessage.addEventListener(
        "click",
        () => {

            if (loveMessage) {

                loveMessage.classList.add(
                    "hidden-element"
                );

            }

        }
    );

}


/* =========================================================
   FINAL SCREEN
========================================================= */

const finalButton =
    document.getElementById(
        "finalButton"
    );


if (finalButton) {

    finalButton.addEventListener(
        "click",
        () => {

            createConfetti();

            setTimeout(
                () => {

                    showScreen(
                        "finalScreen"
                    );

                },
                500
            );

        }
    );

}


/* =========================================================
   REPLAY
========================================================= */

const replayButton =
    document.getElementById(
        "replayButton"
    );


if (replayButton) {

    replayButton.addEventListener(
        "click",
        () => {

            location.reload();

        }
    );

}


/* =========================================================
   DONE
========================================================= */

console.log(
    "❤️ Fatema Birthday Website Loaded!"
);

console.log(
    "Birthday:",
    birthday
);
