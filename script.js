/* =========================================================
   FATEMA BIRTHDAY WEBSITE — FINAL SCRIPT
========================================================= */


/* =========================================================
   FLOATING HEARTS
========================================================= */

const heartsContainer = document.querySelector(".hearts");

function createFloatingHeart() {

    if (!heartsContainer) return;

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML =
        ["❤", "♡", "💕", "♥"][
            Math.floor(Math.random() * 4)
        ];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (14 + Math.random() * 22) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 5) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 12000);
}

setInterval(createFloatingHeart, 450);


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

const screens = document.querySelectorAll(".screen");

let currentScreen = "countdownScreen";

function showScreen(screenId) {

    const target = document.getElementById(screenId);

    if (!target) {
        console.error("Screen not found:", screenId);
        return;
    }

    screens.forEach(screen => {

        screen.classList.remove("active-screen");

        screen.classList.add("hidden-screen");

    });

    target.classList.remove("hidden-screen");

    target.classList.add("active-screen");

    currentScreen = screenId;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (screenId === "gameScreen") {
        startHeartGame();
    }

    if (screenId === "reasonsScreen") {
        resetReasons();
    }

}


/* =========================================================
   NEXT BUTTONS
========================================================= */

document
    .querySelectorAll("[data-next]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const nextScreen =
                button.dataset.next;

            showScreen(nextScreen);

        });

    });


/* =========================================================
   🔒 BIRTHDAY COUNTDOWN + LOCK
========================================================= */

const countdown =
    document.getElementById("countdown");

const countdownButton =
    document.getElementById("countdownButton");


/*
    BIRTHDAY:
    26 AUGUST 2026
    2:57 PM IST

    The +05:30 forces Indian Standard Time.
*/

const birthday =
    new Date("2026-08-26T14:57:00+05:30");


function isBirthdayUnlocked() {

    return new Date() >= birthday;

}


function updateCountdown() {

    const now = new Date();

    const difference =
        birthday - now;


    /* -----------------------------------------
       🎉 BIRTHDAY HAS ARRIVED
    ----------------------------------------- */

    if (difference <= 0) {

        countdown.innerHTML =
            "🎉 Happy Birthday Fatema ❤️";

        countdownButton.innerHTML =
            "💌 Open Your Surprise ❤️";

        countdownButton.disabled =
            false;

        return;

    }


    /* -----------------------------------------
       🔒 STILL LOCKED
    ----------------------------------------- */

    const days =
        Math.floor(
            difference /
            1000 /
            60 /
            60 /
            24
        );

    const hours =
        Math.floor(
            difference /
            1000 /
            60 /
            60
        ) % 24;

    const minutes =
        Math.floor(
            difference /
            1000 /
            60
        ) % 60;

    const seconds =
        Math.floor(
            difference /
            1000
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

    countdownButton.disabled =
        true;

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* -----------------------------------------
   OPEN SURPRISE BUTTON
----------------------------------------- */

if (countdownButton) {

    countdownButton.addEventListener(
        "click",
        () => {

            /*
                ALWAYS check the real time.

                Before:
                → Nothing happens.

                After:
                → Opens birthday screen.
            */

            if (!isBirthdayUnlocked()) {

                countdownButton.animate(

                    [
                        {
                            transform: "translateX(0)"
                        },
                        {
                            transform: "translateX(-6px)"
                        },
                        {
                            transform: "translateX(6px)"
                        },
                        {
                            transform: "translateX(0)"
                        }
                    ],

                    {
                        duration: 300
                    }

                );

                return;

            }


            showScreen("birthdayScreen");

        }
    );

}


/* =========================================================
   MILESTONE — DAYS LIVED
========================================================= */

const birthDate =
    new Date("2003-08-26T00:00:00+05:30");


function updateDaysLived() {

    const daysLivedElement =
        document.getElementById("daysLived");

    if (!daysLivedElement) return;


    const today =
        new Date();


    const difference =
        today - birthDate;


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    daysLivedElement.textContent =
        days.toLocaleString();

}


updateDaysLived();


/* =========================================================
   MEMORY GALLERY
========================================================= */

const memoryPhotos =
    document.querySelectorAll(".memory-photo");

const memoryDots =
    document.querySelectorAll("#memoryDots span");

const memoryPrev =
    document.getElementById("memoryPrev");

const memoryNext =
    document.getElementById("memoryNext");


let currentMemory = 0;


function showMemory(index) {

    if (memoryPhotos.length === 0) return;


    if (index < 0) {

        index =
            memoryPhotos.length - 1;

    }


    if (index >= memoryPhotos.length) {

        index = 0;

    }


    currentMemory = index;


    memoryPhotos.forEach(
        (photo, i) => {

            photo.classList.toggle(
                "active-memory",
                i === currentMemory
            );

        }
    );


    memoryDots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active-dot",
                i === currentMemory
            );

        }
    );

}


