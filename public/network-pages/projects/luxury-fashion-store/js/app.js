/*=========================================
Luxury Fashion Store
app.js
=========================================*/


/*==============================
PRELOADER
==============================*/

window.addEventListener("load",()=>{

const loader=document.getElementById("preloader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},600);

}

});


/*==============================
STICKY HEADER
==============================*/

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(window.scrollY>60){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});


/*==============================
SCROLL REVEAL
==============================*/

const revealElements=document.querySelectorAll(".reveal");

function reveal(){

const windowHeight=window.innerHeight;

revealElements.forEach(el=>{

const top=el.getBoundingClientRect().top;

if(top<windowHeight-120){

el.classList.add("active");

}

});

}

window.addEventListener("scroll",reveal);

reveal();


/*==============================
SMOOTH SCROLL
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",e=>{

const target=document.querySelector(link.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


/*==============================
NEWSLETTER
==============================*/

const newsletterBtn=document.querySelector(".newsletter button");

if(newsletterBtn){

newsletterBtn.onclick=()=>{

const email=document.querySelector(".newsletter input");

if(email.value.trim()==""){

alert("Please enter your email.");

return;

}

alert("Thank you for subscribing!");

email.value="";

};

}


/*==============================
BACK TO TOP
==============================*/

const topBtn=document.createElement("button");

topBtn.className="top-btn";

topBtn.innerHTML="↑";

document.body.appendChild(topBtn);

topBtn.style.cssText=`

position:fixed;
bottom:30px;
right:30px;
width:52px;
height:52px;
border:none;
border-radius:50%;
background:#c1121f;
color:#fff;
font-size:20px;
cursor:pointer;
display:none;
z-index:999;
transition:.3s;

`;

window.addEventListener("scroll",()=>{

topBtn.style.display=window.scrollY>400?"block":"none";

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


/*==============================
PRODUCT HOVER
==============================*/

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0)";

});

});


/*==============================
BUTTON RIPPLE
==============================*/

document.querySelectorAll(".primary-btn,.cart-btn").forEach(btn=>{

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.style.position="absolute";

ripple.style.borderRadius="50%";

ripple.style.background="rgba(255,255,255,.35)";

ripple.style.transform="scale(0)";

ripple.style.animation="ripple .6s linear";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});


/*==============================
CURRENT YEAR
==============================*/

const year=document.querySelector(".year");

if(year){

year.textContent=new Date().getFullYear();

}


/*==============================
END
==============================*/