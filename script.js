/* =========================================
   FLOATING HEARTS
========================================= */

const hearts = document.querySelector(".hearts");

function createHeart() {

    if (!hearts) return;

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 4) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createHeart, 350);


/* =========================================
   SCREEN MANAGEMENT
========================================= */

const screens =
    document.querySelectorAll(".screen");

let currentScreen =
    "countdownScreen";


function showScreen(screenId) {

    screens.forEach(screen => {

        screen.classList.remove(
            "active-screen"
        );

        screen.classList.add(
            "hidden-screen"
        );

    });


    const nextScreen =
        document.getElementById(screenId);


    if (!nextScreen) {

        console.error(
            "Screen not found:",
            screenId
        );

        return;
    }


    nextScreen.classList.remove(
        "hidden-screen"
    );

    nextScreen.classList.add(
        "active-screen"
    );


    currentScreen =
        screenId;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* Start heart game when opened */

    if (
        screenId === "gameScreen" &&
        !gameRunning
    ) {

        startHeartGame();

    }

}


/* =========================================
   COUNTDOWN
========================================= */

const countdown =
    document.getElementById(
        "countdown"
    );


const countdownButton =
    document.getElementById(
        "countdownButton"
    );


/*
   REAL BIRTHDAY

   26 August 2026
   2:57 PM
*/

const birthday =
    new Date(
        "2026-08-26T14:57:00"
    );


/*
   TEST MODE

   true  = opens now
   false = locked until birthday

   KEEP TRUE WHILE TESTING.

   Before giving it to Fatema:
   change true → false
*/

const TEST_MODE =true
;


let birthdayUnlocked =
    TEST_MODE;


function updateCountdown() {


    /* =====================================
       TEST MODE
    ===================================== */

    if (TEST_MODE) {

        countdown.innerHTML = `

            <div class="timer">

                <div>

                    <span>🎉</span>

                    <small>
                        Unlocked
                    </small>

                </div>

            </div>

        `;


        countdownButton.innerHTML =
            "💌 Open Your Surprise";


        countdownButton.disabled =
            false;


        return;
    }


    /* =====================================
       REAL COUNTDOWN
    ===================================== */

    const now =
        new Date();


    const diff =
        birthday - now;


    /* Birthday reached */

    if (diff <= 0) {

        birthdayUnlocked =
            true;


        countdown.innerHTML =
            "🎉 Happy Birthday Fatema ❤️";


        countdownButton.innerHTML =
            "💌 Open Your Surprise";


        countdownButton.disabled =
            false;


        return;
    }


    const days =
        Math.floor(
            diff /
            1000 /
            60 /
            60 /
            24
        );


    const hours =
        Math.floor(
            diff /
            1000 /
            60 /
            60
        ) % 24;


    const mins =
        Math.floor(
            diff /
            1000 /
            60
        ) % 60;


    const secs =
        Math.floor(
            diff /
            1000
        ) % 60;


    countdown.innerHTML = `

        <div class="timer">

            <div>

                <span>
                    ${days}
                </span>

                <small>
                    Days
                </small>

            </div>


            <div>

                <span>
                    ${hours}
                </span>

                <small>
                    Hours
                </small>

            </div>


            <div>

                <span>
                    ${mins}
                </span>

                <small>
                    Minutes
                </small>

            </div>


            <div>

                <span>
                    ${secs}
                </span>

                <small>
                    Seconds
                </small>

            </div>

        </div>

    `;
}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================
   COUNTDOWN → BIRTHDAY
========================================= */

if (countdownButton) {

    countdownButton.addEventListener(
        "click",
        () => {

            if (!birthdayUnlocked) {

                countdownButton.animate(

                    [
                        {
                            transform:
                                "translateX(0)"
                        },

                        {
                            transform:
                                "translateX(-5px)"
                        },

                        {
                            transform:
                                "translateX(5px)"
                        },

                        {
                            transform:
                                "translateX(0)"
                        }

                    ],

                    {
                        duration: 300
                    }

                );

                return;
            }


            showScreen(
                "birthdayScreen"
            );

        }
    );

}