if (memoryNext) {

    memoryNext.addEventListener(
        "click",
        () => {

            showMemory(
                currentMemory + 1
            );

        }
    );

}


if (memoryPrev) {

    memoryPrev.addEventListener(
        "click",
        () => {

            showMemory(
                currentMemory - 1
            );

        }
    );

}


memoryDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showMemory(index);

            }
        );

    }
);


showMemory(0);


/* =========================================================
   ENVELOPE
========================================================= */

const envelope =
    document.getElementById("envelope");


let envelopeOpened = false;


if (envelope) {

    envelope.addEventListener(
        "click",
        () => {

            if (envelopeOpened) return;


            envelopeOpened = true;


            envelope.classList.add("open");


            const tapText =
                document.querySelector(".tap-text");


            if (tapText) {

                tapText.textContent =
                    "Opening something from my heart... ❤️";

            }


            setTimeout(
                () => {

                    showScreen(
                        "letterMessageScreen"
                    );

                },
                1500
            );

        }
    );

}


/* =========================================================
   12 REASONS
========================================================= */

const reasonCards =
    document.querySelectorAll(".reason-card");

const reasonCounter =
    document.getElementById("reasonCounter");

const reasonProgressFill =
    document.getElementById(
        "reasonProgressFill"
    );

const reasonsContinue =
    document.getElementById(
        "reasonsContinue"
    );


let revealedReasons = 0;


function updateReasonProgress() {

    const total =
        reasonCards.length;


    if (reasonCounter) {

        reasonCounter.textContent =
            `${revealedReasons} / ${total}`;

    }


    if (reasonProgressFill) {

        const percentage =
            total === 0
                ? 0
                : (
                    revealedReasons /
                    total
                ) * 100;


        reasonProgressFill.style.width =
            percentage + "%";

    }


    if (
        revealedReasons >= total &&
        total > 0
    ) {

        if (reasonsContinue) {

            reasonsContinue.classList.remove(
                "hidden-element"
            );

        }

    }

}


function revealReason(card) {

    if (
        card.classList.contains("revealed")
    ) {

        return;

    }


    card.classList.add("revealed");


    revealedReasons++;


    updateReasonProgress();


    createTinyHeart(card);

}


reasonCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                revealReason(card);

            }
        );

    }
);


function resetReasons() {

    revealedReasons = 0;


    reasonCards.forEach(
        card => {

            card.classList.remove(
                "revealed"
            );

        }
    );


    if (reasonsContinue) {

        reasonsContinue.classList.add(
            "hidden-element"
        );

    }


    updateReasonProgress();

}


function createTinyHeart(element) {

    const heart =
        document.createElement("span");


    heart.textContent = "❤️";


    heart.style.position =
        "absolute";

    heart.style.right =
        "20px";

    heart.style.bottom =
        "15px";

    heart.style.fontSize =
        "16px";

    heart.style.pointerEvents =
        "none";

    heart.style.animation =
        "reasonHeartPop .7s ease forwards";


    element.appendChild(heart);


    setTimeout(
        () => {

            heart.remove();

        },
        800
    );

}


/* =========================================================
   ❤️ HEART CATCHING GAME
========================================================= */

const gameArea =
    document.getElementById(
        "heartGameArea"
    );

const playerBasket =
    document.getElementById(
        "playerBasket"
    );

const heartScore =
    document.getElementById(
        "heartScore"
    );

const gameTimer =
    document.getElementById(
        "gameTimer"
    );

const gameProgress =
    document.getElementById(
        "gameProgress"
    );

const gameResult =
    document.getElementById(
        "gameResult"
    );


let score = 0;

let gameTime = 30;

let gameRunning = false;

let gameTimerInterval = null;

let heartSpawnInterval = null;


