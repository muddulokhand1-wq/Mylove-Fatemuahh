// Floating Hearts
const hearts = document.querySelector(".hearts");

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="❤";

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(15+Math.random()*25)+"px";

heart.style.animationDuration = (6 + Math.random() * 4) + "s";
hearts.appendChild(heart);

setTimeout(()=>heart.remove(),9000);

}

setInterval(createHeart,350);


// Countdown

const countdown=document.getElementById("countdown");

function updateCountdown(){

const birthday=new Date("2026-08-26 14:57:00");

const now=new Date();

const diff=birthday-now;

if(diff<=0){

countdown.innerHTML="🎉 Happy Birthday Fatema ❤️";

return;

}

const days=Math.floor(diff/1000/60/60/24);

const hours=Math.floor(diff/1000/60/60)%24;

const mins=Math.floor(diff/1000/60)%60;

const secs=Math.floor(diff/1000)%60;

countdown.innerHTML=`

<div class="timer">

<div><span>${days}</span><small>Days</small></div>

<div><span>${hours}</span><small>Hours</small></div>

<div><span>${mins}</span><small>Minutes</small></div>

<div><span>${secs}</span><small>Seconds</small></div>

</div>

`;

}

updateCountdown();

setInterval(updateCountdown,1000);