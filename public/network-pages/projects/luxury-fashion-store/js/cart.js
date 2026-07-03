/*=========================================
LUXURY FASHION STORE
cart.js
=========================================*/

let cart = JSON.parse(localStorage.getItem("fashion-cart")) || [];

const cartCounter = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const totalPrice = document.querySelector(".cart-total");
const totalItems = document.querySelector(".total-items");

/*=====================================
SAVE CART
=====================================*/

function saveCart(){

localStorage.setItem("fashion-cart",JSON.stringify(cart));

updateCart();

}

/*=====================================
UPDATE CART
=====================================*/

function updateCart(){

if(cartCounter){

cartCounter.innerText = cart.reduce((sum,item)=>sum+item.qty,0);

}

if(!cartItems) return;

cartItems.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total += item.price * item.qty;

cartItems.innerHTML += `

<div class="cart-card">

<img src="${item.image}" alt="">

<div class="cart-info">

<h4>${item.name}</h4>

<p>₹${item.price}</p>

<div class="qty-box">

<button onclick="decreaseQty(${index})">−</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

</div>

<button class="remove-btn" onclick="removeItem(${index})">

✕

</button>

</div>

`;

});

if(totalPrice){

totalPrice.innerHTML="₹"+total.toLocaleString();

}

if(totalItems){

totalItems.innerHTML=cart.length;

}

if(cart.length===0 && cartItems){

cartItems.innerHTML=`

<div class="empty-cart">

<h3>Your cart is empty</h3>

<p>Add products to continue shopping.</p>

</div>

`;

}

}

/*=====================================
ADD PRODUCT
=====================================*/

function addToCart(product){

const exists=cart.find(item=>item.id===product.id);

if(exists){

exists.qty++;

}else{

cart.push({

...product,

qty:1

});

}

saveCart();

showToast(product.name+" added to cart");

}

/*=====================================
REMOVE
=====================================*/

function removeItem(index){

cart.splice(index,1);

saveCart();

}

/*=====================================
PLUS
=====================================*/

function increaseQty(index){

cart[index].qty++;

saveCart();

}

/*=====================================
MINUS
=====================================*/

function decreaseQty(index){

if(cart[index].qty>1){

cart[index].qty--;

}else{

cart.splice(index,1);

}

saveCart();

}

/*=====================================
CLEAR CART
=====================================*/

function clearCart(){

cart=[];

saveCart();

}

/*=====================================
CHECKOUT
=====================================*/

function checkout(){

if(cart.length===0){

alert("Your cart is empty.");

return;

}

alert("Checkout page coming soon.");

}

/*=====================================
TOAST
=====================================*/

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerText=message;

document.body.appendChild(toast);

toast.style.cssText=`

position:fixed;
right:25px;
bottom:25px;
background:#111;
color:#fff;
padding:16px 24px;
border-radius:10px;
font-size:14px;
z-index:99999;
opacity:0;
transform:translateY(20px);
transition:.35s;

`;

requestAnimationFrame(()=>{

toast.style.opacity="1";

toast.style.transform="translateY(0)";

});

setTimeout(()=>{

toast.style.opacity="0";

toast.style.transform="translateY(20px)";

setTimeout(()=>{

toast.remove();

},400);

},2200);

}

/*=====================================
ADD BUTTON EVENTS
=====================================*/

document.querySelectorAll(".add-cart").forEach(btn=>{

btn.onclick=()=>{

const card=btn.closest(".product-card");

const product={

id:card.dataset.id,

name:card.dataset.name,

price:Number(card.dataset.price),

image:card.dataset.image

};

addToCart(product);

};

});

/*=====================================
INIT
=====================================*/

updateCart();