/* =========================================
   GENERIC NEXT BUTTONS
========================================= */

document
    .querySelectorAll("[data-next]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const nextScreen =
                    button.dataset.next;

                showScreen(
                    nextScreen
                );

            }
        );

    });


/* =========================================
   MILESTONE
========================================= */

const birthdayAge = 23;


const ageElement =
    document.getElementById(
        "birthdayAge"
    );


if (ageElement) {

    ageElement.textContent =
        birthdayAge;

}


/*
   Fatema's date of birth
*/

const birthDate =
    new Date(
        "2003-08-26T00:00:00"
    );


const today =
    new Date();


const milliseconds =
    today - birthDate;


const daysLived =
    Math.floor(
        milliseconds /
        (1000 * 60 * 60 * 24)
    );


const daysLivedElement =
    document.getElementById(
        "daysLived"
    );


if (daysLivedElement) {

    daysLivedElement.textContent =
        daysLived.toLocaleString();

}


/* =========================================
   ENVELOPE
========================================= */

const envelope =
    document.getElementById(
        "envelope"
    );


let envelopeOpened =
    false;


if (envelope) {

    envelope.addEventListener(
        "click",
        () => {

            if (envelopeOpened) {

                return;

            }


            envelopeOpened =
                true;


            envelope.classList.add(
                "open"
            );


            const tapText =
                document.querySelector(
                    ".tap-text"
                );


            if (tapText) {

                tapText.textContent =
                    "Your letter is waiting... 💕";

            }


            setTimeout(
                () => {

                    showScreen(
                        "letterMessageScreen"
                    );

                },
                1800
            );

        }
    );

}


/* =========================================
   12 REASONS
========================================= */

const reasonCards =
    document.querySelectorAll(
        ".reason-card"
    );


const reasonCounter =
    document.getElementById(
        "reasonCounter"
    );


const revealNext =
    document.getElementById(
        "revealNext"
    );


const revealAll =
    document.getElementById(
        "revealAll"
    );


const reasonsContinue =
    document.getElementById(
        "reasonsContinue"
    );


let revealedReasons =
    0;


function updateReasonCounter() {

    if (!reasonCounter) {

        return;

    }


    reasonCounter.textContent =
        `${revealedReasons} / 12 Reasons Revealed ❤️`;

}


function revealReason() {

    if (
        revealedReasons >=
        reasonCards.length
    ) {

        return;

    }


    reasonCards[
        revealedReasons
    ].classList.add(
        "revealed"
    );


    revealedReasons++;


    updateReasonCounter();


    if (
        revealedReasons >=
        reasonCards.length
    ) {

        if (revealNext) {

            revealNext.disabled =
                true;

            revealNext.textContent =
                "All Revealed ❤️";

        }


        if (reasonsContinue) {

            reasonsContinue.classList.remove(
                "hidden-element"
            );

        }

    }

}


if (revealNext) {

    revealNext.addEventListener(
        "click",
        revealReason
    );

}


if (revealAll) {

    revealAll.addEventListener(
        "click",
        () => {

            reasonCards.forEach(
                card => {

                    card.classList.add(
                        "revealed"
                    );

                }
            );


            revealedReasons =
                reasonCards.length;


            updateReasonCounter();


            if (revealNext) {

                revealNext.disabled =
                    true;

                revealNext.textContent =
                    "All Revealed ❤️";

            }


            if (reasonsContinue) {

                reasonsContinue.classList.remove(
                    "hidden-element"
                );

            }

        }
    );

}


if (reasonsContinue) {

    reasonsContinue.addEventListener(
        "click",
        () => {

            showScreen(
                "gameScreen"
            );

        }
    );

}


updateReasonCounter();