function moveBasket(clientX) {

    if (
        !gameRunning ||
        !gameArea ||
        !playerBasket
    ) {

        return;

    }


    const rect =
        gameArea.getBoundingClientRect();


    let x =
        clientX -
        rect.left;


    const basketWidth =
        playerBasket.offsetWidth;


    x = Math.max(
        basketWidth / 2,
        Math.min(
            rect.width -
            basketWidth / 2,
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


function createGameHeart() {

    if (
        !gameRunning ||
        !gameArea
    ) {

        return;

    }


    const heart =
        document.createElement("div");


    heart.className =
        "game-heart";


    heart.textContent =
        [
            "❤️",
            "💗",
            "💕",
            "💖"
        ][
            Math.floor(
                Math.random() * 4
            )
        ];


    const maxLeft =
        Math.max(
            0,
            gameArea.clientWidth - 35
        );


    heart.style.left =
        Math.random() *
        maxLeft +
        "px";


    const fallDuration =
        1.8 +
        Math.random() * 1.2;


    heart.style.animationDuration =
        fallDuration + "s";


    gameArea.appendChild(heart);


    const collisionInterval =
        setInterval(
            () => {

                if (!gameRunning) {

                    clearInterval(
                        collisionInterval
                    );

                    return;

                }


                if (!heart.isConnected) {

                    clearInterval(
                        collisionInterval
                    );

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
                        basketRect.left &&

                    heartRect.top <
                        basketRect.bottom;


                if (caught) {

                    score++;


                    heartScore.textContent =
                        score;


                    updateGameProgress();


                    heart.remove();


                    clearInterval(
                        collisionInterval
                    );


                    if (score >= 10) {

                        endHeartGame(true);

                    }

                }

            },
            40
        );


    setTimeout(
        () => {

            clearInterval(
                collisionInterval
            );


            if (heart.isConnected) {

                heart.remove();

            }

        },
        (fallDuration + .5) * 1000
    );

}


function updateGameProgress() {

    if (!gameProgress) return;


    const percentage =
        Math.min(
            score / 10 * 100,
            100
        );


    gameProgress.style.width =
        percentage + "%";

}


function startHeartGame() {

    if (!gameArea) return;


    clearInterval(
        gameTimerInterval
    );

    clearInterval(
        heartSpawnInterval
    );


    gameRunning = true;

    score = 0;

    gameTime = 30;


    if (heartScore) {

        heartScore.textContent = "0";

    }


    if (gameTimer) {

        gameTimer.textContent =
            gameTime;

    }


    if (gameProgress) {

        gameProgress.style.width =
            "0%";

    }


    if (gameResult) {

        gameResult.classList.add(
            "hidden-element"
        );

    }


    gameTimerInterval =
        setInterval(
            () => {

                if (!gameRunning) return;


                gameTime--;


                if (gameTimer) {

                    gameTimer.textContent =
                        gameTime;

                }


                if (gameTime <= 0) {

                    endHeartGame(false);

                }

            },
            1000
        );


    heartSpawnInterval =
        setInterval(
            createGameHeart,
            450
        );

}


function endHeartGame(won) {

    if (!gameRunning) return;


    gameRunning = false;


    clearInterval(
        gameTimerInterval
    );

    clearInterval(
        heartSpawnInterval
    );


    if (gameResult) {

        gameResult.classList.remove(
            "hidden-element"
        );


        const heading =
            gameResult.querySelector("h3");

        const paragraph =
            gameResult.querySelector("p");


        if (won) {

            if (heading) {

                heading.textContent =
                    "You caught my love! ❤️";

            }


            if (paragraph) {

                paragraph.textContent =
                    "As if you haven't already stolen enough of it. 🙄❤️";

            }

        }
        else {

            if (heading) {

                heading.textContent =
                    "Almost! ❤️";

            }


            if (paragraph) {

                paragraph.textContent =
                    "I think I threw a little too much love at you. 😭";

            }

        }

    }


    setTimeout(
        () => {

            showScreen(
                "cakeScreen"
            );

        },
        1700
    );

}


/* =========================================================
   🎂 CAKE BUILDER
========================================================= */

const cakeTabs =
    document.querySelectorAll(
        ".cake-tab"
    );

const cakePanels =
    document.querySelectorAll(
        ".cake-panel"
    );


cakeTabs.forEach(
    tab => {

        tab.addEventListener(
            "click",
            () => {

                const target =
                    tab.dataset.tab;


                cakeTabs.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                cakePanels.forEach(
                    panel => {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );


                tab.classList.add(
                    "active"
                );


                const panel =
                    document.querySelector(
                        `[data-panel="${target}"]`
                    );


                if (panel) {

                    panel.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* Cake flavor */

const cakeLayers =
    document.querySelectorAll(
        ".cake-layer"
    );


const flavorColors = {

    chocolate: "#70452f",

    vanilla: "#f1d49d",

    strawberry: "#e99bad",

    redvelvet: "#a83b49"

};


document
    .querySelectorAll("[data-flavor]")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "[data-flavor]"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    const flavor =
                        button.dataset.flavor;


                    cakeLayers.forEach(
                        layer => {

                            layer.style.background =
                                flavorColors[
                                    flavor
                                ];

                        }
                    );

                }
            );

        }
    );


/* Cake layers */

document
    .querySelectorAll("[data-layers]")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "[data-layers]"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    const number =
                        Number(
                            button.dataset.layers
                        );


                    const third =
                        document.querySelector(
                            ".layer-three"
                        );

                    const fourth =
                        document.querySelector(
                            ".layer-four"
                        );


                    if (third) {

                        third.style.display =
                            number >= 3
                                ? "block"
                                : "none";

                    }


                    if (fourth) {

                        fourth.style.display =
                            number >= 4
                                ? "block"
                                : "none";

                    }

                }
            );

        }
    );


/* Frosting */

const cakeTop =
    document.getElementById(
        "cakeTop"
    );


document
    .querySelectorAll("[data-frosting]")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "[data-frosting]"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "selected"
                                );

                            }
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

        }
    );


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
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            "[data-decor]"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "selected"
                                );

                            }
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

        }
    );


