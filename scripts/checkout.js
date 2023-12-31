const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"];

function calculateDeliveryDate(deliveryDays) {
    const date = new Date();
    date.setDate(date.getDate() + deliveryDays);
    formattedDate = days[date.getDay()] +", " + months[date.getMonth()] + " " + date.getDate();
    return formattedDate.toString();
}

const slowDelivery = calculateDeliveryDate(7);
const normalDelivery = calculateDeliveryDate(3);
const fastDelivery = calculateDeliveryDate(0);

let cartItemContainerHTML = "";
let totalItemQuantity = 0;
let orderTotal = 0;

function renderCheckOutOrderSummary(){
    cart.forEach((item)=>{
        const productInfo = products.find((product) => {
            return product.id === item.productId;
        });

        totalItemQuantity += item.quantity;
        cartItemContainerHTML += `
            <div class="cart-item-container">
                <div class="delivery-date js-delivery-date-${item.productId}">
                    
                </div>
    
                <div class="cart-item-details-grid">
                    <img class="product-image"
                        src=${productInfo.image}>
    
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${productInfo.name}
                        </div>
                        <div class="product-price">
                            $${((productInfo.priceCents) / 100).toFixed(2)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label js-quantity-label-${item.productId}">${item.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-add-quantity" data-product-id="${item.productId}">
                                Add
                            </span>
                            <span class="delete-quantity-link link-primary js-remove-quantity" data-product-id="${item.productId}">
                                Remove
                            </span>
                        </div>
                    </div>
    
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
    
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input"
                                name="delivery-option-${item.productId}" data-product-id="${item.productId}" value="${slowDelivery}">
                            <div>
                                <div class="delivery-option-date">
                                    ${slowDelivery}
                                </div>
                                <div class="delivery-option-price">
                                    FREE Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" checked class="delivery-option-input"
                                name="delivery-option-${item.productId}" data-product-id="${item.productId}" value="${normalDelivery}">
                            <div>
                                <div class="delivery-option-date">
                                    ${normalDelivery}
                                </div>
                                <div class="delivery-option-price">
                                    $4.99 - Shipping
                                </div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input"
                                name="delivery-option-${item.productId}" data-product-id="${item.productId}" value="${fastDelivery}">
                            <div>
                                <div class="delivery-option-date">
                                    ${fastDelivery}
                                </div>
                                <div class="delivery-option-price">
                                    $9.99 - Shipping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector(".order-summary").innerHTML = cartItemContainerHTML;
}
renderCheckOutOrderSummary();

function renderDeliveryDate(){
    const radioButtons = document.querySelectorAll(".delivery-option-input");
    radioButtons.forEach((radioButton) => {
        if(radioButton.checked === true){
            const cartItem = cart.find((item) => {
                return item.productId === radioButton.dataset.productId;
            });
            if(cartItem){
                cartItem.deliveryDate = radioButton.value;
            }
            document.querySelector(`.js-delivery-date-${radioButton.dataset.productId}`).innerHTML = "Delivery date: " + radioButton.value;
        }
    });
}
renderDeliveryDate();

function radioButtonsEventListeners(){ 
    const radioButtons = document.querySelectorAll(".delivery-option-input");
    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener("change", ()=>{
            renderDeliveryDate();
            calculateShipping();
            renderOrderSummary();
        });
    });
}
radioButtonsEventListeners();

function renderOrderSummary(){
    let totalPriceCents = 0;

    cart.forEach((item)=>{
        const productInfo = products.find((product) => {
            return product.id === item.productId;
        });

        totalPriceCents += productInfo.priceCents * item.quantity;
    })
    
    document.querySelector(".checkout-header-middle-section").innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${totalItemQuantity} items</a>)`;
    document.querySelector(".js-payment-summary-items").innerHTML = `Item (${totalItemQuantity})`;
    document.querySelector(".js-payment-summary-money").innerHTML = `$${((totalPriceCents) / 100).toFixed(2)}`;
    document.querySelector(`.js-payment-summary-shipping`).innerHTML = `$${((calculateShipping()) / 100).toFixed(2)}`;
    document.querySelector(".js-payment-summary-subtotal").innerHTML = `$${((totalPriceCents + calculateShipping()) / 100).toFixed(2)}`;
    document.querySelector(".js-payment-summary-tax").innerHTML = `$${(((totalPriceCents + calculateShipping()) / 10) / 100).toFixed(2)}`;
    document.querySelector(".js-payment-summary-total").innerHTML = `$${((((totalPriceCents + calculateShipping()) / 10) + (totalPriceCents + calculateShipping())) / 100).toFixed(2)}`;
    orderTotal = (((totalPriceCents + calculateShipping()) / 10) + (totalPriceCents + calculateShipping()));
}
renderOrderSummary();

function calculateShipping(){
    let shipping = [];

    const radioButtons = document.querySelectorAll(".delivery-option-input");
    radioButtons.forEach((radioButton)=>{
        if(radioButton.checked === true){
            switch(radioButton.value) {
                case slowDelivery:
                    shipping.push({id: radioButton.dataset.productId, shippingPrice: 0});
                    break;
                case normalDelivery:
                    shipping.push({id: radioButton.dataset.productId, shippingPrice: 499});
                    break;
                case fastDelivery:
                    shipping.push({id: radioButton.dataset.productId, shippingPrice: 999});
                    break;
            }
        }
    });
    
    let shippingTotal = 0;
    shipping.forEach((item) => {
        shippingTotal += item.shippingPrice;
    });

    return shippingTotal;
}

function addButtonsEventListeners(){
    const addButtons = document.querySelectorAll(".js-add-quantity");
    addButtons.forEach((addButton)=>{
        addButton.addEventListener("click", ()=>{
            const addedProduct = cart.find((item) => {
                return item.productId === addButton.dataset.productId;
            });

            cart.forEach((item)=>{
                if(item.productId === addedProduct.productId){
                    item.quantity += 1;
                    totalItemQuantity += 1;
                    document.querySelector(`.js-quantity-label-${addButton.dataset.productId}`).innerHTML = item.quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    if(JSON.parse(localStorage.getItem('cart'))){
                        cart = JSON.parse(localStorage.getItem('cart'));
                    }
                }
            });
            renderOrderSummary();
        });
    });
}
addButtonsEventListeners();

function removeButtonsEventListeners(){
    const removeButtons = document.querySelectorAll(".js-remove-quantity");
    removeButtons.forEach((removeButton)=>{
        removeButton.addEventListener("click", ()=>{
            const removedProduct = cart.find((item) => {
                return item.productId === removeButton.dataset.productId;
            });

            cart.forEach((item, i)=>{
                if(item.productId === removedProduct.productId){
                    item.quantity -= 1;
                    totalItemQuantity -= 1;
                    document.querySelector(`.js-quantity-label-${removeButton.dataset.productId}`).innerHTML = item.quantity;

                    if(item.quantity === 0){
                        cart.splice(i,1);
                        cartItemContainerHTML = "";
                        totalItemQuantity = 0;
                        renderCheckOutOrderSummary();
                        addButtonsEventListeners();
                        radioButtonsEventListeners();
                        removeButtonsEventListeners();
                        renderDeliveryDate();
                    }
                    
                    localStorage.setItem('cart', JSON.stringify(cart));
                    if(JSON.parse(localStorage.getItem('cart'))){
                        cart = JSON.parse(localStorage.getItem('cart'));
                    }
                }
            });
            renderOrderSummary();
        });
    });
}
removeButtonsEventListeners();

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

document.querySelector(".js-place-order-button").addEventListener("click", ()=>{
    if(cart.length === 0){
        alert("Your cart is empty");
        window.location.replace("index.html");
    } else {
        if(JSON.parse(localStorage.getItem('orders'))){
            orders = JSON.parse(localStorage.getItem('orders'));
        }
        orders.push(
            {
                orderId: makeid(10),
                orderDate: calculateDeliveryDate(0),
                orderTotal: orderTotal,
                orderItem: cart,
            }
        );
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.removeItem('cart');
        window.location.replace("orders.html");
    }
});