/* =========================================
   HEART CATCHING GAME
========================================= */

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


/* Mouse */

if (gameArea) {

    gameArea.addEventListener(
        "mousemove",
        event => {

            moveBasket(
                event.clientX
            );

        }
    );


    /* Touch */

    gameArea.addEventListener(
        "touchmove",
        event => {

            event.preventDefault();


            if (
                event.touches.length
            ) {

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
    ) {

        return;

    }


    const heart =
        document.createElement(
            "div"
        );


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


    const areaWidth =
        gameArea.clientWidth;


    heart.style.left =
        Math.random() *
        (areaWidth - 35) +
        "px";


    const fallDuration =
        2.2 +
        Math.random() * 1.2;


    heart.style.animationDuration =
        fallDuration + "s";


    gameArea.appendChild(
        heart
    );


    const checkCollision =
        setInterval(
            () => {

                if (!gameRunning) {

                    clearInterval(
                        checkCollision
                    );

                    return;

                }


                if (!heart.isConnected) {

                    clearInterval(
                        checkCollision
                    );

                    return;

                }


                const heartRect =
                    heart.getBoundingClientRect();


                const basketRect =
                    playerBasket.getBoundingClientRect();


                const collision =

                    heartRect.bottom >=
                    basketRect.top &&

                    heartRect.left <
                    basketRect.right &&

                    heartRect.right >
                    basketRect.left &&

                    heartRect.bottom <
                    basketRect.bottom + 35;


                if (collision) {

                    score++;


                    heartScore.textContent =
                        score;


                    const progress =
                        Math.min(
                            score / 10 * 100,
                            100
                        );


                    gameProgress.style.width =
                        progress + "%";


                    heart.remove();


                    clearInterval(
                        checkCollision
                    );

                }

            },
            50
        );


    setTimeout(
        () => {

            clearInterval(
                checkCollision
            );


            if (
                heart.isConnected
            ) {

                heart.remove();

            }

        },
        (fallDuration + 0.5) * 1000
    );

}


/* Start game */

function startHeartGame() {

    if (!gameArea) {

        return;

    }


    score = 0;

    gameTime = 6;

    gameRunning = true;


    heartScore.textContent =
        "0";


    gameTimer.textContent =
        gameTime;


    gameProgress.style.width =
        "0%";


    gameResult.classList.add(
        "hidden-element"
    );


    playerBasket.style.left =
        "50%";


    clearInterval(
        spawnInterval
    );

    clearInterval(
        gameInterval
    );


    spawnInterval =
        setInterval(
            createGameHeart,
            500
        );


    gameInterval =
        setInterval(
            () => {

                gameTime--;


                gameTimer.textContent =
                    gameTime;


                const progress =
                    (
                        (6 - gameTime) /
                        6
                    ) * 100;


                gameProgress.style.width =
                    progress + "%";


                if (
                    gameTime <= 0
                ) {

                    endHeartGame();

                }

            },
            1000
        );

}


/* End game */

function endHeartGame() {

    if (!gameRunning) {

        return;

    }


    gameRunning =
        false;


    clearInterval(
        gameInterval
    );

    clearInterval(
        spawnInterval
    );


    gameResult.classList.remove(
        "hidden-element"
    );


    setTimeout(
        () => {

            showScreen(
                "cakeScreen"
            );

        },
        1800
    );

}


/* =========================================
   CAKE BUILDER
========================================= */

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


/* =========================================
   CAKE FLAVOR
========================================= */

const cakeLayers =
    document.querySelectorAll(
        ".cake-layer"
    );


const flavorColors = {

    chocolate:
        "#70452f",

    vanilla:
        "#f4d9a5",

    strawberry:
        "#e995a9",

    redvelvet:
        "#a83b49"

};


document
    .querySelectorAll(
        "[data-flavor]"
    )
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


/* =========================================
   CAKE LAYERS
========================================= */

document
    .querySelectorAll(
        "[data-layers]"
    )
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


                    const layers =
                        Number(
                            button.dataset.layers
                        );


                    const layerThree =
                        document.querySelector(
                            ".layer-three"
                        );


                    const layerFour =
                        document.querySelector(
                            ".layer-four"
                        );


                    if (layerThree) {

                        layerThree.style.display =
                            layers >= 3
                                ? "block"
                                : "none";

                    }


                    if (layerFour) {

                        layerFour.style.display =
                            layers >= 4
                                ? "block"
                                : "none";

                    }

                }
            );

        }
    );


