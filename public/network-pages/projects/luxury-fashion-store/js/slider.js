/*=========================================
LUXURY FASHION STORE
slider.js
=========================================*/

const slides=document.querySelectorAll(".hero-slide");
const nextBtn=document.querySelector(".next-slide");
const prevBtn=document.querySelector(".prev-slide");
const indicators=document.querySelectorAll(".indicator");

let currentSlide=0;
let autoSlide;

/*==============================
SHOW SLIDE
==============================*/

function showSlide(index){

if(slides.length===0) return;

if(index>=slides.length){

currentSlide=0;

}

else if(index<0){

currentSlide=slides.length-1;

}

else{

currentSlide=index;

}

slides.forEach((slide,i)=>{

slide.classList.remove("active");

if(indicators[i]){

indicators[i].classList.remove("active");

}

});

slides[currentSlide].classList.add("active");

if(indicators[currentSlide]){

indicators[currentSlide].classList.add("active");

}

}

/*==============================
NEXT
==============================*/

function nextSlide(){

showSlide(currentSlide+1);

}

/*==============================
PREVIOUS
==============================*/

function prevSlide(){

showSlide(currentSlide-1);

}

/*==============================
AUTO PLAY
==============================*/

function startSlider(){

if(slides.length===0) return;

autoSlide=setInterval(()=>{

nextSlide();

},5000);

}

function stopSlider(){

clearInterval(autoSlide);

}

/*==============================
BUTTON EVENTS
==============================*/

if(nextBtn){

nextBtn.addEventListener("click",()=>{

nextSlide();

stopSlider();

startSlider();

});

}

if(prevBtn){

prevBtn.addEventListener("click",()=>{

prevSlide();

stopSlider();

startSlider();

});

}

/*==============================
INDICATORS
==============================*/

indicators.forEach((dot,index)=>{

dot.addEventListener("click",()=>{

showSlide(index);

stopSlider();

startSlider();

});

});

/*==============================
TOUCH SUPPORT
==============================*/

let touchStartX=0;
let touchEndX=0;

const hero=document.querySelector(".hero-slider");

if(hero){

hero.addEventListener("touchstart",(e)=>{

touchStartX=e.changedTouches[0].screenX;

});

hero.addEventListener("touchend",(e)=>{

touchEndX=e.changedTouches[0].screenX;

handleSwipe();

});

}

function handleSwipe(){

if(touchEndX<touchStartX-50){

nextSlide();

}

if(touchEndX>touchStartX+50){

prevSlide();

}

}

/*==============================
PAUSE ON HOVER
==============================*/

if(hero){

hero.addEventListener("mouseenter",stopSlider);

hero.addEventListener("mouseleave",startSlider);

}

/*==============================
PRODUCT CAROUSEL
==============================*/

const productTrack=document.querySelector(".product-track");
const productNext=document.querySelector(".product-next");
const productPrev=document.querySelector(".product-prev");

let scrollAmount=0;

if(productNext){

productNext.onclick=()=>{

scrollAmount+=340;

productTrack.scrollTo({

left:scrollAmount,

behavior:"smooth"

});

};

}

if(productPrev){

productPrev.onclick=()=>{

scrollAmount-=340;

if(scrollAmount<0){

scrollAmount=0;

}

productTrack.scrollTo({

left:scrollAmount,

behavior:"smooth"

});

};

}

/*==============================
INITIALIZE
==============================*/

showSlide(0);

startSlider();