/* Candles */

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


let candleNumber = 0;


if (addCandle) {

    addCandle.addEventListener(
        "click",
        () => {

            if (candleNumber >= 10) return;


            candleNumber++;


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
                candleNumber;

        }
    );

}


if (removeCandles) {

    removeCandles.addEventListener(
        "click",
        () => {

            candleNumber = 0;

            cakeCandles.innerHTML = "";

            candleCount.textContent = "0";

        }
    );

}


if (blowCandles) {

    blowCandles.addEventListener(
        "click",
        () => {

            if (candleNumber === 0) {

                alert(
                    "Add some candles first! 🕯️"
                );

                return;

            }


            document
                .querySelectorAll(
                    ".cake-candle"
                )
                .forEach(
                    candle => {

                        candle.classList.add(
                            "blown"
                        );

                    }
                );


            createConfetti();

        }
    );

}


/* Cake done */

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
        "🌸",
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
            Math.random() *
            100 +
            "vw";


        piece.style.top =
            "-30px";


        piece.style.fontSize =
            (
                13 +
                Math.random() * 18
            ) +
            "px";


        piece.style.zIndex =
            "2000";


        piece.style.pointerEvents =
            "none";


        piece.style.transition =
            "transform 2s ease, opacity 2s ease";


        document.body.appendChild(
            piece
        );


        requestAnimationFrame(
            () => {

                piece.style.transform =
                    `
                    translateY(
                        ${window.innerHeight + 100}px
                    )
                    rotate(
                        ${Math.random() * 720}deg
                    )
                    `;


                piece.style.opacity = "0";

            }
        );


        setTimeout(
            () => {

                piece.remove();

            },
            2200
        );

    }

}


/* =========================================================
   THREE LITTLE GIFTS
========================================================= */

const giftBoxes =
    document.querySelectorAll(
        ".gift-box"
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


giftBoxes.forEach(
    gift => {

        gift.addEventListener(
            "click",
            () => {

                const message =
                    gift.dataset.message;


                if (loveMessageText) {

                    loveMessageText.textContent =
                        message;

                }


                if (loveMessage) {

                    loveMessage.classList.remove(
                        "hidden-element"
                    );

                }


                createConfetti();

            }
        );

    }
);


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

            if (loveMessage) {

                loveMessage.classList.add(
                    "hidden-element"
                );

            }


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
   STARTUP
========================================================= */

console.log(
    "❤️ Fatema Birthday Website Loaded"
);

console.log(
    "🔒 Birthday unlock:",
    birthday.toString()
);