/* =========================================
   FROSTING
========================================= */

const cakeTop =
    document.getElementById(
        "cakeTop"
    );


document
    .querySelectorAll(
        "[data-frosting]"
    )
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


/* =========================================
   DECORATIONS
========================================= */

const cakeDecoration =
    document.getElementById(
        "cakeDecoration"
    );


document
    .querySelectorAll(
        "[data-decor]"
    )
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


                    const decorations = {

                        flowers:
                            "🌸",

                        sprinkles:
                            "🌈",

                        hearts:
                            "❤️",

                        none:
                            ""

                    };


                    cakeDecoration.textContent =
                        decorations[
                            button.dataset.decor
                        ];

                }
            );

        }
    );


/* =========================================
   CANDLES
========================================= */

const cakeCandles =
    document.getElementById(
        "cakeCandles"
    );


const candleCount =
    document.getElementById(
        "candleCount"
    );


let candles = 0;


const addCandleButton =
    document.getElementById(
        "addCandle"
    );


if (addCandleButton) {

    addCandleButton.addEventListener(
        "click",
        () => {

            if (
                candles >= 10
            ) {

                return;

            }


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


const removeCandlesButton =
    document.getElementById(
        "removeCandles"
    );


if (removeCandlesButton) {

    removeCandlesButton.addEventListener(
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


/* =========================================
   BLOW CANDLES
========================================= */

const blowCandlesButton =
    document.getElementById(
        "blowCandles"
    );


if (blowCandlesButton) {

    blowCandlesButton.addEventListener(
        "click",
        () => {

            if (
                candles === 0
            ) {

                alert(
                    "Add some candles first! 🕯️"
                );

                return;

            }


            cakeCandles
                .querySelectorAll(
                    ".cake-candle"
                )
                .forEach(
                    candle => {

                        candle.classList.add(
                            "blown"
                        );

                        candle.style.opacity =
                            ".6";

                    }
                );


            createConfetti();

        }
    );

}


/* =========================================
   CAKE DONE
========================================= */

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
                900
            );

        }
    );

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

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
            [
                "❤️",
                "💕",
                "✨",
                "🎀"
            ][
                Math.floor(
                    Math.random() * 4
                )
            ];


        piece.style.position =
            "fixed";


        piece.style.left =
            Math.random() * 100 +
            "vw";


        piece.style.top =
            "-30px";


        piece.style.fontSize =
            (
                15 +
                Math.random() * 20
            ) + "px";


        piece.style.zIndex =
            "999";


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
                    `translateY(
                        ${window.innerHeight + 100}px
                    )
                    rotate(
                        ${Math.random() * 720}deg
                    )`;


                piece.style.opacity =
                    "0";

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


/* =========================================
   LOVE MESSAGE CARDS
========================================= */

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


loveCards.forEach(
    card => {

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

    }
);


const closeLoveMessage =
    document.getElementById(
        "closeLoveMessage"
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


/* =========================================
   FINAL SCREEN
========================================= */

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


/* =========================================
   REPLAY
========================================= */

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


/* =========================================
   DONE
========================================= */

console.log(
    "❤️ Fatema Birthday Website Loaded!"
);

console.log(
    "TEST_MODE:",
    TEST_MODE
);

console.log(
    "Birthday unlock:",
    birthday
);
